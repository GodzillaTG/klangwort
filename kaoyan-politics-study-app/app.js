const EXAM_PROFILE = {
  id: "exam-profile-2026-fallback",
  targetExam: "2027 考研（待官方大纲）",
  baseline: "2026 公开结构基线",
  durationMinutes: 180,
  totalPoints: 100,
  totalQuestions: 38,
  sections: [
    { label: "单项选择题", range: "1–16", count: 16, pointsEach: 1 },
    { label: "多项选择题", range: "17–33", count: 17, pointsEach: 2 },
    { label: "材料分析题", range: "34–38", count: 5, pointsEach: 10 }
  ]
};

const SUBJECTS = [
  ["marx", "马克思主义基本原理"],
  ["mao", "毛泽东思想和中国特色社会主义理论体系概论"],
  ["xi", "习近平新时代中国特色社会主义思想概论"],
  ["history", "中国近现代史纲要"],
  ["ethics", "思想道德与法治"],
  ["current", "形势与政策以及当代世界经济与政治"]
];

const CHAPTERS = [
  { id: "marx-cognition", subjectId: "marx", title: "认识论" },
  { id: "marx-dialectics", subjectId: "marx", title: "唯物辩证法" },
  { id: "df-marx-01", subjectId: "marx", title: "东方马原 01 · 导论" },
  { id: "df-marx-02", subjectId: "marx", title: "东方马原 02 · 哲学基本问题" },
  { id: "df-marx-03", subjectId: "marx", title: "东方马原 03 · 辩证唯物论" },
  { id: "df-marx-04", subjectId: "marx", title: "东方马原 04 · 唯物辩证法" },
  { id: "df-marx-05", subjectId: "marx", title: "东方马原 05 · 认识论" },
  { id: "df-marx-06", subjectId: "marx", title: "东方马原 06 · 唯物史观" },
  { id: "df-marx-07", subjectId: "marx", title: "东方马原 07 · 资本主义本质及规律" },
  { id: "df-marx-08", subjectId: "marx", title: "东方马原 08 · 资本主义发展趋势" },
  { id: "df-marx-09", subjectId: "marx", title: "东方马原 09 · 社会主义发展" },
  { id: "df-marx-10", subjectId: "marx", title: "东方马原 10 · 共产主义理想" },
  { id: "history-new-democracy", subjectId: "history", title: "新民主主义革命" },
  { id: "ethics-rule-law", subjectId: "ethics", title: "法治素养" }
];
const REVIEW_STATES = ["unseen", "learning", "fragile", "stable", "mastered"];
const CURRENT_AFFAIRS_TOPICS = []; // Only populated by verified manual source import.
const MOCK_EXAM = { id: "mock-blueprint-2026-fallback", examProfileId: EXAM_PROFILE.id, version: "2026-fallback", status: "blueprint-only" };

const KNOWLEDGE_NODES = [
  { id: "kn-practice-truth", subject: "marx", title: "实践与真理标准", chapter: "认识论", prerequisite: "kn-practice-cognition", confusion: "kn-truth-objectivity" },
  { id: "kn-contradiction-particularity", subject: "marx", title: "矛盾普遍性与特殊性", chapter: "唯物辩证法", prerequisite: "kn-contradiction", confusion: "kn-common-individual" },
  { id: "kn-df-marx-origin", subject: "marx", title: "马克思主义创立与鲜明特征", chapter: "东方马原 01 · 导论", prerequisite: null, confusion: "kn-df-marx-scientific-socialism" },
  { id: "kn-df-marx-philosophy", subject: "marx", title: "哲学基本问题", chapter: "东方马原 02 · 哲学基本问题", prerequisite: "kn-df-marx-origin", confusion: "kn-df-marx-historical-materialism" },
  { id: "kn-df-marx-material", subject: "marx", title: "物质、运动与意识", chapter: "东方马原 03 · 辩证唯物论", prerequisite: "kn-df-marx-philosophy", confusion: "kn-df-marx-practice-cognition" },
  { id: "kn-df-marx-dialectics", subject: "marx", title: "联系、发展与矛盾规律", chapter: "东方马原 04 · 唯物辩证法", prerequisite: "kn-df-marx-material", confusion: "kn-contradiction-particularity" },
  { id: "kn-df-marx-cognition", subject: "marx", title: "实践、认识与真理", chapter: "东方马原 05 · 认识论", prerequisite: "kn-df-marx-material", confusion: "kn-practice-truth" },
  { id: "kn-df-marx-history", subject: "marx", title: "社会基本矛盾与人民群众", chapter: "东方马原 06 · 唯物史观", prerequisite: "kn-df-marx-dialectics", confusion: "kn-df-marx-philosophy" },
  { id: "kn-df-marx-capital", subject: "marx", title: "商品、价值与剩余价值", chapter: "东方马原 07 · 资本主义本质及规律", prerequisite: "kn-df-marx-history", confusion: "kn-df-marx-monopoly" },
  { id: "kn-df-marx-monopoly", subject: "marx", title: "垄断、竞争与资本主义趋势", chapter: "东方马原 08 · 资本主义发展趋势", prerequisite: "kn-df-marx-capital", confusion: "kn-df-marx-capital" },
  { id: "kn-df-marx-socialism", subject: "marx", title: "社会主义从空想到科学", chapter: "东方马原 09 · 社会主义发展", prerequisite: "kn-df-marx-history", confusion: "kn-df-marx-communism" },
  { id: "kn-df-marx-communism", subject: "marx", title: "共产主义理想及其实现", chapter: "东方马原 10 · 共产主义理想", prerequisite: "kn-df-marx-socialism", confusion: "kn-df-marx-socialism" },
  { id: "kn-may-fourth", subject: "history", title: "五四运动与新民主主义革命", chapter: "新民主主义革命", prerequisite: "kn-old-democracy", confusion: "kn-revolution-task" },
  { id: "kn-rule-virtue", subject: "ethics", title: "法治与德治相结合", chapter: "法治素养", prerequisite: "kn-rule-law", confusion: "kn-rule-vs-virtue" }
];

const ERROR_TAGS = ["记忆缺失", "概念混淆", "时间线混淆", "主体/对象错配", "帽子词混淆", "绝对化表述误判", "多选少选", "多选多选", "材料理解偏差", "原理不会迁移", "粗心"];
const ERROR_ACTIONS = {
  "记忆缺失": "遮住解析，先口述“正式表述”；30 秒后做同考点巩固题。",
  "概念混淆": "先读易混对比，只说出两者的区分标准，再做对比型巩固题。",
  "时间线混淆": "写出事件前后各一个时间锚点，再按顺序口述因果链。",
  "主体/对象错配": "把知识点改写成“主体—动作—对象”三元组后重答。",
  "帽子词混淆": "圈出题干中的“根本、首要、本质、核心”等定位词，再匹配正式表述。",
  "绝对化表述误判": "逐项检查“唯一、全部、完全、立即”等绝对化词，说明它错在哪里。",
  "多选少选": "逐项给出保留或排除理由；未能说明理由的选项不能凭感觉漏掉。",
  "多选多选": "先找错误选项的偷换点，再重新执行逐项排除。",
  "材料理解偏差": "重新圈材料中的主体、变化和结果，再把每一句材料对应到原理。",
  "原理不会迁移": "先写原理，再用“材料中的……体现……”完成一次桥接。",
  "粗心": "执行 10 秒复核：题型、否定词、选项数量、最终选择四项检查。"
};
const REVIEW_LABELS = ["立即重测", "短时重测", "次日复习", "3 日复习", "7 日复习", "14 日复习", "30 日复习"];
const NAV = [
  ["today", "◉", "今日"], ["dongfang", "东", "东方马原"], ["drill", "◇", "分类刷题"], ["mock", "□", "模拟考试"],
  ["wrong", "×", "错题本"], ["memory", "⌁", "速记"], ["map", "⌘", "知识地图"], ["data", "▥", "数据"]
];

const STORAGE_KEY = "yanzheng-study-state-v1";
const ROUND_STORAGE_KEY = "yanzheng-drill-round-seen-v1";
const MINI_MOCK_PROFILE = { id: "mini-mock-original-v1", durationMinutes: 10, version: "sample-2026-v1" };
const defaultStudyState = {
  userStudyProfile: { id: "local-demo-user", targetExam: "2027", dailyMinutes: 25, plannedExamDate: "2026-12-20" },
  attempts: [],
  mockAttempts: [],
  currentAffairsSources: [],
  favorites: [],
  unsure: [],
  reviews: {},
  mastery: {},
  dailyMinutes: 25,
  queueRatio: { due: 40, weak: 30, new: 20, mixed: 10 }
};

