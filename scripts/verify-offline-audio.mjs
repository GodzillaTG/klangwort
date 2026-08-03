import { access, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import vm from "node:vm";

const root = resolve(import.meta.dirname, "..");
const appSource = await readFile(resolve(root,"app.js"),"utf8");
const goetheSource = await readFile(resolve(root,"goethe-exams.js"),"utf8");
const manifestSource = await readFile(resolve(root,"offline-audio-manifest.js"),"utf8");

const vocabularyContext = {};
vm.runInNewContext(`${appSource.slice(0,appSource.indexOf("const caseSeedEnglish"))}\nglobalThis.__WORDS__=allWords;`,vocabularyContext);
const goetheContext = {};
vm.runInNewContext(`${goetheSource.slice(0,goetheSource.indexOf("  const moduleDescriptions"))}\n  globalThis.__EXAMS__=EXAMS;\n})();`,goetheContext);
const manifestContext = { window:{} };
vm.runInNewContext(manifestSource,manifestContext);
const manifest = manifestContext.window.OFFLINE_AUDIO_MANIFEST;

const required = new Set(vocabularyContext.__WORDS__.map(word => word.word));
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
let totalBytes = 0;
for (const source of sources) {
  const path = resolve(root,source);
  await access(path);
  totalBytes += (await stat(path)).size;
}

console.log(`Offline audio verified: ${required.size} unique utterances, ${sources.length} sprites, ${(totalBytes/1024/1024).toFixed(1)} MiB.`);
