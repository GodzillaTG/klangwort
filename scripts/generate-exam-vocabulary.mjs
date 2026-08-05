import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const levelConfig = {
  B1: { target: 400, quota: { noun: 160, verb: 110, adjective: 80, other: 50 } },
  B2: { target: 350, quota: { noun: 140, verb: 100, adjective: 70, other: 40 } },
  C1: { target: 250, quota: { noun: 100, verb: 70, adjective: 50, other: 30 } }
};
const rejectedMeaning = /(?:form of|plural of|singular|gerund of|participle|imperative|inflection|alternative spelling|ellipsis of|obsolete|archaic|comparative of|superlative of|letter of|surname|given name|first-person|second-person|third-person|past tense|present tense|book of the bible)/i;
const allowedOther = new Set(["adverb", "conjunction", "preposition", "pronoun", "determiner", "particle"]);
const unsuitableHeadwords = new Set(["Penis", "Nymphe", "Monster", "miauen"]);
const translationsCache = resolve("/tmp", "exam-vocabulary-translations.json");
const gendersCache = resolve("/tmp", "exam-vocabulary-genders.json");
let sharedTranslationCache;
const meaningOverrides = {
  Master: ["master's degree", "硕士学位"],
  Note: ["grade; note", "成绩；笔记"],
  Folge: ["consequence; episode", "后果；一集"],
  Regierung: ["government", "政府"],
  Zusammenfassung: ["summary", "总结；摘要"],
  Entwicklung: ["development", "发展"],
  Studium: ["university studies", "大学学业"],
  Botschaft: ["message; embassy", "信息；大使馆"],
  Kurs: ["course; exchange rate", "课程；汇率"],
  Wahl: ["choice; election", "选择；选举"],
  Wirtschaft: ["economy", "经济"],
  Recht: ["right; law", "权利；法律"],
  Gericht: ["court; dish", "法院；菜肴"],
  Leitung: ["management; line", "管理；线路"],
  Absatz: ["paragraph; sales", "段落；销量"],
  Einstellung: ["attitude; setting", "态度；设置"],
  Betrieb: ["company; operation", "企业；运行"]
};
const dryRun = process.argv.includes("--dry-run");

function cleanText(value = "") {
  return String(value).replace(/\s+/g, " ").replace(/[|\n\r]+/g, " ").trim();
}

async function fetchJsonWithRetry(url, attempts = 5) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        const wait = /429/.test(String(error?.message)) ? attempt * 6000 : attempt * 1500;
        await new Promise(resolveDelay => setTimeout(resolveDelay, wait));
      }
    }
  }
  throw lastError;
}

function rowIsUseful(row) {
  const german = cleanText(row.german);
  const english = cleanText(row.english);
  if (!german || !english || german.length > 42 || english.length > 90) return false;
  if (unsuitableHeadwords.has(german)) return false;
  if (!/^[A-Za-zÄÖÜäöüß][A-Za-zÄÖÜäöüß -]*$/.test(german)) return false;
  if (rejectedMeaning.test(english) || /[;:()]/.test(english)) return false;
  if (row.pos === "name" || row.pos === "interjection" || row.pos === "numeral") return false;
  if (row.pos === "noun" && (!/^[A-ZÄÖÜ]/.test(german) || !["der", "die", "das"].includes(row.gender))) return false;
  if (!["noun", "verb", "adjective"].includes(row.pos) && !allowedOther.has(row.pos)) return false;
  return true;
}

function bucketFor(row) {
  return ["noun", "verb", "adjective"].includes(row.pos) ? row.pos : "other";
}

function qualityScore(row) {
  const exampleMatches = cleanText(row.example_de).toLocaleLowerCase("de").includes(cleanText(row.german).toLocaleLowerCase("de"));
  return -Number(row.frequency_rank || 999999) * 100
    + (exampleMatches ? 20 : 0)
    + (row.example_de && row.example_en ? 10 : 0)
    + (row.gender ? 5 : 0)
    - cleanText(row.english).length / 100;
}

async function readLevel(level) {
  const slug = level.toLowerCase();
  const files = [`/tmp/rep12-${slug}.json`, `/tmp/rep12-${slug}-2.json`, `/tmp/rep12-${slug}-3.json`];
  const rows = (await Promise.all(files.map(async file => JSON.parse(await readFile(file, "utf8")))))
    .flatMap(data => data.data)
    .filter(rowIsUseful)
    .sort((a, b) => qualityScore(b) - qualityScore(a));
  const unique = new Map();
  for (const row of rows) {
    const key = cleanText(row.german).toLocaleLowerCase("de");
    if (!unique.has(key)) unique.set(key, row);
  }
  return [...unique.values()];
}