let questions = [];
let dongfangCourse = { chapters: [], inventory: {} };
let route = location.hash.replace("#", "") || "today";
let drill = { index: 0, selected: [], submitted: false, completed: false, seenIds: loadRoundSeen(), filters: { subject: "all", chapter: "all", node: "all", type: "all", difficulty: "all", mastery: "all", error: "all", source: "all", current: "all", highMix: false, wrong: false, favorite: false, due: false } };
let study = loadStudy();
let miniMock = { active: false, submitted: false, index: 0, answers: {}, startedAt: null, finishedAt: null };
let mockTimerId = null;
let analysisExpanded = false;
let selectedCourseChapterId = "df-marx-01";

function loadStudy() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      ...defaultStudyState,
      ...stored,
      userStudyProfile: { ...defaultStudyState.userStudyProfile, ...(stored.userStudyProfile || {}) },
      queueRatio: { ...defaultStudyState.queueRatio, ...(stored.queueRatio || {}) }
    };
  }
  catch { return structuredClone(defaultStudyState); }
}
function saveStudy() { localStorage.setItem(STORAGE_KEY, JSON.stringify(study)); }
function loadRoundSeen() {
  try { return JSON.parse(sessionStorage.getItem(ROUND_STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function saveRoundSeen() { sessionStorage.setItem(ROUND_STORAGE_KEY, JSON.stringify(drill.seenIds)); }
function markRoundSeen(id) {
  if (!drill.seenIds.includes(id)) drill.seenIds.push(id);
  saveRoundSeen();
}
function resetDrillRound() {
  drill.seenIds = [];
  drill.index = 0;
  drill.selected = [];
  drill.submitted = false;
  drill.completed = false;
  drill.startedAt = Date.now();
  saveRoundSeen();
}
function subjectName(id) { return SUBJECTS.find(([key]) => key === id)?.[1] || id; }
function nodeById(id) { return KNOWLEDGE_NODES.find(node => node.id === id); }
function latestAttempt(id) { return [...study.attempts].reverse().find(a => a.questionId === id); }
function dueNow(id) { const event = study.reviews[id]; return event && new Date(event.nextReviewAt) <= new Date(); }
function formatDate(iso) { return new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(iso)); }
function toast(message) { const el = document.querySelector("#toast"); el.textContent = message; el.classList.add("show"); setTimeout(() => el.classList.remove("show"), 1700); }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]); }

function renderNav() {
  document.querySelector("#primary-nav").innerHTML = NAV.map(([key, icon, label]) => `
    <button class="nav-button ${route === key ? "active" : ""}" data-route="${key}"><span>${icon}</span>${label}</button>
  `).join("");
  document.querySelectorAll("[data-route]").forEach(button => button.addEventListener("click", () => { location.hash = button.dataset.route; }));
}

function pageHead(eyebrow, title, lede) {
  return `<header class="page-head"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p class="lede">${lede}</p></div></header>`;
}

function renderTodaySettings() {
  const ratio = study.queueRatio;
  return `<details class="card settings-panel">
    <summary><span><strong>学习计划设置</strong><small>每日时长、考试日期与队列比例</small></span><span class="summary-action">展开设置</span></summary>
    <div class="settings-grid">
      <div class="field"><label for="daily-minutes">每日学习分钟</label><input id="daily-minutes" type="number" min="10" max="180" value="${study.dailyMinutes}" /></div>
      <div class="field"><label for="planned-exam-date">个人计划考试日期</label><input id="planned-exam-date" type="date" value="${study.userStudyProfile.plannedExamDate}" /></div>
      <div class="field"><label for="ratio-due">到期复习 %</label><input id="ratio-due" type="number" min="0" max="100" value="${ratio.due}" /></div>
      <div class="field"><label for="ratio-weak">弱项错题 %</label><input id="ratio-weak" type="number" min="0" max="100" value="${ratio.weak}" /></div>
      <div class="field"><label for="ratio-new">新题 %</label><input id="ratio-new" type="number" min="0" max="100" value="${ratio.new}" /></div>
      <div class="field"><label for="ratio-mixed">混合挑战 %</label><input id="ratio-mixed" type="number" min="0" max="100" value="${ratio.mixed}" /></div>
    </div>
    <p class="source">四项比例必须合计 100%。计划日期用于压缩复习间隔，仅是个人设置，不代表官方考试公告。</p>
    <button class="primary" data-save-plan>保存学习计划</button>
  </details>`;
}

function renderReviewTimeline() {
  const events = Object.values(study.reviews).sort((a, b) => new Date(a.nextReviewAt) - new Date(b.nextReviewAt)).slice(0, 6);
  if (!events.length) return `<article class="card empty compact-empty"><h3>还没有复习事件</h3><p>完成一道题后，这里会出现下一次主动回忆时间。</p></article>`;
  return `<section class="review-timeline">${events.map(event => {
    const q = questions.find(item => item.id === event.questionId);
    const due = new Date(event.nextReviewAt) <= new Date();
    return `<article class="review-row ${due ? "is-due" : ""}"><span class="review-dot"></span><div><strong>${nodeById(event.knowledgeNodeId)?.title || "知识点复习"}</strong><p>${REVIEW_LABELS[event.intervalIndex] || "自适应复习"} · ${q?.type === "multiple" ? "多选题" : "单选题"}</p></div><time>${due ? "现在到期" : formatDate(event.nextReviewAt)}</time><button class="secondary" data-open-question="${event.questionId}">开始</button></article>`;
  }).join("")}</section>`;
}

function renderToday() {
  const due = questions.filter(q => dueNow(q.id)).length;
  const wrong = new Set(study.attempts.filter(a => !a.correct).map(a => a.questionId)).size;
  const accuracy = study.attempts.length ? Math.round(study.attempts.filter(a => a.correct).length / study.attempts.length * 100) : 0;
  const queue = buildDailyQueue().slice(0, 5);
  return `${pageHead("DAILY RETRIEVAL", `今天，用 ${study.dailyMinutes} 分钟拿回知识。`, "先处理到期复习和近期错题，再学一点新内容。每一道题都会回到知识点，而不是只告诉你答案字母。")}
    <section class="card hero">
      <div class="hero-row">
        <div><div class="eyebrow">今日主动回忆</div><h2>${due ? `${due} 个知识点已到期` : "从一个高频易混点开始"}</h2><p class="lede">队列比例：${study.queueRatio.due}% 到期复习 · ${study.queueRatio.weak}% 弱项错题 · ${study.queueRatio.new}% 新题 · ${study.queueRatio.mixed}% 混合挑战</p><button class="primary" data-start-daily>开始今日学习</button></div>
        <div class="queue-meter"><small>今日目标</small><div><strong>${study.attempts.filter(a => a.day === new Date().toISOString().slice(0,10)).length}</strong> / 10 题</div><div class="meter"><i></i></div><small>预计 ${study.dailyMinutes} 分钟</small></div>
      </div>
    </section>
    <div class="grid-3">
      <article class="card stat"><small>到期复习</small><strong>${due}</strong><span>优先主动回忆</span></article>
      <article class="card stat"><small>累计正确率</small><strong>${accuracy}%</strong><span>${study.attempts.length} 次作答</span></article>
      <article class="card stat"><small>待修复错题</small><strong>${wrong}</strong><span>按错因安排动作</span></article>
    </div>
    <div class="section-title"><h2>今日队列</h2><button class="ghost" data-route-inline="drill">调整筛选 →</button></div>
    <section class="queue-list">${queue.length ? queue.map((q, index) => `<article class="queue-item"><span class="queue-type">${index < Math.ceil(queue.length * study.queueRatio.due / 100) ? "到期/弱项" : "新题"}</span><div><strong>${nodeById(q.knowledge_node_ids[0])?.title}</strong><p>${subjectName(q.subject_id)} · ${q.type === "single" ? "单选" : "多选"} · 难度 ${q.difficulty}</p></div><button class="secondary" data-open-question="${q.id}">开始</button></article>`).join("") : `<article class="card empty"><h2>本轮题目已全部完成</h2><p>不会自动重复出题。需要再刷一轮时，请主动开启新一轮。</p><button class="primary" data-restart-round>开启新一轮</button></article>`}</section>
    <div class="section-title"><h2>复习时间线</h2><span class="tag">主动回忆优先</span></div>${renderReviewTimeline()}
    <div class="section-title"><h2>个性化设置</h2></div>${renderTodaySettings()}`;
}

