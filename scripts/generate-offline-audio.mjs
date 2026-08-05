import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, readdir, rm, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, resolve } from "node:path";
import { promisify } from "node:util";
import vm from "node:vm";

const execFileAsync = promisify(execFile);
const root = resolve(import.meta.dirname, "..");
const audioDir = resolve(root, "audio");
const sampleRate = 22050;
const gapSeconds = 0.22;
const gap = Buffer.alloc(Math.round(sampleRate * gapSeconds) * 2);
const dialogueGap = Buffer.alloc(Math.round(sampleRate * 0.42) * 2);
const goetheOnly = process.argv.includes("--goethe-only");
const examOnly = process.argv.includes("--exam-only");
const naturalVoices = [
  "Sandy (German (Germany))",
  "Reed (German (Germany))",
  "Shelley (German (Germany))",
  "Flo (German (Germany))",
  "Anna"
];
const roleVoices = {
  Moderatorin: "Sandy (German (Germany))",
  Moderator: "Reed (German (Germany))",
  Mann: "Reed (German (Germany))",
  Frau: "Sandy (German (Germany))",
  Lena: "Shelley (German (Germany))",
  Paul: "Flo (German (Germany))",
  Klein: "Anna",
  "Frau Yilmaz": "Sandy (German (Germany))",
  "Herr Roth": "Reed (German (Germany))"
};

function readVocabulary(source) {
  const end = source.indexOf("const caseSeedEnglish");
  if (end < 0) throw new Error("Could not locate the vocabulary data boundary.");
  const context = {};
  vm.runInNewContext(`${source.slice(0, end)}\nglobalThis.__WORDS__ = allWords;`, context);
  return context.__WORDS__;
}

function readGoetheExams(source) {
  const end = source.indexOf("  const moduleDescriptions");
  if (end < 0) throw new Error("Could not locate the Goethe data boundary.");
  const context = {};
  vm.runInNewContext(`${source.slice(0, end)}\n  globalThis.__EXAMS__ = EXAMS;\n})();`, context);
  return context.__EXAMS__;
}

function unique(values) {
  return [...new Set(values.map(value => String(value).trim()).filter(Boolean))];
}

function goetheTexts(exam) {
  const listening = exam.modules.hoeren.parts.flatMap(part =>
    part.questions.map(question => question.audio || part.audio).filter(Boolean)
  );
  const speaking = exam.modules.sprechen.tasks.map(task => task.prompt);
  return unique([...listening, ...speaking]);
}

function findChunk(buffer, name) {
  let cursor = 12;
  while (cursor + 8 <= buffer.length) {
    const chunkName = buffer.toString("ascii", cursor, cursor + 4);
    const size = buffer.readUInt32BE(cursor + 4);
    if (chunkName === name) return { start: cursor + 8, size };
    cursor += 8 + size + (size % 2);
  }
  throw new Error(`Missing ${name} chunk in generated AIFC file.`);
}

function readAifcPcm(buffer) {
  const chunk = findChunk(buffer, "SSND");
  const offset = buffer.readUInt32BE(chunk.start);
  const pcmStart = chunk.start + 8 + offset;
  const pcmEnd = chunk.start + chunk.size;
  const bigEndian = buffer.subarray(pcmStart, pcmEnd);
  const littleEndian = Buffer.allocUnsafe(bigEndian.length);
  for (let index = 0; index + 1 < bigEndian.length; index += 2) {
    littleEndian[index] = bigEndian[index + 1];
    littleEndian[index + 1] = bigEndian[index];
  }
  return littleEndian;
}

function readWavPcm(buffer) {
  let cursor = 12;
  while (cursor + 8 <= buffer.length) {
    const chunkName = buffer.toString("ascii", cursor, cursor + 4);
    const size = buffer.readUInt32LE(cursor + 4);
    if (chunkName === "data") return buffer.subarray(cursor + 8, cursor + 8 + size);
    cursor += 8 + size + (size % 2);
  }
  throw new Error("Missing data chunk in generated WAV file.");
}

function readSpeechPcm(buffer) {
  return buffer.toString("ascii", 0, 4) === "RIFF" ? readWavPcm(buffer) : readAifcPcm(buffer);
}