function selectRows(candidates, config, globallyUsed) {
  const selected = [];
  const selectedKeys = new Set();
  const take = row => {
    const key = cleanText(row.german).toLocaleLowerCase("de");
    if (selectedKeys.has(key) || globallyUsed.has(key)) return false;
    selected.push(row);
    selectedKeys.add(key);
    globallyUsed.add(key);
    return true;
  };
  for (const [bucket, count] of Object.entries(config.quota)) {
    let remaining = count;
    for (const row of candidates) {
      if (remaining && bucketFor(row) === bucket && take(row)) remaining -= 1;
    }
  }
  for (const row of candidates) {
    if (selected.length >= config.target) break;
    take(row);
  }
  if (selected.length !== config.target) throw new Error(`Only selected ${selected.length} / ${config.target} rows.`);
  return selected;
}

function topicFor(row) {
  const text = `${row.german} ${row.english}`.toLowerCase();
  const topics = [
    ["Umwelt", /climate|environment|energy|nature|waste|pollution|sustainab|verkehr|transport/],
    ["Bildung", /school|education|learn|study|university|research|knowledge|exam/],
    ["Arbeit", /work|job|career|company|business|employee|employ|management|profession/],
    ["Gesellschaft", /society|social|community|population|public|equality|migration|family/],
    ["Politik", /politic|government|law|election|democracy|minister|state|policy|rights?/],
    ["Gesundheit", /health|medical|doctor|disease|therapy|body|hospital|nutrition/],
    ["Medien", /media|internet|digital|press|journal|communication|information|online/],
    ["Kultur", /culture|art|music|film|literature|language|tradition|museum/],
    ["Wissenschaft", /science|technology|data|analysis|theory|method|evidence|experiment/],
    ["Wirtschaft", /econom|money|market|finance|trade|price|cost|consumer|production/]
  ];
  return topics.find(([, pattern]) => pattern.test(text))?.[0] || "Alltag & Argumentation";
}

async function correctNounGenders(rows) {
  let cache = {};
  try { cache = JSON.parse(await readFile(gendersCache, "utf8")); } catch {}
  const nouns = [...new Set(rows.filter(row => row.pos === "noun").map(row => cleanText(row.german)))];
  const missing = nouns.filter(noun => !cache[noun]);
  for (let start = 0; start < missing.length; start += 30) {
    const batch = missing.slice(start, start + 30);
    const params = new URLSearchParams({
      action: "query",
      prop: "revisions",
      rvprop: "content",
      rvslots: "main",
      titles: batch.join("|"),
      format: "json",
      formatversion: "2",
      origin: "*"
    });
    const payload = await fetchJsonWithRetry(`https://de.wiktionary.org/w/api.php?${params}`);
    for (const page of payload.query?.pages || []) {
      const content = page.revisions?.[0]?.slots?.main?.content || "";
      const germanSection = content.match(/==\s*[^\n]+\(\{\{Sprache\|Deutsch\}\}\)\s*==([\s\S]*?)(?=\n==[^=]|$)/)?.[1] || content;
      const marker = germanSection.match(/\{\{Wortart\|Substantiv\|Deutsch\}\}[^\n]*(?:\{\{(m|f|n)\}\}|\|Genus\s*=\s*(m|f|n))/);
      const genus = marker?.[1] || marker?.[2] || germanSection.match(/\|Genus\s*=\s*(m|f|n)/)?.[1];
      if (genus) cache[page.title] = { m: "der", f: "die", n: "das" }[genus];
    }
    batch.forEach(noun => { if (!cache[noun]) cache[noun] = "unknown"; });
    await writeFile(gendersCache, JSON.stringify(cache, null, 2));
    console.log(`Verified noun genders ${Math.min(start + batch.length, missing.length)} / ${missing.length}`);
    await new Promise(resolveDelay => setTimeout(resolveDelay, 900));
  }
  for (const row of rows) {
    if (row.pos === "noun" && ["der", "die", "das"].includes(cache[row.german])) row.gender = cache[row.german];
  }
}