function buildDailyQueue() {
  const due = questions.filter(q => dueNow(q.id));
  const weak = questions.filter(q => latestAttempt(q.id) && !latestAttempt(q.id).correct && !due.includes(q));
  const fresh = questions.filter(q => !latestAttempt(q.id));
  const mixed = questions.filter(q => !due.includes(q) && !weak.includes(q) && !fresh.includes(q));
  return [...due, ...weak, ...fresh, ...mixed].filter(q => !drill.seenIds.includes(q.id));
}

function filteredQuestions() {
  return questions.filter(q => {
    const attempt = latestAttempt(q.id);
    const mastery = study.mastery[q.knowledge_node_ids[0]] || "unseen";
    return (drill.filters.subject === "all" || q.subject_id === drill.filters.subject)
      && (drill.filters.type === "all" || q.type === drill.filters.type)
      && (drill.filters.difficulty === "all" || String(q.difficulty) === drill.filters.difficulty)
      && (drill.filters.chapter === "all" || q.chapter_id === drill.filters.chapter)
      && (drill.filters.node === "all" || q.knowledge_node_ids.includes(drill.filters.node))
      && (drill.filters.mastery === "all" || mastery === drill.filters.mastery)
      && (drill.filters.error === "all" || attempt?.errorTags?.includes(drill.filters.error))
      && (drill.filters.source === "all" || q.source.version === drill.filters.source)
      && (drill.filters.current === "all" || q.source.type === "verified-current-affairs")
      && (!drill.filters.highMix || Boolean(q.confusion_comparison))
      && (!drill.filters.wrong || (attempt && !attempt.correct))
      && (!drill.filters.favorite || study.favorites.includes(q.id))
      && (!drill.filters.due || dueNow(q.id));
  });
}

function selectField(label, key, options) {
  return `<div class="field"><label>${label}</label><select data-filter="${key}">${options.map(([value, text]) => `<option value="${value}" ${drill.filters[key] === value ? "selected" : ""}>${text}</option>`).join("")}</select></div>`;
}

function renderDrill() {
  const list = filteredQuestions();
  if (drill.index >= list.length) drill.index = 0;
  if (!drill.submitted && list[drill.index] && drill.seenIds.includes(list[drill.index].id)) {
    const nextUnseen = list.find(q => !drill.seenIds.includes(q.id));
    if (nextUnseen) drill.index = list.indexOf(nextUnseen);
    else drill.completed = true;
  }
  const q = list[drill.index];
  const sourceOptions = [...new Map(questions.map(item => [item.source.version, item.source.title])).entries()];
  const filters = `<section class="card filter-panel">
    <div class="filter-heading"><div><strong>选择训练范围</strong><small>基础筛选保持常用项，更多条件按需展开</small></div><span class="tag">${list.length} 道可用题</span></div>
    <div class="filter-primary">
      ${selectField("科目", "subject", [["all", "全部科目"], ...SUBJECTS])}
      ${selectField("题型", "type", [["all", "全部题型"], ["single", "单项选择"], ["multiple", "多项选择"]])}
      ${selectField("难度", "difficulty", [["all", "全部难度"], ["1", "1 入门"], ["2", "2 基础"], ["3", "3 综合"], ["4", "4 较难"], ["5", "5 冲刺"]])}
      ${selectField("掌握状态", "mastery", [["all", "全部状态"], ["unseen", "未学习"], ["learning", "学习中"], ["fragile", "脆弱"], ["stable", "稳定"], ["mastered", "已掌握"]])}
    </div>
    <details class="advanced-filter"><summary>更多筛选：章节、知识点、错因、版本与时政</summary><div class="advanced-grid">
      ${selectField("错误类型", "error", [["all", "全部错因"], ...ERROR_TAGS.map(x => [x, x])])}
      ${selectField("章节", "chapter", [["all", "全部章节"], ...CHAPTERS.map(chapter => [chapter.id, chapter.title])])}
      ${selectField("知识点", "node", [["all", "全部知识点"], ...KNOWLEDGE_NODES.map(node => [node.id, node.title])])}
      ${selectField("来源 / 版本", "source", [["all", "全部原创版本"], ...sourceOptions.map(([version, title]) => [version, `${title} · ${version}`])])}
      ${selectField("时政月份 / 主题", "current", [["all", "全部内容"], ["verified", "已核验时政（当前 0 题）"]])}
    </div></details>
    <div class="toggles">${[["highMix", "高频易混点"], ["wrong", "仅错题"], ["favorite", "仅收藏"], ["due", "仅到期复习"]].map(([key,label]) => `<button class="toggle ${drill.filters[key] ? "active" : ""}" data-toggle="${key}">${label}</button>`).join("")}</div>
  </section>`;
  const finished = `<section class="card empty"><h2>本轮刷题完成</h2><p>已做过的题不会在本轮再次出现。当前范围共 ${list.length} 题。</p><button class="primary" data-restart-round>开启新一轮</button></section>`;
  const empty = `<section class="card empty"><h2>没有符合条件的题目</h2><p>换一组筛选条件，或等待到期复习。</p></section>`;
  return `${pageHead("CLASSIFIED DRILL", "分类刷题", "按科目、题型、难度、掌握状态和错因缩小范围。同一轮中每道题只出现一次，完成后不会自动循环。")}${filters}${drill.completed && list.length ? finished : q ? renderQuestion(q, list.length) : empty}`;
}

function renderQuestion(q, total) {
  const isMultiple = q.type === "multiple";
  const completedInScope = filteredQuestions().filter(item => drill.seenIds.includes(item.id)).length;
  return `<div class="question-layout">
    <article class="card question-card">
      <div class="question-meta"><span class="tag">${isMultiple ? "多项选择" : "单项选择"}</span><span>${subjectName(q.subject_id)}</span><span>·</span><span>${nodeById(q.knowledge_node_ids[0])?.chapter}</span><span>·</span><span>难度 ${q.difficulty}/5</span><span class="no-repeat-mark">本轮 ${Math.min(total, completedInScope + 1)}/${total} · 不重复</span></div>
      <h2>${escapeHtml(q.stem)}</h2>
      <div class="options">${Object.entries(q.options).map(([letter, text]) => {
        const selected = drill.selected.includes(letter);
        const correct = drill.submitted && q.correct_answers.includes(letter);
        const wrong = drill.submitted && selected && !correct;
        return `<button class="option ${selected ? "selected" : ""} ${correct ? "correct" : ""} ${wrong ? "wrong" : ""}" data-option="${letter}" ${drill.submitted ? "disabled" : ""}><span class="letter">${letter}</span><span>${escapeHtml(text)}</span></button>`;
      }).join("")}</div>
      <div class="button-row">
        <button class="primary" data-submit ${drill.selected.length && !drill.submitted ? "" : "disabled"}>提交答案</button>
        <button class="secondary" data-unsure>${study.unsure.includes(q.id) ? "已标记不确定" : "标记不确定"}</button>
        <button class="secondary" data-favorite>${study.favorites.includes(q.id) ? "★ 已收藏" : "☆ 收藏"}</button>
      </div>
      ${drill.submitted ? renderResult(q) : ""}
    </article>
    <aside class="study-side">
      <article class="card mini-card"><strong>答题提示</strong><p>${isMultiple ? "至少两个正确项；多选、少选、错选均不得分。" : "只有一个最符合题意的选项。"}</p></article>
      <article class="card mini-card"><strong>主动回忆</strong><p>先说出判断依据，再选择答案。猜对不会直接变成“已掌握”。</p></article>
      <article class="card mini-card"><strong>掌握状态</strong><p>${study.mastery[q.knowledge_node_ids[0]] || "unseen"} · ${dueNow(q.id) ? "已到期" : "未到期"}</p></article>
    </aside>
  </div>`;
}

