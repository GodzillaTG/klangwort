import { access, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import vm from "node:vm";

const run = promisify(execFile);

const root = resolve(import.meta.dirname, "..");
const appSource = await readFile(resolve(root,"app.js"),"utf8");
const goetheSource = await readFile(resolve(root,"goethe-exams.js"),"utf8");
const examVocabularySource = await readFile(resolve(root,"exam-vocabulary.js"),"utf8");
const manifestSource = await readFile(resolve(root,"offline-audio-manifest.js"),"utf8");

const vocabularyContext = {};
vm.runInNewContext(`${appSource.slice(0,appSource.indexOf("const caseSeedEnglish"))}\nglobalThis.__WORDS__=allWords;`,vocabularyContext);
const goetheContext = {};
vm.runInNewContext(`${goetheSource.slice(0,goetheSource.indexOf("  const moduleDescriptions"))}\n  globalThis.__EXAMS__=EXAMS;\n})();`,goetheContext);
const manifestContext = {};
vm.runInNewContext(manifestSource,manifestContext);
const examVocabularyContext = {};
vm.runInNewContext(examVocabularySource,examVocabularyContext);
const manifest = manifestContext.OFFLINE_AUDIO_MANIFEST;
const declaredSources = manifestContext.OFFLINE_AUDIO_SOURCES;

const required = new Set(vocabularyContext.__WORDS__.map(word => word.word));
for (const word of examVocabularyContext.EXAM_VOCABULARY) required.add(word.gender ? `${word.gender} ${word.de}` : word.de);
for (const exam of Object.values(goetheContext.__EXAMS__)) {
  for (const part of exam.modules.hoeren.parts) {
    for (const question of part.questions) required.add(question.audio || part.audio);
  }
  for (const task of exam.modules.sprechen.tasks) required.add(task.prompt);
}
required.delete(undefined);

const missing = [...required].filter(text => !manifest[text]);
if (missing.length) throw new Error(`Missing ${missing.length} offline utterances: ${missing.slice(0,3).join(" | ")}`);
const extra = Object.keys(manifest).filter(text => !required.has(text));
if (extra.length) throw new Error(`Manifest has ${extra.length} unexpected utterances.`);

const sources = [...new Set(Object.values(manifest).map(entry => entry.src))];
if (JSON.stringify(sources) !== JSON.stringify(declaredSources)) throw new Error('Declared offline audio sources do not match the manifest.');
let totalBytes = 0;
let largestBytes = 0;
for (const source of sources) {
  const path = resolve(root,source);
  await access(path);
  const size = (await stat(path)).size;
  totalBytes += size;
  largestBytes = Math.max(largestBytes,size);

  const {stdout} = await run("ffprobe",[
    "-v","error","-select_streams","a:0",
    "-show_entries","stream=codec_name:format=duration","-of","json",path
  ]);
  const probe = JSON.parse(stdout);
  const duration = Number(probe.format?.duration);
  if (probe.streams?.[0]?.codec_name !== "aac" || !Number.isFinite(duration)) {
    throw new Error(`Audio sprite is not a valid AAC file: ${source}`);
  }
  const latestEnd = Math.max(...Object.values(manifest)
    .filter(entry => entry.src === source)
    .map(entry => entry.start + entry.duration));
  if (latestEnd > duration + 0.1) {
    throw new Error(`Audio cue exceeds sprite duration: ${source} (${latestEnd} > ${duration})`);
  }
}
if (largestBytes > 600 * 1024) throw new Error(`Offline audio chunk is too large for reliable resume: ${largestBytes} bytes.`);

console.log(`Offline audio verified: ${required.size} unique utterances, ${sources.length} sprites, ${(totalBytes/1024/1024).toFixed(1)} MiB, largest ${(largestBytes/1024).toFixed(0)} KiB.`);
