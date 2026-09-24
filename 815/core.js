export const PACK_SCHEMA = 1;

const idsAreUnique = (items = []) => new Set(items.map(item => item.id)).size === items.length;

export function validatePack(pack) {
  const errors = [];
  if (!pack || typeof pack !== "object") return ["文件不是有效的内容包"];
  if (pack.schemaVersion !== PACK_SCHEMA) errors.push(`内容包版本应为 ${PACK_SCHEMA}`);
  if (!/^815-[a-z0-9.-]+$/.test(pack.id || "")) errors.push("内容包 ID 不合法");
  if (!pack.version || !pack.title) errors.push("缺少版本或标题");
  if (pack.private && !/^[a-f0-9]{64}$/.test(pack.digest || "")) errors.push("私人内容包缺少有效校验值");
  for (const key of ["sources", "coverage", "lessons", "questions", "diagrams", "assets"]) {
    if (!Array.isArray(pack[key])) errors.push(`${key} 必须是数组`);
    else if (!idsAreUnique(pack[key])) errors.push(`${key} 存在重复 ID`);
  }
  const assetIds = new Set((pack.assets || []).map(item => item.id));
  for (const asset of pack.assets || []) {
    if (!/^image\/(jpeg|png|webp)$/.test(asset.mime || "")) errors.push(`资源 ${asset.id} 类型不允许`);
    if (!/^data:image\/(jpeg|png|webp);base64,/.test(asset.data || "")) errors.push(`资源 ${asset.id} 数据不合法`);
  }
  const lessonIds = new Set((pack.lessons || []).map(item => item.id));
  const diagramIds = new Set((pack.diagrams || []).map(item => item.id));
  for (const item of pack.coverage || []) {
    if (!item.sourceId || !item.chapter || !Array.isArray(item.sections)) errors.push(`覆盖项 ${item.id} 不完整`);
    if (item.lessonId && !lessonIds.has(item.lessonId)) errors.push(`覆盖项 ${item.id} 引用未知知识卡`);
    for (const id of item.exerciseAssetIds || []) if (!assetIds.has(id)) errors.push(`覆盖项 ${item.id} 引用未知资源 ${id}`);
  }
  for (const item of pack.lessons || []) {
    if (!item.title || !item.summary || !Array.isArray(item.points)) errors.push(`知识卡 ${item.id} 不完整`);
    if (item.diagramId && !diagramIds.has(item.diagramId)) errors.push(`知识卡 ${item.id} 引用未知图表`);
  }
  const allowed = new Set(["choice", "multi", "notation", "self"]);
  for (const item of pack.questions || []) {
    if (!allowed.has(item.type)) errors.push(`题目 ${item.id} 类型不支持`);
    if (!item.topic || !item.prompt || !item.source) errors.push(`题目 ${item.id} 信息不完整`);
    if (["choice", "multi"].includes(item.type) && !Array.isArray(item.options)) errors.push(`题目 ${item.id} 缺少选项`);
    if (item.type === "notation" && (!Array.isArray(item.slots) || !Array.isArray(item.answer))) errors.push(`题目 ${item.id} 缺少谱面规则`);
    for (const id of item.assetIds || []) if (!assetIds.has(id)) errors.push(`题目 ${item.id} 引用未知资源 ${id}`);
  }
  return errors;
}

export async function verifyPackDigest(pack) {
  if (!pack.private) return true;
  const copy = { ...pack };
  delete copy.digest;
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(copy)));
  return [...new Uint8Array(bytes)].map(byte => byte.toString(16).padStart(2, "0")).join("") === pack.digest;
}

export function gradeQuestion(question, answer) {
  if (question.type === "choice") return String(answer) === String(question.answer);
  if (question.type === "multi") {
    const actual = [...(answer || [])].sort().join("|");
    return actual === [...question.answer].sort().join("|");
  }
  if (question.type === "notation") {
    const actual = (answer || []).map(normalizeNote).join("|");
    const expected = question.answer.map(normalizeNote).join("|");
    return actual === expected;
  }
  return null;
}

export function normalizeNote(note) {
  return `${note.letter || ""}${note.accidental || ""}${Number(note.octave)}:${note.duration || "quarter"}`;
}

export function selectQuestions(questions, { mode = "mixed", topic = "all", mistakes = [], limit = 20, random = Math.random } = {}) {
  let pool = questions.filter(q => topic === "all" || q.topic === topic);
  if (mode === "mistakes") pool = pool.filter(q => mistakes.includes(q.id));
  if (mode === "diagnostic") {
    const seen = new Set();
    pool = pool.filter(q => seen.has(q.topic) ? false : (seen.add(q.topic), true));
  }
  if (mode === "mixed") {
    pool = [...pool];
    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
  }
  return pool.slice(0, limit);
}

export function progressSummary(progress, totalQuestions = 0) {
  const answers = Object.values(progress.answers || {});
  const correct = answers.filter(item => item.correct).length;
  return {
    answered: answers.length,
    correct,
    accuracy: answers.length ? Math.round(correct / answers.length * 100) : 0,
    coverage: totalQuestions ? Math.round(new Set(answers.map(item => item.questionId)).size / totalQuestions * 100) : 0
  };
}
