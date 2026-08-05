import { copyFile, cp, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const client = resolve(dist, "client");
const server = resolve(dist, "server");
const hosting = resolve(dist, ".openai");
const assets = [
  "index.html",
  "offline.html",
  "style.css",
  "exam-vocabulary.js",
  "grammar-content.js",
  "app.js",
  "goethe-exams.js",
  "offline-audio-manifest.js",
  "offline-audio.js",
  "manifest.json",
  "service-worker.js",
  "icon.svg",
  "icon-180.png",
  "icon-512.png",
  "og.png"
];

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });
await mkdir(hosting, { recursive: true });
await Promise.all(assets.map(file => copyFile(resolve(root, file), resolve(client, file))));
await cp(resolve(root, "audio"), resolve(client, "audio"), { recursive: true });
await copyFile(resolve(root, ".openai/hosting.json"), resolve(hosting, "hosting.json"));
const audioFiles = await readdir(resolve(root,"audio"));

await writeFile(
  resolve(server, "index.js"),
  `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      url.pathname = "/index.html";
      request = new Request(url, request);
    }
    return env.ASSETS.fetch(request);
  }
};
`
);

console.log(`Built ${assets.length + audioFiles.length} static assets for Sites.`);