async function translateLines(lines, sourceLanguage, targetLanguage) {
  if (!sharedTranslationCache) {
    try { sharedTranslationCache = JSON.parse(await readFile(translationsCache, "utf8")); }
    catch { sharedTranslationCache = {}; }
  }
  const cache = sharedTranslationCache;
  const cacheKey = line => `${sourceLanguage}>${targetLanguage}|${line}`;
  const missing = [...new Set(lines.filter(line => !cache[cacheKey(line)]))];
  for (let start = 0; start < missing.length; start += 30) {
    const batch = missing.slice(start, start + 30);
    const params = new URLSearchParams({ client: "gtx", sl: sourceLanguage, tl: targetLanguage, dt: "t", q: batch.join("\n") });
    const payload = await fetchJsonWithRetry(`https://translate.googleapis.com/translate_a/single?${params}`);
    const joined = payload[0].map(part => part[0]).join("");
    const translated = joined.split("\n").map(cleanText).filter(Boolean);
    if (translated.length !== batch.length) throw new Error(`Translation line mismatch: ${translated.length} / ${batch.length}`);
    batch.forEach((line, index) => { cache[cacheKey(line)] = translated[index]; });
    await writeFile(translationsCache, JSON.stringify(cache, null, 2));
    console.log(`Translated ${Math.min(start + batch.length, missing.length)} / ${missing.length}`);
  }
  return lines.map(line => cache[cacheKey(line)] || "");
}

const globallyUsed = new Set();
const selectedByLevel = {};
for (const [level, config] of Object.entries(levelConfig)) {
  const candidates = await readLevel(level);
  selectedByLevel[level] = selectRows(candidates, config, globallyUsed);
  const distribution = Object.groupBy(selectedByLevel[level], bucketFor);
  console.log(level, selectedByLevel[level].length, Object.fromEntries(Object.entries(distribution).map(([key, rows]) => [key, rows.length])));
}
const selected = Object.entries(selectedByLevel).flatMap(([level, rows]) => rows.map(row => ({ ...row, level })));

if (dryRun) {
  console.log(selected.slice(0, 30).map(row => `${row.level}\t${row.german}\t${row.pos}\t${row.english}`).join("\n"));
  process.exit(0);
}

await correctNounGenders(selected);

const germanHeadwords = selected.map(row => row.pos === "noun" ? `${row.gender} ${cleanText(row.german)}` : cleanText(row.german));
const germanExamples = selected.map(row => {
  const example = cleanText(row.example_de);
  return example && example.length <= 180 ? example : `Das Wort „${cleanText(row.german)}“ kommt häufig in Prüfungstexten vor.`;
});
const rawEnglishDefinitions = await translateLines(germanHeadwords, "de", "en");
const rawChineseDefinitions = await translateLines(germanHeadwords, "de", "zh-CN");
const englishExamples = await translateLines(germanExamples, "de", "en");
const chineseExamples = await translateLines(germanExamples, "de", "zh-CN");
const englishDefinitions = rawEnglishDefinitions.map((value, index) => {
  const withoutArticle = value.replace(/^the\s+/i, "");
  return selected[index].pos === "verb" && !/^to\s+/i.test(withoutArticle) ? `to ${withoutArticle}` : withoutArticle;
});
const chineseDefinitions = rawChineseDefinitions.map(value => {
  const cleaned = value.replace(/^(?:该|这个|那个|这位|那位)/, "");
  return cleaned || value;
});
selected.forEach((row, index) => {
  const override = meaningOverrides[row.german];
  if (override) [englishDefinitions[index], chineseDefinitions[index]] = override;
});
const outputRows = selected.map((row, index) => ({
  id: `exam-${row.level.toLowerCase()}-${String(index + 1).padStart(4, "0")}`,
  level: row.level,
  de: cleanText(row.german),
  en: englishDefinitions[index],
  zh: chineseDefinitions[index],
  pos: row.pos,
  gender: ["der", "die", "das"].includes(row.gender) ? row.gender : "",
  topic: topicFor({ ...row, english: englishDefinitions[index] }),
  exampleDe: germanExamples[index],
  exampleEn: englishExamples[index],
  exampleZh: chineseExamples[index]
}));
const source = `// 1,000 offline B1-C1 exam-training words. Goethe publishes a B1 reference list; B2/C1 have no closed official word inventories, so all three levels here are clearly presented as CEFR-oriented practice selections.\nglobalThis.EXAM_VOCABULARY = ${JSON.stringify(outputRows)};\n`;
await writeFile(resolve(root, "exam-vocabulary.js"), source);
console.log(`Wrote ${outputRows.length} entries to exam-vocabulary.js.`);