function wavBuffer(pcm) {
  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + pcm.length, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write("data", 36);
  header.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([header, pcm]);
}

async function runPool(items, concurrency, worker) {
  let cursor = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      await worker(items[index], index);
    }
  }));
}

function dialogueSegments(text, fallbackVoice) {
  const speakerPattern = /(?:^|\s)(Moderatorin|Moderator|Frau Yilmaz|Herr Roth|Mann|Frau|Lena|Paul|Klein):\s/g;
  const matches = [...text.matchAll(speakerPattern)];
  if (!matches.length) return [{ text, voice: fallbackVoice }];

  return matches.map((match, index) => {
    const start = match.index + match[0].length;
    const end = index + 1 < matches.length ? matches[index + 1].index : text.length;
    return {
      text: text.slice(start, end).trim(),
      voice: roleVoices[match[1]] || fallbackVoice
    };
  }).filter(segment => segment.text);
}

async function synthesizeClip(text, outputPath, tempDir, clipIndex, voice, rate) {
  const segments = dialogueSegments(text, voice);
  if (segments.length === 1) {
    await execFileAsync("/usr/bin/say", ["-v", segments[0].voice, "-r", String(rate), "-o", outputPath, segments[0].text]);
    return;
  }

  const pcmParts = [];
  for (let index = 0; index < segments.length; index += 1) {
    const segmentPath = resolve(tempDir, `${String(clipIndex).padStart(4, "0")}-speaker-${index}.aiff`);
    const segmentRate = rate + ((index % 3) - 1) * 3;
    await execFileAsync("/usr/bin/say", ["-v", segments[index].voice, "-r", String(segmentRate), "-o", segmentPath, segments[index].text]);
    pcmParts.push(readAifcPcm(await readFile(segmentPath)));
    if (index < segments.length - 1) pcmParts.push(dialogueGap);
  }
  await writeFile(outputPath, wavBuffer(Buffer.concat(pcmParts)));
}

async function buildSprite(name, texts, tempRoot, manifest) {
  const groupDir = resolve(tempRoot, name);
  await mkdir(groupDir, { recursive: true });
  const paths = texts.map((_, index) => resolve(groupDir, `${String(index).padStart(4, "0")}.aiff`));

  console.log(`[${name}] synthesizing ${texts.length} offline clips…`);
  const isGoethe = name.startsWith("goethe-");
  const trackOffset = isGoethe ? Math.max(0, Number(name.match(/-(\d+)$/)?.[1] || 1) - 1) : 0;
  await runPool(texts, isGoethe ? 4 : 8, async (text, index) => {
    const voice = isGoethe ? naturalVoices[(trackOffset + index) % naturalVoices.length] : "Anna";
    const baseRate = name.startsWith("goethe-b1") ? 158 : name.startsWith("goethe-b2") ? 165 : 175;
    const rate = baseRate + (((trackOffset + index) % 3) - 1) * 3;
    await synthesizeClip(text, paths[index], groupDir, index, voice, rate);
  });

  const chunks = [];
  let frameCursor = 0;
  for (let index = 0; index < texts.length; index += 1) {
    const pcm = readSpeechPcm(await readFile(paths[index]));
    const frames = pcm.length / 2;
    manifest[texts[index]] = {
      src: `audio/${name}.m4a`,
      start: Number((frameCursor / sampleRate).toFixed(4)),
      duration: Number((frames / sampleRate).toFixed(4))
    };
    chunks.push(pcm, gap);
    frameCursor += frames + gap.length / 2;
  }

  const wavPath = resolve(tempRoot, `${name}.wav`);
  const outputPath = resolve(audioDir, `${name}.m4a`);
  await writeFile(wavPath, wavBuffer(Buffer.concat(chunks)));
  await execFileAsync("ffmpeg", [
    "-hide_banner", "-loglevel", "error", "-y", "-i", wavPath,
    "-map_metadata", "-1", "-ac", "1", "-ar", String(sampleRate),
    ...(isGoethe ? ["-af", "loudnorm=I=-18:LRA=7:TP=-2"] : []),
    "-c:a", "aac", "-b:a", isGoethe ? "48k" : "24k", "-movflags", "+faststart", outputPath
  ]);
  console.log(`[${name}] wrote ${basename(outputPath)} (${(frameCursor / sampleRate / 60).toFixed(1)} min)`);
}