function renderResult(q) {
  const attempt = latestAttempt(q.id);
  const correct = attempt?.correct;
  const nextReview = study.reviews[q.id]?.nextReviewAt;
  const primaryError = attempt?.errorTags?.[0];
  const action = primaryError ? ERROR_ACTIONS[primaryError] : "先用一句话复述判断依据，再进入同考点巩固题。";
  return `<section class="result">
    <div class="result-banner ${correct ? "good" : "bad"}"><strong>${correct ? "判断正确" : "这次没拿到分"}</strong><span>你的答案：${attempt?.answers.join("、") || "未选"} · 正确答案：${q.correct_answers.join("、")}</span><small>${Math.max(1, Math.round((attempt?.responseMs || 0) / 1000))} 秒 · ${attempt?.guessed ? "低置信/可能猜测" : "正常置信"}</small></div>
    <h3>一句话考点</h3><p class="lede">${q.one_line_point}</p>
    ${!correct ? `<div class="diagnosis"><h3>判断错误类型</h3><p class="lede">可多选。系统会根据首个错因安排下一步动作。</p><div class="chips">${ERROR_TAGS.map(tag => `<button class="chip ${attempt.errorTags.includes(tag) ? "active" : ""}" data-error-tag="${tag}">${tag}</button>`).join("")}</div><div class="action-card"><span>下一步学习动作</span><strong>${primaryError || "待诊断"}</strong><p>${action}</p></div></div>` : `<div class="action-card success-action"><span>巩固动作</span><strong>不要停在一次答对</strong><p>${action}</p></div>`}
    <div class="explain-grid">${Object.entries(q.option_explanations).map(([letter, text]) => `<div class="explain"><strong>${letter} ${q.correct_answers.includes(letter) ? "✓" : "×"}</strong><p>${text}</p></div>`).join("")}</div>
    <div class="learning-card">
      <div class="eyebrow">对应知识卡 · ${nodeById(q.knowledge_node_ids[0])?.title}</div>
      <h3>记忆秘诀</h3><p><strong>${q.memory_cue.label}</strong></p>
      <p class="formal"><strong>正式表述：</strong>${q.memory_cue.formal}</p>
      <p><strong>易混知识对比：</strong>${q.confusion_comparison}</p>
      <p><strong>常见命题陷阱：</strong>${q.trap}</p>
    </div>
    <p class="source">可信来源 / 知识版本：${q.source.title} · ${q.source.version} · 本题为原创模拟题</p>
    <p><strong>下次复习：</strong>${nextReview ? formatDate(nextReview) : "等待安排"}</p>
    <div class="button-row"><button class="primary" data-retry="${q.reinforcement_question_id}">同考点立即巩固题</button><button class="secondary" data-next>再来一题</button><button class="ghost" data-scroll-card>学这个考点</button></div>
  </section>`;
}

function scheduleReview(q, correct, responseMs, guessed) {
  const previous = study.reviews[q.id] || { intervalIndex: -1, repeatedErrors: 0 };
  const intervals = [0, 10 / 1440, 1, 3, 7, 14, 30];
  let nextIndex = correct && !guessed ? Math.min(previous.intervalIndex + 1, intervals.length - 1) : 0;
  if (!correct) previous.repeatedErrors += 1;
  const plannedDate = study.userStudyProfile.plannedExamDate || "2026-12-20";
  const examDate = new Date(`${plannedDate}T09:00:00+08:00`);
  const daysToExam = Math.max(1, (examDate - new Date()) / 86400000);
  const compression = daysToExam < 30 ? .55 : daysToExam < 90 ? .75 : 1;
  const difficultyFactor = 1 - (q.difficulty - 1) * .06;
  const speedFactor = responseMs < 5000 ? .75 : 1;
  const days = intervals[nextIndex] * compression * difficultyFactor * speedFactor;
  const next = new Date(Date.now() + Math.max(days * 86400000, correct ? 600000 : 30000));
  study.reviews[q.id] = { id: `review-${q.id}`, questionId: q.id, knowledgeNodeId: q.knowledge_node_ids[0], intervalIndex: nextIndex, repeatedErrors: previous.repeatedErrors, nextReviewAt: next.toISOString(), lastResult: correct, guessed, responseMs };
  const nodeId = q.knowledge_node_ids[0];
  study.mastery[nodeId] = calculateMastery(nodeId);
}

function calculateMastery(nodeId) {
  const attempts = study.attempts.filter(attempt => questions.find(item => item.id === attempt.questionId)?.knowledge_node_ids.includes(nodeId));
  if (!attempts.length) return "unseen";
  const latest = attempts.at(-1);
  if (!latest.correct) return "learning";
  const bestWeightByDay = new Map();
  attempts.filter(attempt => attempt.correct).forEach(attempt => {
    const weight = attempt.guessed || attempt.confidence === "low" ? .35 : 1;
    bestWeightByDay.set(attempt.day, Math.max(bestWeightByDay.get(attempt.day) || 0, weight));
  });
  const spacedWeight = [...bestWeightByDay.values()].reduce((sum, weight) => sum + weight, 0);
  if (spacedWeight >= 4) return "mastered";
  if (spacedWeight >= 2) return "stable";
  return "fragile";
}

function refreshMasteryStates() {
  KNOWLEDGE_NODES.forEach(node => { study.mastery[node.id] = calculateMastery(node.id); });
}

function getMiniMockQuestions() {
  return questions.filter(question => question.source.version === MINI_MOCK_PROFILE.version);
}

function scoreMiniMock() {
  const rows = getMiniMockQuestions().map(q => {
    const answers = miniMock.answers[q.id] || [];
    const correct = JSON.stringify([...answers].sort()) === JSON.stringify([...q.correct_answers].sort());
    const points = q.type === "multiple" ? 2 : 1;
    return { questionId: q.id, answers, correct, earned: correct ? points : 0, points };
  });
  return { rows, score: rows.reduce((sum, row) => sum + row.earned, 0), maxScore: rows.reduce((sum, row) => sum + row.points, 0) };
}

function renderMiniMock() {
  const mockQuestions = getMiniMockQuestions();
  if (miniMock.submitted) {
    const result = scoreMiniMock();
    const wrong = result.rows.filter(row => !row.correct);
    return `<section class="mock-result card">
      <div class="score-ring"><strong>${result.score}</strong><span>/ ${result.maxScore} 分</span></div>
      <div><div class="eyebrow">MINI MOCK RESULT</div><h2>${result.score === result.maxScore ? "全对，也要继续间隔复测" : "成绩已生成，下一步修复失分点"}</h2><p class="lede">严格计分：单选 1 分；多选 2 分，多选、少选、错选均为 0 分。本次答对 ${result.rows.length - wrong.length}/${result.rows.length} 题。</p></div>
      <div class="mock-breakdown">${result.rows.map((row, index) => `<article class="${row.correct ? "pass" : "fail"}"><span>${index + 1}</span><div><strong>${nodeById(mockQuestions[index].knowledge_node_ids[0])?.title}</strong><small>你的答案 ${row.answers.join("、") || "未答"} · 正确答案 ${mockQuestions[index].correct_answers.join("、")}</small></div><b>${row.earned}/${row.points}</b></article>`).join("")}</div>
      <div class="button-row"><button class="primary" data-review-mock-wrong ${wrong.length ? "" : "disabled"}>修复本次错题</button><button class="secondary" data-restart-mini-mock>再考一次</button><button class="ghost" data-exit-mini-mock>返回模考中心</button></div>
    </section>`;
  }
  const q = mockQuestions[miniMock.index];
  const selected = miniMock.answers[q.id] || [];
  return `<section class="mock-shell">
    <div class="mock-toolbar card"><div><span>原创迷你模考</span><strong id="mock-clock">10:00</strong></div><div><span>答题进度</span><strong>${Object.keys(miniMock.answers).length}/${mockQuestions.length}</strong></div><button class="secondary" data-submit-mini-mock>提前交卷</button></div>
    <div class="mock-progress" aria-label="题目导航">${mockQuestions.map((item, index) => `<button data-mock-index="${index}" class="${index === miniMock.index ? "current" : ""} ${miniMock.answers[item.id]?.length ? "answered" : ""}" aria-label="第 ${index + 1} 题">${index + 1}</button>`).join("")}</div>
    <article class="card question-card mock-question">
      <div class="question-meta"><span class="tag">${q.type === "multiple" ? "多项选择 · 2 分" : "单项选择 · 1 分"}</span><span>${subjectName(q.subject_id)}</span><span>第 ${miniMock.index + 1}/${mockQuestions.length} 题</span></div>
      <h2>${escapeHtml(q.stem)}</h2>
      <div class="options">${Object.entries(q.options).map(([letter, text]) => `<button class="option ${selected.includes(letter) ? "selected" : ""}" data-mock-option="${letter}"><span class="letter">${letter}</span><span>${escapeHtml(text)}</span></button>`).join("")}</div>
      <div class="button-row spread"><button class="secondary" data-mock-prev ${miniMock.index === 0 ? "disabled" : ""}>← 上一题</button><span class="source">作答期间不显示答案与解析</span><button class="primary" data-mock-next>${miniMock.index === mockQuestions.length - 1 ? "检查答题卡" : "保存并下一题 →"}</button></div>
    </article>
  </section>`;
}

