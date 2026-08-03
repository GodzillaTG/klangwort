import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const client = resolve(dist, "client");
const server = resolve(dist, "server");
const assets = [
  "index.html",
  "style.css",
  "app.js",
  "goethe-exams.js",
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
await Promise.all(assets.map(file => copyFile(resolve(root, file), resolve(client, file))));
await copyFile(resolve(root, "index.html"), resolve(client, "offline.html"));

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

console.log(`Built ${assets.length + 1} static assets for Sites.`);