const [appSource, goetheSource, examVocabularySource] = await Promise.all([
  readFile(resolve(root, "app.js"), "utf8"),
  readFile(resolve(root, "goethe-exams.js"), "utf8"),
  readFile(resolve(root, "exam-vocabulary.js"), "utf8")
]);
const words = readVocabulary(appSource);
const exams = readGoetheExams(goetheSource);
const examVocabularyContext = {};
vm.runInNewContext(examVocabularySource, examVocabularyContext);
const examVocabulary = examVocabularyContext.EXAM_VOCABULARY;
const allGroups = {
  music: unique(words.filter(word => word.topic === "music").map(word => word.word)),
  ai: unique(words.filter(word => word.topic === "ai").map(word => word.word)),
  games: unique(words.filter(word => word.topic === "games").map(word => word.word)),
  film: unique(words.filter(word => word.topic === "film").map(word => word.word)),
  "exam-b1": unique(examVocabulary.filter(word => word.level === "B1").map(word => word.gender ? `${word.gender} ${word.de}` : word.de)),
  "exam-b2": unique(examVocabulary.filter(word => word.level === "B2").map(word => word.gender ? `${word.gender} ${word.de}` : word.de)),
  "exam-c1": unique(examVocabulary.filter(word => word.level === "C1").map(word => word.gender ? `${word.gender} ${word.de}` : word.de)),
  "goethe-b1": goetheTexts(exams.B1),
  "goethe-b2": goetheTexts(exams.B2)
};

if (!goetheOnly && !examOnly) await rm(audioDir, { recursive: true, force: true });
await mkdir(audioDir, { recursive: true });
const tempRoot = await mkdtemp(resolve(tmpdir(), "mein-deutsch-audio-"));
let manifest = {};
if (goetheOnly || examOnly) {
  const manifestContext = {};
  vm.runInNewContext(await readFile(resolve(root, "offline-audio-manifest.js"), "utf8"), manifestContext);
  manifest = { ...manifestContext.OFFLINE_AUDIO_MANIFEST };
  for (const [text, entry] of Object.entries(manifest)) {
    if (goetheOnly && entry.src.includes("audio/goethe-")) delete manifest[text];
    if (examOnly && entry.src.includes("audio/exam-")) delete manifest[text];
  }
  for (const file of await readdir(audioDir)) {
    if (goetheOnly && /^goethe-b[12]-\d+\.m4a$/.test(file)) await unlink(resolve(audioDir, file));
    if (examOnly && /^exam-(?:b1|b2|c1)-[0-9]+\.m4a$/.test(file)) await unlink(resolve(audioDir, file));
  }
}
const groups = goetheOnly
  ? { "goethe-b1": allGroups["goethe-b1"], "goethe-b2": allGroups["goethe-b2"] }
  : examOnly
    ? { "exam-b1": allGroups["exam-b1"], "exam-b2": allGroups["exam-b2"], "exam-c1": allGroups["exam-c1"] }
    : allGroups;
try {
  for (const [name, texts] of Object.entries(groups)) {
    // Keep each exam recording independent, like a real listening-test track.
    const chunkSize = name.startsWith("goethe-") ? 1 : 80;
    for (let start = 0, part = 1; start < texts.length; start += chunkSize, part += 1) {
      await buildSprite(`${name}-${part}`, texts.slice(start,start + chunkSize), tempRoot, manifest);
    }
  }
  const sources = [...new Set(Object.values(manifest).map(entry => entry.src))];
  const manifestSource = `globalThis.OFFLINE_AUDIO_MANIFEST = ${JSON.stringify(manifest)};\nglobalThis.OFFLINE_AUDIO_SOURCES = ${JSON.stringify(sources)};\n`;
  await writeFile(resolve(root, "offline-audio-manifest.js"), manifestSource);
  const total = Object.keys(manifest).length;
  console.log(`Generated ${total} fully bundled German utterances in ${sources.length} resumable sprites.`);
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}