function renderAnalysisPractice() {
  return `<article class="card analysis-card">
    <div class="eyebrow">MATERIAL ANALYSIS · 框架训练</div>
    <h3>材料：同类治理问题在不同地区呈现不同条件，各地在共同目标下探索差异化实施路径，并通过试点反馈持续修正方案。</h3>
    <div class="analysis-steps"><span>1 定位</span><span>2 原理</span><span>3 结合材料</span><span>4 结论</span></div>
    <p><strong>题目要求：</strong>运用矛盾普遍性和特殊性关系原理，分析为什么既要坚持共同目标，又要因地制宜。</p>
    ${analysisExpanded ? `<div class="analysis-answer">
      <p><strong>材料关键词：</strong>同类问题、不同条件、共同目标、差异化路径、试点修正。</p>
      <p><strong>应调用模块：</strong>矛盾普遍性与特殊性相互联结；具体问题具体分析。</p>
      <p><strong>答题骨架：</strong>普遍性说明共同目标和一般规律 → 特殊性说明各地条件不同 → 共性寓于个性之中 → 因地制宜并在实践中完善方案。</p>
      <div class="checklist"><label><input type="checkbox" /> 原理表述准确</label><label><input type="checkbox" /> 每个原理均结合材料</label><label><input type="checkbox" /> 层次清楚</label><label><input type="checkbox" /> 结论回扣题目</label></div>
      <p class="formal"><strong>示例答案：</strong>矛盾具有普遍性和特殊性，普遍性寓于特殊性之中，并通过特殊性表现出来。材料中的共同目标体现同类治理问题的一般要求，不同地区的具体条件则体现矛盾的特殊性。因此，既要把握共同规律，又要具体分析各地条件，形成差异化路径，并通过实践检验和完善方案。</p>
    </div>` : `<div class="recall-box"><strong>先口述 60 秒</strong><p>不要立即背答案。先按“定位—原理—材料—结论”说出四层框架。</p></div>`}
    <button class="secondary" data-toggle-analysis>${analysisExpanded ? "收起评分点" : "我已口述，查看评分点"}</button>
  </article>`;
}

function renderMock() {
  if (miniMock.active) return `${pageHead("TIMED PRACTICE", "原创迷你模考", "限时 10 分钟，8 道题只出现一次。交卷前不显示答案，严格执行多选题计分规则。")}${renderMiniMock()}`;
  const last = study.mockAttempts.at(-1);
  return `${pageHead("FULL MOCK", "模拟考试", "先读取 ExamProfile，再按版本计时和计分。完整卷结构与可用训练严格区分。")}
    <div class="notice"><strong>${EXAM_PROFILE.targetExam}</strong>：当前沿用 <strong>${EXAM_PROFILE.baseline}</strong>，不把 2027 内容宣称为官方。38 题完整卷仍需补齐并验证；当前开放经过验证的 8 题原创迷你模考。</div>
    <section class="card mini-mock-launch"><div><div class="eyebrow">AVAILABLE NOW</div><h2>10 分钟原创迷你模考</h2><p class="lede">${getMiniMockQuestions().length} 题 · 单选 1 分 / 多选 2 分 · 满分 ${getMiniMockQuestions().reduce((sum, q) => sum + (q.type === "multiple" ? 2 : 1), 0)} 分 · 交卷后统一解析</p>${last ? `<p class="tag">上次 ${last.score}/${last.maxScore} 分 · ${formatDate(last.finishedAt)}</p>` : ""}</div><button class="primary" data-start-mini-mock>开始模考</button></section>
    <div class="section-title"><h2>完整卷蓝图</h2><span class="tag">${EXAM_PROFILE.baseline}</span></div>
    <div class="grid-3"><article class="card stat"><small>考试时长</small><strong>${EXAM_PROFILE.durationMinutes}</strong><span>分钟</span></article><article class="card stat"><small>试卷总分</small><strong>${EXAM_PROFILE.totalPoints}</strong><span>分</span></article><article class="card stat"><small>题目总数</small><strong>${EXAM_PROFILE.totalQuestions}</strong><span>题</span></article></div>
    <section class="blueprint">${EXAM_PROFILE.sections.map(s => `<article class="card"><div class="big-number">${s.range}</div><h3>${s.label}</h3><p>${s.count} 题 · 每题 ${s.pointsEach} 分</p></article>`).join("")}</section>
    <div class="section-title"><h2>材料分析框架训练</h2><span class="tag">先回忆，后看答案</span></div>${renderAnalysisPractice()}`;
}

function courseChapterProgress(chapter) {
  const chapterQuestions = questions.filter(question => chapter.question_ids.includes(question.id));
  const answered = chapterQuestions.filter(question => latestAttempt(question.id)).length;
  const stable = chapterQuestions.filter(question => ["stable", "mastered"].includes(study.mastery[question.knowledge_node_ids[0]] || "unseen")).length;
  return { total: chapterQuestions.length, answered, stable, percent: chapterQuestions.length ? Math.round(answered / chapterQuestions.length * 100) : 0 };
}

