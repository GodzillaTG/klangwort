import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
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

async function buildSprite(name, texts, tempRoot, manifest) {
  const groupDir = resolve(tempRoot, name);
  await mkdir(groupDir, { recursive: true });
  const paths = texts.map((_, index) => resolve(groupDir, `${String(index).padStart(4, "0")}.aiff`));

  console.log(`[${name}] synthesizing ${texts.length} offline clips…`);
  await runPool(texts, 8, async (text, index) => {
    await execFileAsync("/usr/bin/say", ["-v", "Anna", "-r", "175", "-o", paths[index], text]);
  });

  const chunks = [];
  let frameCursor = 0;
  for (let index = 0; index < texts.length; index += 1) {
    const pcm = readAifcPcm(await readFile(paths[index]));
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
    "-c:a", "aac", "-b:a", "24k", "-movflags", "+faststart", outputPath
  ]);
  console.log(`[${name}] wrote ${basename(outputPath)} (${(frameCursor / sampleRate / 60).toFixed(1)} min)`);
}

const [appSource, goetheSource] = await Promise.all([
  readFile(resolve(root, "app.js"), "utf8"),
  readFile(resolve(root, "goethe-exams.js"), "utf8")
]);
const words = readVocabulary(appSource);
const exams = readGoetheExams(goetheSource);
const groups = {
  music: unique(words.filter(word => word.topic === "music").map(word => word.word)),
  ai: unique(words.filter(word => word.topic === "ai").map(word => word.word)),
  games: unique(words.filter(word => word.topic === "games").map(word => word.word)),
  film: unique(words.filter(word => word.topic === "film").map(word => word.word)),
  "goethe-b1": goetheTexts(exams.B1),
  "goethe-b2": goetheTexts(exams.B2)
};

await mkdir(audioDir, { recursive: true });
const tempRoot = await mkdtemp(resolve(tmpdir(), "mein-deutsch-audio-"));
const manifest = {};
try {
  for (const [name, texts] of Object.entries(groups)) await buildSprite(name, texts, tempRoot, manifest);
  const manifestSource = `window.OFFLINE_AUDIO_MANIFEST = ${JSON.stringify(manifest)};\n`;
  await writeFile(resolve(root, "offline-audio-manifest.js"), manifestSource);
  const total = Object.keys(manifest).length;
  console.log(`Generated ${total} fully bundled German utterances in ${Object.keys(groups).length} sprites.`);
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}
