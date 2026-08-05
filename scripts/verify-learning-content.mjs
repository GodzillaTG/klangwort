import { readFile } from "node:fs/promises";
import vm from "node:vm";

async function evaluateGlobal(file, key) {
  const context = {};
  vm.runInNewContext(await readFile(file, "utf8"), context);
  return context[key];
}

const vocabulary = await evaluateGlobal("exam-vocabulary.js", "EXAM_VOCABULARY");
const grammar = await evaluateGlobal("grammar-content.js", "LEVELLED_GRAMMAR_QUESTIONS");
const expectedVocabulary = { B1: 400, B2: 350, C1: 250 };
const expectedGrammar = { B1: 30, B2: 30, C1: 30 };

if (vocabulary.length !== 1000) throw new Error(`Expected 1,000 vocabulary entries, found ${vocabulary.length}.`);
if (new Set(vocabulary.map(word => word.de.toLocaleLowerCase("de"))).size !== vocabulary.length) throw new Error("Duplicate exam headwords found.");
if (new Set(vocabulary.map(word => word.id)).size !== vocabulary.length) throw new Error("Duplicate vocabulary IDs found.");
for (const [level, count] of Object.entries(expectedVocabulary)) {
  const rows = vocabulary.filter(word => word.level === level);
  if (rows.length !== count) throw new Error(`${level} vocabulary: expected ${count}, found ${rows.length}.`);
}
const invalidNouns = vocabulary.filter(word => word.pos === "noun" && !["der", "die", "das"].includes(word.gender));
if (invalidNouns.length) throw new Error(`Nouns without verified gender: ${invalidNouns.slice(0, 3).map(word => word.de).join(", ")}`);
const incompleteWords = vocabulary.filter(word => !word.de || !word.en || !word.zh || !word.exampleDe || !word.exampleEn || !word.exampleZh);
if (incompleteWords.length) throw new Error(`Incomplete vocabulary entries: ${incompleteWords.length}.`);

if (grammar.length !== 90) throw new Error(`Expected 90 grammar questions, found ${grammar.length}.`);
if (new Set(grammar.map(question => question.id)).size !== grammar.length) throw new Error("Duplicate grammar IDs found.");
if (new Set(grammar.map(question => question.prompt)).size !== grammar.length) throw new Error("Duplicate grammar prompts found.");
for (const [level, count] of Object.entries(expectedGrammar)) {
  const rows = grammar.filter(question => question.level === level);
  if (rows.length !== count) throw new Error(`${level} grammar: expected ${count}, found ${rows.length}.`);
}
const invalidQuestions = grammar.filter(question =>
  !question.translationEn
  || !question.explanation
  || question.options.length < 3
  || !question.options.some(option => option.value === question.answer)
);
if (invalidQuestions.length) throw new Error(`Invalid grammar questions: ${invalidQuestions.map(question => question.id).join(", ")}`);

const contextualVocabulary = vocabulary.filter(word =>
  word.exampleDe.toLocaleLowerCase("de").includes(word.de.toLocaleLowerCase("de"))
);
const grammarDomains = new Set(grammar.map(question => question.category.replace(/^\S+\s·\s/, "")));
console.log(`Learning content verified: 1,000 unique exam words (${invalidNouns.length} invalid genders), ${contextualVocabulary.length} contextual cloze candidates, 90 unique grammar questions across ${grammarDomains.size} domains.`);