function renderDongfang() {
  const chapters = dongfangCourse.chapters || [];
  const chapter = chapters.find(item => item.id === selectedCourseChapterId) || chapters[0];
  if (!chapter) return `${pageHead("DONGFANG POLITICS", "东方马原", "课程数据暂未加载。")}`;
  const chapterQuestions = questions.filter(question => chapter.question_ids.includes(question.id));
  const chapterProgress = courseChapterProgress(chapter);
  const allCourseQuestions = questions.filter(question => question.source.version === "dongfang-marx-2027-local-v1");
  const completedQuestions = allCourseQuestions.filter(question => latestAttempt(question.id)).length;
  const stableNodes = new Set(allCourseQuestions.filter(question => ["stable", "mastered"].includes(study.mastery[question.knowledge_node_ids[0]] || "unseen")).map(question => question.knowledge_node_ids[0])).size;
  return `${pageHead("DONGFANG POLITICS · MARXISM", "东方政治 · 马原专修", "按你桌面课程的 10 章结构重建：先用总结建立框架，再用原创题主动提取，错后立即回到对应知识卡。")}
    <section class="course-hero card">
      <div><span class="course-kicker">2027 长线预热 · 本地资料整理版</span><h2>从 50 节课程中，提炼一条可练习的马原主线</h2><p>导论 → 哲学基本问题 → 唯物论 → 辩证法 → 认识论 → 唯物史观 → 政治经济学 → 科学社会主义</p></div>
      <div class="course-score"><strong>${completedQuestions}</strong><span>/ ${allCourseQuestions.length} 题已完成</span><small>${stableNodes}/10 个核心节点达到稳定</small></div>
    </section>
    <div class="course-source-note"><strong>内容边界：</strong>章节顺序来自你本地的 ${dongfangCourse.inventory.videos || 50} 节马原视频、${dongfangCourse.inventory.pdfs || 8} 份课件 PDF 与 ${dongfangCourse.inventory.mindmaps || 10} 张思维导图；总结为重新整理，习题为原创命制，不复刻课程原题。2027 官方大纲未提供，因此不宣称为官方 2027 考纲。</div>
    <div class="grid-3 course-stats">
      <article class="card stat"><small>课程路线</small><strong>${chapters.length}</strong><span>章 · 完整主线</span></article>
      <article class="card stat"><small>原创配对题</small><strong>${allCourseQuestions.length}</strong><span>每章 2 题互相巩固</span></article>
      <article class="card stat"><small>本章进度</small><strong>${chapterProgress.percent}%</strong><span>${chapterProgress.answered}/${chapterProgress.total} 题已作答</span></article>
    </div>
    <div class="section-title"><h2>十章路线图</h2><span class="tag">点击切换章节</span></div>
    <nav class="course-roadmap" aria-label="东方马原章节">${chapters.map(item => {
      const progress = courseChapterProgress(item);
      return `<button class="course-step ${item.id === chapter.id ? "active" : ""} ${progress.percent === 100 ? "done" : ""}" data-course-chapter="${item.id}"><span>${String(item.order).padStart(2, "0")}</span><div><strong>${escapeHtml(item.short_title)}</strong><small>${progress.answered}/${progress.total} 题</small></div></button>`;
    }).join("")}</nav>
    <section class="course-chapter card">
      <header class="course-chapter-head"><div><div class="eyebrow">第 ${chapter.order} 章 · ${escapeHtml(chapter.module)}</div><h2>${escapeHtml(chapter.title)}</h2><p>${escapeHtml(chapter.coverage)}</p></div><span class="chapter-number">${String(chapter.order).padStart(2, "0")}</span></header>
      <div class="summary-grid">
        <article class="summary-main"><h3>核心总结</h3><ol>${chapter.summary.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ol></article>
        <aside class="summary-side">
          <div><span>正式表述</span><p>${escapeHtml(chapter.formal)}</p></div>
          <div><span>记忆秘诀</span><p>${escapeHtml(chapter.memory_cue)}</p></div>
          <div><span>高频易混</span><p>${escapeHtml(chapter.confusion)}</p></div>
        </aside>
      </div>
      <div class="exam-focus"><strong>命题抓手</strong><p>${escapeHtml(chapter.exam_focus)}</p></div>
      <div class="section-title compact"><h2>本章原创习题</h2><span class="tag">同考点配对 · 本轮不重复</span></div>
      <div class="course-question-list">${chapterQuestions.map((question, index) => {
        const attempt = latestAttempt(question.id);
        return `<article><span class="question-index">${index + 1}</span><div><strong>${escapeHtml(question.one_line_point)}</strong><small>${question.type === "multiple" ? "多项选择" : "单项选择"} · 难度 ${question.difficulty}/5 · ${attempt ? (attempt.correct ? "上次正确" : "待修复") : "未作答"}</small></div><button class="secondary" data-start-course-question="${question.id}">${attempt ? "再练" : "开始"}</button></article>`;
      }).join("")}</div>
      <div class="course-actions"><button class="primary" data-start-course-chapter="${chapter.id}">开始本章 ${chapterQuestions.length} 题</button><span>答题 → 错因 → 知识卡 → 配对巩固 → 间隔复习</span></div>
    </section>
    <div class="section-title"><h2>全程学习顺序</h2><span class="tag">主动回忆优先</span></div>
    <section class="course-loop card"><div><b>1</b><strong>先读框架</strong><span>只看核心关系，不背长段落</span></div><i>→</i><div><b>2</b><strong>遮住总结做题</strong><span>先说依据，再选择</span></div><i>→</i><div><b>3</b><strong>按错因修复</strong><span>回到正式表述与易混点</span></div><i>→</i><div><b>4</b><strong>间隔复测</strong><span>次日、3 日、7 日再提取</span></div></section>`;
}

function renderWrong() {
  const latestByQuestion = [...new Map(study.attempts.map(a => [a.questionId, a])).values()];
  const wrong = latestByQuestion.filter(a => !a.correct).map(a => questions.find(q => q.id === a.questionId)).filter(Boolean);
  return `${pageHead("ERROR REMEDIATION", "错题本", "错题按原因回到知识节点，先修复再重测。错因会决定后续学习动作和复习间隔。")}${wrong.length ? `<section class="queue-list">${wrong.map(q => { const a = latestAttempt(q.id); return `<article class="queue-item"><span class="queue-type">${a.errorTags.join("、") || "待诊断"}</span><div><strong>${nodeById(q.knowledge_node_ids[0])?.title}</strong><p>${q.one_line_point}</p></div><button class="secondary" data-open-question="${q.id}" data-allow-repeat="true">重做</button></article>`; }).join("")}</section>` : `<section class="card empty"><h2>暂时没有错题</h2><p>完成一次分类刷题后，错题会按错误类型出现在这里。</p></section>`}`;
}

function renderMemory() {
  return `${pageHead("MEMORY CUES", "速记不是口诀仓库", "每个钩子都和正式表述并列展示；钩子只负责唤起，不替代事实来源。")}<section class="map-list">${questions.filter((q, i, arr) => arr.findIndex(x => x.knowledge_node_ids[0] === q.knowledge_node_ids[0]) === i).map(q => `<article class="card learning-card"><div class="eyebrow">${nodeById(q.knowledge_node_ids[0])?.title}</div><h3>记忆秘诀</h3><p>${q.memory_cue.label}</p><p class="formal"><strong>正式表述：</strong>${q.memory_cue.formal}</p><p class="source">${q.source.title} · ${q.source.version}</p></article>`).join("")}</section>`;
}

function renderMap() {
  return `${pageHead("KNOWLEDGE MAP", "知识地图", "知识节点包含前置关系和易混配对；掌握必须来自多次间隔后的正确提取。")}<section class="card map-list">${KNOWLEDGE_NODES.map(node => { const state = study.mastery[node.id] || "unseen"; const width = { unseen: 3, learning: 24, fragile: 48, stable: 73, mastered: 100 }[state]; return `<div class="map-row"><div><strong>${node.title}</strong><small>${node.chapter}</small></div><div class="progress" title="${state}"><i style="width:${width}%"></i></div><span class="tag">${state}</span></div>`; }).join("")}</section>`;
}

function renderData() {
  const total = study.attempts.length;
  const correct = study.attempts.filter(a => a.correct).length;
  const avgMs = total ? Math.round(study.attempts.reduce((sum, a) => sum + a.responseMs, 0) / total / 1000) : 0;
  const errors = ERROR_TAGS.map(tag => [tag, study.attempts.filter(a => a.errorTags?.includes(tag)).length]).filter(([, count]) => count).sort((a,b) => b[1]-a[1]);
  const sources = study.currentAffairsSources || [];
  return `${pageHead("STUDY ANALYTICS", "数据只回答：下一步学什么？", "正确率与用时一起看；一次猜对不会抬高掌握状态，重复错因会缩短复习间隔。")}
    <div class="grid-3"><article class="card stat"><small>累计作答</small><strong>${total}</strong><span>次主动提取</span></article><article class="card stat"><small>正确率</small><strong>${total ? Math.round(correct/total*100) : 0}%</strong><span>多选严格计分</span></article><article class="card stat"><small>平均用时</small><strong>${avgMs}s</strong><span>快答会降低置信权重</span></article></div>
    <div class="section-title"><h2>高频错因</h2></div><section class="card">${errors.length ? errors.map(([tag,count]) => `<div class="map-row"><strong>${tag}</strong><div class="progress"><i style="width:${Math.min(100,count*24)}%"></i></div><span>${count} 次</span></div>`).join("") : `<div class="empty">还没有错因数据。先完成几道题。</div>`}</section>
    <div class="section-title"><h2>内容版本</h2></div><div class="notice">基础题：sample-2026-v1；东方马原：dongfang-marx-2027-local-v1（本地课程结构衍生的原创总结与习题）。时政来源记录：${sources.length} 条；未核验来源只保存，不自动生成题目。考试档案：${EXAM_PROFILE.baseline}。</div>
    <div class="section-title"><h2>时政可信来源导入</h2><span class="tag">人工录入 · 本机保存</span></div>
    <section class="card source-import">
      <div><h3>添加 SourceRecord</h3><p class="lede">请只录入官方或权威公开来源。系统保存标题、网址、发布日期、事件日期和检索日期；录入不等于事实已核验。</p></div>
      <div class="source-form">
        <div class="field wide"><label for="source-title">来源标题</label><input id="source-title" placeholder="例如：官方文件或权威报道标题" /></div>
        <div class="field wide"><label for="source-url">来源网址</label><input id="source-url" type="url" placeholder="https://..." /></div>
        <div class="field"><label for="source-topic">时政主题</label><input id="source-topic" placeholder="经济 / 外交 / 科技…" /></div>
        <div class="field"><label for="source-published">发布日期</label><input id="source-published" type="date" /></div>
        <div class="field"><label for="source-event">事件日期</label><input id="source-event" type="date" /></div>
        <div class="field"><label for="source-retrieved">检索日期</label><input id="source-retrieved" type="date" value="${new Date().toISOString().slice(0,10)}" /></div>
      </div>
      <button class="primary" data-save-source>保存来源记录</button>
    </section>
    <section class="source-list">${sources.length ? sources.map(source => `<article class="card"><div class="source-status">待人工核验</div><h3>${escapeHtml(source.title)}</h3><p>${escapeHtml(source.topic || "未分类")}</p><a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">查看原始来源 ↗</a><small>发布 ${source.publicationDate || "未填"} · 事件 ${source.eventDate || "未填"} · 检索 ${source.retrievalDate}</small></article>`).join("") : `<article class="card empty compact-empty"><h3>尚未导入来源</h3><p>在没有可信来源前，系统不会编造时政事实或生成时政题。</p></article>`}</section>`;
}

function renderRoute() {
  clearInterval(mockTimerId);
  renderNav();
  const renderers = { today: renderToday, dongfang: renderDongfang, drill: renderDrill, mock: renderMock, wrong: renderWrong, memory: renderMemory, map: renderMap, data: renderData };
  document.querySelector("#app").innerHTML = (renderers[route] || renderToday)();
  bindEvents();
  if (route === "mock" && miniMock.active && !miniMock.submitted) startMockTimer();
}

function openQuestion(id, { allowRepeat = false, preserveFilters = false } = {}) {
  if (!preserveFilters) drill.filters = { ...drill.filters, subject: "all", chapter: "all", node: "all", type: "all", difficulty: "all", mastery: "all", error: "all", source: "all", current: "all", highMix: false, wrong: false, favorite: false, due: false };
  if (allowRepeat) {
    drill.seenIds = drill.seenIds.filter(seenId => seenId !== id);
    saveRoundSeen();
  }
  const activeQuestions = filteredQuestions();
  let target = activeQuestions.find(q => q.id === id && !drill.seenIds.includes(q.id));
  if (!target) target = activeQuestions.find(q => !drill.seenIds.includes(q.id));
  drill.completed = !target;
  drill.index = target ? activeQuestions.indexOf(target) : 0;
  drill.selected = []; drill.submitted = false; drill.startedAt = Date.now();
  location.hash = "drill";
  if (route === "drill") renderRoute();
}

function openReinforcement(id) {
  const requested = questions.find(q => q.id === id);
  if (!requested) return;
  const nodeId = requested.knowledge_node_ids[0];
  const activeQuestions = filteredQuestions();
  const target = activeQuestions.find(q => q.id === id && !drill.seenIds.includes(q.id))
    || activeQuestions.find(q => q.knowledge_node_ids.includes(nodeId) && !drill.seenIds.includes(q.id));
  if (!target) {
    toast("本轮该考点已无未做题，不会重复出题");
    return;
  }
  openQuestion(target.id, { preserveFilters: true });
}

function startCourseChapter(chapterId) {
  drill.filters = { ...drill.filters, subject: "marx", chapter: chapterId, node: "all", type: "all", difficulty: "all", mastery: "all", error: "all", source: "dongfang-marx-2027-local-v1", current: "all", highMix: false, wrong: false, favorite: false, due: false };
  drill.index = 0;
  drill.selected = [];
  drill.submitted = false;
  drill.startedAt = Date.now();
  const chapterQuestions = questions.filter(question => question.chapter_id === chapterId);
  drill.completed = chapterQuestions.length > 0 && chapterQuestions.every(question => drill.seenIds.includes(question.id));
  location.hash = "drill";
  if (route === "drill") renderRoute();
}

function startMiniMock() {
  miniMock = { active: true, submitted: false, index: 0, answers: {}, startedAt: Date.now(), finishedAt: null };
  window.scrollTo({ top: 0, behavior: "auto" });
  renderRoute();
}

function finishMiniMock(autoSubmitted = false) {
  if (miniMock.submitted) return;
  miniMock.submitted = true;
  miniMock.finishedAt = new Date().toISOString();
  const result = scoreMiniMock();
  study.mockAttempts.push({
    id: `mock-attempt-${Date.now()}`,
    mockExamId: MINI_MOCK_PROFILE.id,
    examProfileId: EXAM_PROFILE.id,
    score: result.score,
    maxScore: result.maxScore,
    answers: structuredClone(miniMock.answers),
    startedAt: new Date(miniMock.startedAt).toISOString(),
    finishedAt: miniMock.finishedAt,
    autoSubmitted
  });
  saveStudy();
  window.scrollTo({ top: 0, behavior: "auto" });
  renderRoute();
}

function startMockTimer() {
  clearInterval(mockTimerId);
  const update = () => {
    const clock = document.querySelector("#mock-clock");
    if (!clock || !miniMock.active || miniMock.submitted) return;
    const totalSeconds = MINI_MOCK_PROFILE.durationMinutes * 60;
    const elapsed = Math.floor((Date.now() - miniMock.startedAt) / 1000);
    const remaining = Math.max(0, totalSeconds - elapsed);
    const minutes = String(Math.floor(remaining / 60)).padStart(2, "0");
    const seconds = String(remaining % 60).padStart(2, "0");
    clock.textContent = `${minutes}:${seconds}`;
    clock.classList.toggle("urgent", remaining <= 60);
    if (remaining === 0) finishMiniMock(true);
  };
  update();
  mockTimerId = setInterval(update, 1000);
}

function bindEvents() {
  document.querySelectorAll("[data-route-inline]").forEach(el => el.addEventListener("click", () => location.hash = el.dataset.routeInline));
  document.querySelectorAll("[data-course-chapter]").forEach(el => el.addEventListener("click", () => { selectedCourseChapterId = el.dataset.courseChapter; renderRoute(); document.querySelector(".course-chapter")?.scrollIntoView({ behavior: "smooth", block: "start" }); }));
  document.querySelector("[data-start-course-chapter]")?.addEventListener("click", event => startCourseChapter(event.currentTarget.dataset.startCourseChapter));
  document.querySelectorAll("[data-start-course-question]").forEach(el => el.addEventListener("click", () => openQuestion(el.dataset.startCourseQuestion, { allowRepeat: Boolean(latestAttempt(el.dataset.startCourseQuestion)) })));
  document.querySelector("[data-save-plan]")?.addEventListener("click", () => {
    const dailyMinutes = Number(document.querySelector("#daily-minutes")?.value);
    const plannedExamDate = document.querySelector("#planned-exam-date")?.value;
    const queueRatio = {
      due: Number(document.querySelector("#ratio-due")?.value),
      weak: Number(document.querySelector("#ratio-weak")?.value),
      new: Number(document.querySelector("#ratio-new")?.value),
      mixed: Number(document.querySelector("#ratio-mixed")?.value)
    };
    const ratioTotal = Object.values(queueRatio).reduce((sum, value) => sum + value, 0);
    if (!Number.isFinite(dailyMinutes) || dailyMinutes < 10 || dailyMinutes > 180 || !plannedExamDate || ratioTotal !== 100 || Object.values(queueRatio).some(value => value < 0 || value > 100)) {
      toast("请检查设置：每日 10–180 分钟，四项比例合计 100%");
      return;
    }
    study.dailyMinutes = dailyMinutes;
    study.userStudyProfile.dailyMinutes = dailyMinutes;
    study.userStudyProfile.plannedExamDate = plannedExamDate;
    study.queueRatio = queueRatio;
    saveStudy(); renderRoute(); toast("学习计划已保存");
  });
  document.querySelector("[data-save-source]")?.addEventListener("click", () => {
    const title = document.querySelector("#source-title")?.value.trim();
    const url = document.querySelector("#source-url")?.value.trim();
    const topic = document.querySelector("#source-topic")?.value.trim();
    const publicationDate = document.querySelector("#source-published")?.value;
    const eventDate = document.querySelector("#source-event")?.value;
    const retrievalDate = document.querySelector("#source-retrieved")?.value;
    let parsedUrl;
    try { parsedUrl = new URL(url); } catch { parsedUrl = null; }
    if (!title || !parsedUrl || !["http:", "https:"].includes(parsedUrl.protocol) || !publicationDate || !eventDate || !retrievalDate) {
      toast("请完整填写标题、HTTP(S)网址和三个日期");
      return;
    }
    if (study.currentAffairsSources.some(source => source.url === parsedUrl.href)) {
      toast("该来源网址已经保存，无需重复导入");
      return;
    }
    study.currentAffairsSources.push({ id: `source-${Date.now()}`, title, url: parsedUrl.href, topic, publicationDate, eventDate, retrievalDate, verified: false, createdAt: new Date().toISOString() });
    saveStudy(); renderRoute(); toast("来源已保存，等待人工核验");
  });
  document.querySelector("[data-start-daily]")?.addEventListener("click", () => openQuestion(buildDailyQueue()[0]?.id || questions[0].id));
  document.querySelectorAll("[data-open-question]").forEach(el => el.addEventListener("click", () => openQuestion(el.dataset.openQuestion, { allowRepeat: el.dataset.allowRepeat === "true" })));
  document.querySelectorAll("[data-filter]").forEach(el => el.addEventListener("change", () => { drill.filters[el.dataset.filter] = el.value; drill.index = 0; drill.selected = []; drill.submitted = false; drill.completed = false; renderRoute(); }));
  document.querySelectorAll("[data-toggle]").forEach(el => el.addEventListener("click", () => { const key = el.dataset.toggle; drill.filters[key] = !drill.filters[key]; drill.index = 0; drill.selected = []; drill.submitted = false; drill.completed = false; renderRoute(); }));
  document.querySelectorAll("[data-restart-round]").forEach(el => el.addEventListener("click", () => { resetDrillRound(); renderRoute(); }));
  document.querySelectorAll("[data-option]").forEach(el => el.addEventListener("click", () => {
    const list = filteredQuestions(), q = list[drill.index];
    if (q.type === "single") drill.selected = [el.dataset.option];
    else drill.selected = drill.selected.includes(el.dataset.option) ? drill.selected.filter(x => x !== el.dataset.option) : [...drill.selected, el.dataset.option].sort();
    renderRoute();
  }));
  document.querySelector("[data-submit]")?.addEventListener("click", () => {
    const q = filteredQuestions()[drill.index];
    const correct = JSON.stringify([...drill.selected].sort()) === JSON.stringify([...q.correct_answers].sort());
    const responseMs = Date.now() - (drill.startedAt || Date.now() - 15000);
    const guessed = responseMs < 5000 || study.unsure.includes(q.id);
    let errorTags = [];
    if (!correct) {
      if (q.type === "multiple" && drill.selected.length < q.correct_answers.length) errorTags = ["多选少选"];
      else if (q.type === "multiple" && drill.selected.some(x => !q.correct_answers.includes(x))) errorTags = ["多选多选"];
      else errorTags = ["概念混淆"];
    }
    study.attempts.push({ id: `attempt-${Date.now()}`, questionId: q.id, answers: [...drill.selected], correct, responseMs, confidence: guessed ? "low" : "normal", guessed, errorTags, day: new Date().toISOString().slice(0,10), createdAt: new Date().toISOString() });
    markRoundSeen(q.id); scheduleReview(q, correct, responseMs, guessed); saveStudy(); drill.submitted = true; renderRoute();
  });
  document.querySelector("[data-unsure]")?.addEventListener("click", () => { const q = filteredQuestions()[drill.index]; study.unsure = study.unsure.includes(q.id) ? study.unsure.filter(id => id !== q.id) : [...study.unsure, q.id]; saveStudy(); renderRoute(); });
  document.querySelector("[data-favorite]")?.addEventListener("click", () => { const q = filteredQuestions()[drill.index]; study.favorites = study.favorites.includes(q.id) ? study.favorites.filter(id => id !== q.id) : [...study.favorites, q.id]; saveStudy(); renderRoute(); toast(study.favorites.includes(q.id) ? "已收藏" : "已取消收藏"); });
  document.querySelectorAll("[data-error-tag]").forEach(el => el.addEventListener("click", () => { const q = filteredQuestions()[drill.index]; const a = latestAttempt(q.id); a.errorTags = a.errorTags.includes(el.dataset.errorTag) ? a.errorTags.filter(x => x !== el.dataset.errorTag) : [...a.errorTags, el.dataset.errorTag]; saveStudy(); renderRoute(); }));
  document.querySelector("[data-retry]")?.addEventListener("click", event => openReinforcement(event.currentTarget.dataset.retry));
  document.querySelector("[data-next]")?.addEventListener("click", () => {
    const list = filteredQuestions();
    let nextIndex = -1;
    for (let offset = 1; offset <= list.length; offset += 1) {
      const candidateIndex = (drill.index + offset) % list.length;
      if (!drill.seenIds.includes(list[candidateIndex].id)) { nextIndex = candidateIndex; break; }
    }
    drill.selected = []; drill.submitted = false; drill.startedAt = Date.now();
    if (nextIndex === -1) drill.completed = true;
    else drill.index = nextIndex;
    renderRoute(); document.querySelector("#app").focus();
  });
  document.querySelector("[data-scroll-card]")?.addEventListener("click", () => document.querySelector(".learning-card")?.scrollIntoView({ behavior: "smooth" }));
  document.querySelector("[data-start-mini-mock]")?.addEventListener("click", startMiniMock);
  document.querySelectorAll("[data-mock-index]").forEach(el => el.addEventListener("click", () => { miniMock.index = Number(el.dataset.mockIndex); renderRoute(); }));
  document.querySelectorAll("[data-mock-option]").forEach(el => el.addEventListener("click", () => {
    const q = getMiniMockQuestions()[miniMock.index];
    const current = miniMock.answers[q.id] || [];
    miniMock.answers[q.id] = q.type === "single"
      ? [el.dataset.mockOption]
      : current.includes(el.dataset.mockOption) ? current.filter(item => item !== el.dataset.mockOption) : [...current, el.dataset.mockOption].sort();
    renderRoute();
  }));
  document.querySelector("[data-mock-prev]")?.addEventListener("click", () => { miniMock.index = Math.max(0, miniMock.index - 1); renderRoute(); });
  document.querySelector("[data-mock-next]")?.addEventListener("click", () => {
    const mockQuestions = getMiniMockQuestions();
    if (miniMock.index < mockQuestions.length - 1) miniMock.index += 1;
    else {
      const unanswered = mockQuestions.findIndex(q => !(miniMock.answers[q.id]?.length));
      if (unanswered >= 0) { miniMock.index = unanswered; toast(`还有 ${mockQuestions.length - Object.keys(miniMock.answers).length} 题未答`); }
      else toast("答题卡完整，可以交卷");
    }
    renderRoute();
  });
  document.querySelector("[data-submit-mini-mock]")?.addEventListener("click", () => finishMiniMock(false));
  document.querySelector("[data-restart-mini-mock]")?.addEventListener("click", startMiniMock);
  document.querySelector("[data-exit-mini-mock]")?.addEventListener("click", () => { miniMock.active = false; miniMock.submitted = false; renderRoute(); });
  document.querySelector("[data-review-mock-wrong]")?.addEventListener("click", () => {
    const result = scoreMiniMock();
    const firstWrong = result.rows.find(row => !row.correct);
    miniMock.active = false;
    if (firstWrong) openQuestion(firstWrong.questionId, { allowRepeat: true });
  });
  document.querySelector("[data-toggle-analysis]")?.addEventListener("click", () => { analysisExpanded = !analysisExpanded; renderRoute(); });
}

window.addEventListener("hashchange", () => { route = location.hash.replace("#", "") || "today"; window.scrollTo({ top: 0, behavior: "auto" }); renderRoute(); });

async function boot() {
  try {
    const [baseResponse, courseResponse, courseQuestionResponse] = await Promise.all([
      fetch("data/questions.json"),
      fetch("data/dongfang-marx.json"),
      fetch("data/dongfang-marx-questions.json")
    ]);
    if (!baseResponse.ok || !courseResponse.ok || !courseQuestionResponse.ok) throw new Error("课程或题库数据加载失败");
    const [baseQuestions, course, courseQuestions] = await Promise.all([baseResponse.json(), courseResponse.json(), courseQuestionResponse.json()]);
    questions = [...baseQuestions, ...courseQuestions];
    dongfangCourse = course;
    refreshMasteryStates();
    saveStudy();
    drill.startedAt = Date.now();
    renderRoute();
  } catch (error) {
    document.querySelector("#app").innerHTML = `<section class="card empty"><h1>题库没有加载成功</h1><p>${escapeHtml(error.message)}</p><p>请通过本地 HTTP 服务打开应用。</p></section>`;
  }
}

boot();
