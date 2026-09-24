import { validatePack, verifyPackDigest, gradeQuestion, selectQuestions, progressSummary } from "./core.js";
import { getContent, saveContent, getProgress, saveProgress } from "./db.js";
import { withGeneratedQuestions } from "./question-bank.js";

const navItems = [
  ["practice", "练习", "✎"], ["atlas", "知识图解", "◉"], ["mistakes", "错题", "△"], ["progress", "学习记录", "▥"], ["content", "内容", "⇩"]
];
const state = {
  route: location.hash.slice(1) || "practice",
  pack: null,
  progress: { answers: {}, mistakes: [], confidence: {}, sessions: [], currentRound: null },
  round: [], current: 0, selected: null, revealed: false, lessonId: null, mode: "diagnostic", topic: "all", timer: null
};
const view = document.querySelector("#view");
const toast = document.querySelector("#toast");
const e = value => String(value ?? "").replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const byId = (items, id) => (items || []).find(item => item.id === id);

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function renderNav() {
  const html = navItems.map(([id, label, icon]) => `<button class="nav-button" data-route="${id}" ${state.route === id ? 'aria-current="page"' : ""}><span class="nav-icon" aria-hidden="true">${icon}</span><span>${label}</span></button>`).join("");
  document.querySelector("#desktopNav").innerHTML = html;
  document.querySelector("#mobileNav").innerHTML = html;
  document.querySelectorAll("[data-route]").forEach(button => button.addEventListener("click", () => navigate(button.dataset.route)));
}

function navigate(route) {
  state.route = route;
  location.hash = route;
  render();
  document.querySelector("#main").focus({ preventScroll: true });
}

function header(eyebrow, title, aside = "") {
  return `<header class="page-head"><div><p class="eyebrow">${e(eyebrow)}</p><h1>${e(title)}</h1></div>${aside}</header>`;
}

function emptyContent() {
  return `${header("PRIVATE CONTENT", "导入你的 815 内容包")}
    <section class="card hero"><p class="eyebrow">公开网页外壳</p><h2>教材内容只保存在你的设备</h2><p class="muted">选择随源码交付的 <b>shangyin-815-private.815pack</b>。导入完成后，两本教材的覆盖清单、习题扫描页、原创变式题和图表都可离线使用。</p>
    <div class="hero-actions"><button class="button" data-action="go-content">导入私人包</button><button class="button secondary" data-action="load-sample">先体验示例</button></div></section>
    <section class="grid three" style="margin-top:18px"><article class="card stat"><span>内容边界</span><strong>两本教材</strong><small class="muted">不混入 712、811 或复试内容</small></article><article class="card stat"><span>考试基线</span><strong>150 分</strong><small class="muted">2026 官方文件，3 小时</small></article><article class="card stat"><span>存储方式</span><strong>本机</strong><small class="muted">IndexedDB，不上传内容</small></article></section>`;
}

function practiceHome() {
  if (!state.pack) return emptyContent();
  if (state.round.length) return renderQuestion();
  const summary = progressSummary(state.progress, state.pack.questions.length);
  const topics = [...new Set(state.pack.questions.map(q => q.topic))];
  return `${header("PRACTICE", "今天从哪里开始？", `<div class="status-line"><span class="status-dot ${state.pack.private ? "ready" : ""}"></span>${state.pack.private ? "私人内容已离线" : "示例内容"}</div>`)}
    <section class="card hero"><p class="eyebrow">推荐</p><h2>先做一轮诊断</h2><p class="muted">每个知识域抽取一道题，答完直接进入解析与同类变式。题目不会在本轮重复。</p><div class="hero-actions"><button class="button" data-start="diagnostic">开始诊断</button><button class="button secondary" data-start="mixed">全章节混合练习</button><button class="button ghost" data-start="timed">30 分钟教材综合训练</button></div></section>
    <section class="grid three" style="margin-top:18px"><article class="card stat"><span>已答题</span><strong>${summary.answered}</strong><small class="muted">累计作答记录</small></article><article class="card stat"><span>正确率</span><strong>${summary.accuracy}%</strong><small class="muted">自动判题与自评合计</small></article><article class="card stat"><span>错题</span><strong>${state.progress.mistakes.length}</strong><small class="muted">等待针对复习</small></article></section>
    <section class="card" style="margin-top:18px"><h2>按知识点练习</h2><div class="chip-row">${topics.map(topic => `<button class="chip" data-topic="${e(topic)}">${e(topic)}</button>`).join("")}</div></section>
    <section class="notice" style="margin-top:18px">综合训练是基于教材范围组织的练习，不宣称还原 815 真卷。2027 招生文件发布后应重新核对科目要求。</section>`;
}

function startRound(mode, topic = "all") {
  const source = mode === "timed" ? "mixed" : mode;
  state.mode = mode;
  state.topic = topic;
  const limit = mode === "mixed" && topic === "all" ? state.pack.questions.length : 20;
  state.round = selectQuestions(state.pack.questions, { mode: source, topic, mistakes: state.progress.mistakes, limit });
  if (!state.round.length) return showToast(mode === "mistakes" ? "错题本目前是空的" : "这个范围暂时没有可练习题");
  state.current = 0; state.selected = null; state.revealed = false;
  state.progress.currentRound = { ids: state.round.map(q => q.id), current: 0, mode, topic, startedAt: Date.now() };
  saveProgress(state.progress);
  if (mode === "timed") state.timer = Date.now() + 30 * 60 * 1000;
  render();
}

function notationInput(question) {
  const letters = ["C","D","E","F","G","A","B"];
  const accidentals = [["bb","重降"],["b","降"],["","还原"],["#","升"],["##","重升"]];
  return `<div class="notation-grid">${question.slots.map((slot, index) => `<div class="note-slot"><b>${index + 1}</b>
    <select aria-label="第 ${index + 1} 个音的音名" data-note="letter" data-slot="${index}">${letters.map(v => `<option>${v}</option>`).join("")}</select>
    <select aria-label="第 ${index + 1} 个音的变音记号" data-note="accidental" data-slot="${index}">${accidentals.map(([v,l]) => `<option value="${v}">${l}</option>`).join("")}</select>
    <select aria-label="第 ${index + 1} 个音的八度" data-note="octave" data-slot="${index}">${[2,3,4,5,6].map(v => `<option ${v === 4 ? "selected" : ""}>${v}</option>`).join("")}</select>
    <select aria-label="第 ${index + 1} 个音的时值" data-note="duration" data-slot="${index}">${[["whole","全音符"],["half","二分"],["quarter","四分"],["eighth","八分"]].map(([v,l]) => `<option value="${v}" ${v === (slot.duration || "quarter") ? "selected" : ""}>${l}</option>`).join("")}</select></div>`).join("")}</div>`;
}

function questionInput(question) {
  if (question.type === "choice") return `<div class="option-list">${question.options.map((option, i) => `<button class="option ${state.selected === i ? "selected" : ""}" data-choice="${i}"><span class="option-key">${String.fromCharCode(65+i)}</span><span>${e(option)}</span></button>`).join("")}</div>`;
  if (question.type === "multi") return `<div class="option-list">${question.options.map((option, i) => `<label class="option"><input type="checkbox" data-multi="${i}" ${Array.isArray(state.selected) && state.selected.includes(i) ? "checked" : ""}><span>${e(option)}</span></label>`).join("")}</div>`;
  if (question.type === "notation") return notationInput(question);
  const assets = (question.assetIds || []).map(id => byId(state.pack.assets, id)).filter(Boolean);
  return `<div class="notice">请在纸上完成，再打开答案进行自评。扫描页仅用于你的个人学习。</div>${assets.length ? `<div class="scan-grid" style="margin-top:16px">${assets.map(asset => `<figure><img src="${asset.data}" alt="${e(asset.alt)}" data-zoom><figcaption>${e(asset.label)}</figcaption></figure>`).join("")}</div>` : ""}`;
}

function getNotationAnswer(question) {
  return question.slots.map((slot, index) => ({
    letter: document.querySelector(`[data-note="letter"][data-slot="${index}"]`)?.value,
    accidental: document.querySelector(`[data-note="accidental"][data-slot="${index}"]`)?.value,
    octave: Number(document.querySelector(`[data-note="octave"][data-slot="${index}"]`)?.value),
    duration: document.querySelector(`[data-note="duration"][data-slot="${index}"]`)?.value
  }));
}

function answerText(question) {
  if (question.type === "choice") return question.options[question.answer];
  if (question.type === "multi") return question.answer.map(i => question.options[i]).join("；");
  if (question.type === "notation") return question.answer.map(n => `${n.letter}${n.accidental}${n.octave}`).join(" - ");
  return question.answer || "参照教材原页及整理提示核对";
}

function renderQuestion() {
  const question = state.round[state.current];
  if (!question) return roundComplete();
  const lesson = byId(state.pack.lessons, question.lessonId);
  const answer = state.progress.answers[question.id];
  const timed = state.mode === "timed" ? `<span id="timer">30:00</span>` : "";
  const kind = question.type === "choice" ? "单选题 · 请选择一个答案" : question.type === "multi" ? "多选题 · 可选择多个答案" : "";
  return `${header(state.mode === "timed" ? "TIMED PRACTICE" : "ACTIVE RECALL", state.mode === "diagnostic" ? "诊断练习" : state.mode === "mistakes" ? "错题重练" : state.mode === "timed" ? "教材综合训练" : "混合练习", `<button class="button ghost" data-action="exit-round">退出本轮</button>`)}
    <section class="card question-shell"><div class="question-top"><span>第 ${state.current + 1} / ${state.round.length} 题 · ${e(question.topic)}</span>${timed}</div><div class="progress-bar"><span style="width:${(state.current + 1) / state.round.length * 100}%"></span></div>
    ${kind ? `<div class="question-type">${kind}</div>` : ""}<div class="question-prompt">${e(question.prompt)}</div>${questionInput(question)}
    ${state.revealed ? `<div class="answer-panel ${answer?.correct === true ? "correct" : answer?.correct === false ? "wrong" : ""}"><h3>${answer?.correct === true ? "回答正确" : answer?.correct === false ? "这里需要再练" : "对照答案自评"}</h3><p><b>答案：</b>${e(answerText(question))}</p><ol class="steps">${(question.steps || []).map(step => `<li>${e(step)}</li>`).join("")}</ol>${question.trap ? `<p><b>易错点：</b>${e(question.trap)}</p>` : ""}${lesson ? `<button class="button secondary" data-lesson="${lesson.id}">打开对应图解</button>` : ""}<p class="source">${e(question.source)} · ${e(question.answerStatus || "原创整理答案")}</p></div>` : ""}
    <div class="actions">${!state.revealed ? (question.type === "self" ? `<button class="button" data-self="true">完成，查看答案</button>` : `<button class="button" data-action="submit-answer">提交答案</button>`) : (question.type === "self" && answer?.correct == null ? `<button class="button" data-self-grade="true">掌握</button><button class="button secondary" data-self-grade="false">需要再练</button>` : `<button class="button" data-action="next-question">下一题</button>`)}</div></section>`;
}

function submitAnswer(self = false) {
  const question = state.round[state.current];
  let response = state.selected;
  if (question.type === "notation") response = getNotationAnswer(question);
  if (!self && (response == null || (Array.isArray(response) && !response.length))) return showToast("请先作答");
  const correct = self ? null : gradeQuestion(question, response);
  state.progress.answers[question.id] = { questionId: question.id, correct, answeredAt: Date.now(), response };
  if (correct === false && !state.progress.mistakes.includes(question.id)) state.progress.mistakes.push(question.id);
  if (correct === true) state.progress.mistakes = state.progress.mistakes.filter(id => id !== question.id);
  state.revealed = true;
  saveProgress(state.progress);
  render();
}

function selfGrade(correct) {
  const question = state.round[state.current];
  state.progress.answers[question.id].correct = correct;
  if (!correct && !state.progress.mistakes.includes(question.id)) state.progress.mistakes.push(question.id);
  if (correct) state.progress.mistakes = state.progress.mistakes.filter(id => id !== question.id);
  saveProgress(state.progress);
  nextQuestion();
}

function nextQuestion() {
  state.current += 1; state.selected = null; state.revealed = false;
  if (state.progress.currentRound) state.progress.currentRound.current = state.current;
  saveProgress(state.progress);
  render();
}

function roundComplete() {
  const answered = state.round.map(q => state.progress.answers[q.id]).filter(Boolean);
  const score = answered.filter(a => a.correct).length;
  state.progress.sessions.unshift({ at: Date.now(), mode: state.mode, total: answered.length, correct: score });
  state.progress.currentRound = null;
  saveProgress(state.progress);
  const html = `${header("ROUND COMPLETE", "本轮完成")}
    <section class="card hero"><p class="eyebrow">结果</p><h2>${score} / ${answered.length} 题掌握</h2><p class="muted">错题已经自动进入错题本。建议先看解析，再做同知识点变式。</p><div class="hero-actions"><button class="button" data-action="finish-round">返回练习</button><button class="button secondary" data-action="go-mistakes">查看错题</button></div></section>`;
  state.round = [];
  return html;
}

function diagramSvg(diagram) {
  const base = `viewBox="0 0 760 360" role="img" aria-label="${e(diagram.alt)}"`;
  if (diagram.type === "circle") {
    const labels = diagram.labels || [];
    return `<svg ${base}>${labels.map((label,i) => { const a=(i/labels.length*Math.PI*2)-Math.PI/2,x=380+145*Math.cos(a),y=180+145*Math.sin(a); return `<line x1="380" y1="180" x2="${x}" y2="${y}" stroke="#d8e0dc"/><circle cx="${x}" cy="${y}" r="28" fill="${i===0?'#496b63':'#fff'}" stroke="#496b63"/><text x="${x}" y="${y+5}" text-anchor="middle" font-size="15" fill="${i===0?'white':'#24302c'}">${e(label)}</text>`; }).join("")}<circle cx="380" cy="180" r="54" fill="#e6eeea"/><text x="380" y="176" text-anchor="middle" font-size="17">顺时针升号</text><text x="380" y="200" text-anchor="middle" font-size="14" fill="#68726f">逆时针降号</text></svg>`;
  }
  if (diagram.type === "keyboard") {
    return `<svg ${base}>${Array.from({length:14},(_,i)=>`<rect x="${38+i*48}" y="54" width="48" height="240" fill="white" stroke="#81908a"/><text x="${62+i*48}" y="326" text-anchor="middle" font-size="14">${["C","D","E","F","G","A","B"][i%7]}${3+Math.floor(i/7)}</text>`).join("")}${[0,1,3,4,5,7,8,10,11,12].map(i=>`<rect x="${72+i*48}" y="54" width="28" height="150" rx="3" fill="#2f3734"/>`).join("")}<path d="M80 30h240" stroke="#496b63" stroke-width="4"/><text x="200" y="24" text-anchor="middle" fill="#496b63">半音 = 相邻键；全音 = 两个半音</text></svg>`;
  }
  if (diagram.type === "temperament") {
    const rows = diagram.rows || [];
    return `<svg ${base}>${rows.map((row,i)=>`<text x="34" y="${75+i*80}" font-size="16">${e(row.name)}</text><line x1="160" y1="${68+i*80}" x2="700" y2="${68+i*80}" stroke="#d8e0dc" stroke-width="10" stroke-linecap="round"/>${row.points.map((p,j)=>`<circle cx="${160+p*5.4}" cy="${68+i*80}" r="8" fill="#496b63"/><text x="${160+p*5.4}" y="${95+i*80}" text-anchor="middle" font-size="12">${e(row.labels[j])}</text>`).join("")}`).join("")}<text x="430" y="335" text-anchor="middle" fill="#68726f">示意图用于比较音分位置，不替代教材中的精确计算</text></svg>`;
  }
  const nodes = diagram.nodes || [];
  return `<svg ${base}>${nodes.map((node,i)=>`<rect x="${40+i*(680/Math.max(nodes.length,1))}" y="120" width="${Math.min(130,620/Math.max(nodes.length,1))}" height="96" rx="14" fill="${i%2?'#fff':'#e6eeea'}" stroke="#496b63"/><text x="${105+i*(680/Math.max(nodes.length,1))}" y="160" text-anchor="middle" font-size="16">${e(node.title)}</text><text x="${105+i*(680/Math.max(nodes.length,1))}" y="187" text-anchor="middle" font-size="13" fill="#68726f">${e(node.note || '')}</text>${i<nodes.length-1?`<path d="M${170+i*(680/nodes.length)} 168h${Math.max(20,680/nodes.length-130)}" stroke="#a47e34" stroke-width="3" marker-end="url(#a)"/>`:''}`).join("")}<defs><marker id="a" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0l8 4-8 4z" fill="#a47e34"/></marker></defs><text x="380" y="65" text-anchor="middle" font-size="20" font-weight="700">${e(diagram.title)}</text></svg>`;
}

function atlasView() {
  if (!state.pack) return emptyContent();
  if (state.lessonId) {
    const lesson = byId(state.pack.lessons, state.lessonId);
    const diagram = byId(state.pack.diagrams, lesson?.diagramId);
    return `${header("KNOWLEDGE MAP", lesson.title, `<button class="button ghost" data-action="close-lesson">返回目录</button>`)}<article class="card lesson-detail"><p class="muted">${e(lesson.summary)}</p>${diagram ? `<div class="diagram">${diagramSvg(diagram)}</div>` : ""}<ul>${lesson.points.map(point => `<li>${e(point)}</li>`).join("")}</ul><p class="source">${e(lesson.source)}</p><div class="actions"><button class="button" data-topic="${e(lesson.topic)}">练习这个知识点</button></div></article>`;
  }
  return `${header("VISUAL INDEX", "知识图解")}
    <section class="card"><div class="lesson-list">${state.pack.lessons.map(lesson => `<button class="lesson-button" data-lesson="${lesson.id}"><span><b>${e(lesson.title)}</b><small>${e(lesson.summary)}</small></span><span aria-hidden="true">→</span></button>`).join("")}</div></section>`;
}

function mistakesView() {
  if (!state.pack) return emptyContent();
  const items = state.progress.mistakes.map(id => byId(state.pack.questions, id)).filter(Boolean);
  return `${header("REVIEW", "错题本", items.length ? `<button class="button" data-start="mistakes">开始重练</button>` : "")}${items.length ? `<section class="card"><div class="lesson-list">${items.map(item => `<div class="lesson-button"><span><b>${e(item.prompt)}</b><small>${e(item.topic)} · ${e(item.source)}</small></span><span class="badge warn">待复习</span></div>`).join("")}</div></section>` : `<section class="card empty"><h2>暂时没有错题</h2><p>完成诊断后，答错或自评“需要再练”的题会出现在这里。</p></section>`}`;
}

function progressView() {
  if (!state.pack) return emptyContent();
  const summary = progressSummary(state.progress, state.pack.questions.length);
  const topics = [...new Set(state.pack.questions.map(q => q.topic))];
  return `${header("PROGRESS", "学习记录", `<div class="actions"><button class="button secondary" data-action="export-progress">导出记录</button><label class="button ghost">导入记录<input hidden type="file" accept="application/json" id="progressFile"></label></div>`)}
    <section class="grid three"><article class="card stat"><span>作答次数</span><strong>${summary.answered}</strong></article><article class="card stat"><span>正确率</span><strong>${summary.accuracy}%</strong></article><article class="card stat"><span>题库触达</span><strong>${summary.coverage}%</strong></article></section>
    <section class="card" style="margin-top:18px"><h2>知识域进度</h2>${topics.map(topic => { const qs=state.pack.questions.filter(q=>q.topic===topic), done=qs.filter(q=>state.progress.answers[q.id]).length, pct=qs.length?Math.round(done/qs.length*100):0; return `<div class="meter-row"><div class="meter-label"><span>${e(topic)}</span><span>${done}/${qs.length}</span></div><div class="progress-bar"><span style="width:${pct}%"></span></div></div>`; }).join("")}</section>
    <section class="card" style="margin-top:18px"><h2>最近练习</h2>${state.progress.sessions.length ? state.progress.sessions.slice(0,8).map(s=>`<p>${new Date(s.at).toLocaleString("zh-CN")} · ${e(s.mode)} · ${s.correct}/${s.total}</p>`).join("") : `<p class="muted">还没有完成一轮练习。</p>`}</section>`;
}

function contentView() {
  const pack = state.pack;
  return `${header("CONTENT & OFFLINE", "内容与离线")}
    <section class="card"><div class="import-box"><h2>导入私人 .815pack</h2><p class="muted">文件只在当前设备中解析并保存，不会上传。</p><input id="packFile" type="file" accept=".815pack,application/json"><div id="importStatus" class="status-line" style="justify-content:center"><span class="status-dot ${pack?.private ? "ready" : ""}"></span>${pack ? `${e(pack.title)} · ${e(pack.version)}` : "尚未导入"}</div><div class="actions" style="justify-content:center"><button class="button secondary" data-action="load-sample">载入公开示例</button><button class="button ghost" data-action="offline-check">检查离线状态</button></div></div></section>
    ${pack ? `<section class="grid two" style="margin-top:18px"><article class="card"><h2>来源边界</h2>${pack.sources.map(source=>`<p><b>${e(source.title)}</b><br><span class="muted">${e(source.edition)} · ${e(source.role)}</span></p>`).join("")}</article><article class="card"><h2>内容统计</h2><p>${pack.coverage.length} 个章节覆盖项</p><p>${pack.questions.length} 道数字化题／习题组</p><p>${pack.assets.length} 张私人扫描资源</p><p>${pack.diagrams.length} 张预载图解</p></article></section>
    <section class="card" style="margin-top:18px"><h2>教材覆盖报告</h2>${pack.sources.filter(s=>s.kind==="textbook").map(source=>`<div class="coverage-group"><h3>${e(source.title)}</h3>${pack.coverage.filter(item=>item.sourceId===source.id).map(item=>`<details class="coverage-item"><summary>${e(item.chapter)} <span class="badge">${item.sections.length} 节</span> ${item.reviewStatus !== "verified" ? '<span class="badge warn">扫描页覆盖</span>' : ''}</summary><div class="coverage-meta"><span class="badge">书面页 ${e(item.printPages)}</span><span class="badge">PDF 页 ${e(item.pdfPages)}</span><span class="badge">${item.exerciseAssetIds.length} 张习题页</span></div><p>${item.sections.map(e).join(" · ")}</p>${item.note?`<p class="muted">${e(item.note)}</p>`:""}${item.exerciseAssetIds.length?`<button class="button secondary" data-scans="${item.id}">查看习题扫描页</button>`:""}</details>`).join("")}</div>`).join("")}</section>` : ""}`;
}

function render() {
  renderNav();
  state.lessonId = state.route === "atlas" ? state.lessonId : null;
  view.innerHTML = state.route === "practice" ? practiceHome() : state.route === "atlas" ? atlasView() : state.route === "mistakes" ? mistakesView() : state.route === "progress" ? progressView() : contentView();
  bind();
  if (state.timer && state.mode === "timed" && state.round.length) updateTimer();
}

function bind() {
  document.querySelectorAll("[data-start]").forEach(el => el.addEventListener("click", () => startRound(el.dataset.start)));
  document.querySelectorAll("[data-topic]").forEach(el => el.addEventListener("click", () => { if (state.route === "atlas") navigate("practice"); startRound("mixed", el.dataset.topic); }));
  document.querySelectorAll("[data-choice]").forEach(el => el.addEventListener("click", () => { state.selected = Number(el.dataset.choice); document.querySelectorAll("[data-choice]").forEach(o=>o.classList.toggle("selected",o===el)); }));
  document.querySelectorAll("[data-multi]").forEach(el => el.addEventListener("change", () => { state.selected = [...document.querySelectorAll("[data-multi]:checked")].map(x=>Number(x.dataset.multi)); }));
  document.querySelectorAll("[data-lesson]").forEach(el => el.addEventListener("click", () => { state.lessonId=el.dataset.lesson; navigate("atlas"); }));
  document.querySelectorAll("[data-zoom]").forEach(el => el.addEventListener("click", () => zoomImage(el)));
  document.querySelectorAll("[data-scans]").forEach(el => el.addEventListener("click", () => showScans(el.dataset.scans)));
  document.querySelector("#packFile")?.addEventListener("change", importPack);
  document.querySelector("#progressFile")?.addEventListener("change", importProgress);
  document.querySelector("[data-self]")?.addEventListener("click", () => submitAnswer(true));
  document.querySelectorAll("[data-self-grade]").forEach(el => el.addEventListener("click", () => selfGrade(el.dataset.selfGrade === "true")));
  document.querySelectorAll("[data-action]").forEach(el => el.addEventListener("click", () => action(el.dataset.action)));
}

function action(name) {
  if (name === "go-content") navigate("content");
  if (name === "load-sample") loadSample();
  if (name === "submit-answer") submitAnswer();
  if (name === "next-question") nextQuestion();
  if (name === "exit-round" || name === "finish-round") { state.round=[]; state.progress.currentRound=null; saveProgress(state.progress); render(); }
  if (name === "go-mistakes") navigate("mistakes");
  if (name === "close-lesson") { state.lessonId=null; render(); }
  if (name === "export-progress") exportProgress();
  if (name === "offline-check") checkOffline();
}

async function importPack(event) {
  const file = event.target.files[0]; if (!file) return;
  const status = document.querySelector("#importStatus");
  try {
    status.textContent = "正在校验内容包…";
    const next = JSON.parse(await file.text());
    await installPack(next, file.size);
    showToast(`已导入 ${next.version}，教材内容可离线使用`); render();
  } catch (error) {
    status.textContent = `导入失败：${error.message}`;
  }
}

async function installPack(next, byteSize = 0) {
  const errors = validatePack(next);
  if (errors.length) throw new Error(errors.slice(0,5).join("；"));
  if (!await verifyPackDigest(next)) throw new Error("内容包校验失败，文件可能已损坏");
  if (navigator.storage?.estimate) {
    const estimate = await navigator.storage.estimate();
    if (estimate.quota && estimate.usage && byteSize > estimate.quota - estimate.usage) throw new Error("设备可用存储空间不足");
  }
  await Promise.all((next.assets || []).slice(0,12).map(asset => preloadImage(asset.data)));
  await saveContent(next);
  state.pack = withGeneratedQuestions(next); state.round = []; state.lessonId = null;
}

async function loadSample() {
  try {
    const pack = await fetch("./sample.815pack").then(r => r.json());
    const errors = validatePack(pack); if (errors.length) throw new Error(errors.join("；"));
    await saveContent(pack); state.pack=pack; state.round=[]; showToast("公开示例已载入"); navigate("practice");
  } catch (error) { showToast(`示例载入失败：${error.message}`); }
}

const preloadImage = src => new Promise((resolve, reject) => { const image=new Image(); image.onload=resolve; image.onerror=reject; image.src=src; });

function showScans(coverageId) {
  const item = byId(state.pack.coverage, coverageId);
  const assets = item.exerciseAssetIds.map(id => byId(state.pack.assets,id)).filter(Boolean);
  const dialog = document.createElement("dialog");
  dialog.innerHTML = `<div class="page-head"><div><p class="eyebrow">PRIVATE SCANS</p><h2>${e(item.chapter)}习题页</h2></div><button class="button ghost" data-close>关闭</button></div><div class="scan-grid">${assets.map(asset=>`<figure><img src="${asset.data}" alt="${e(asset.alt)}"><figcaption>${e(asset.label)}</figcaption></figure>`).join("")}</div>`;
  document.body.append(dialog); dialog.querySelector("[data-close]").onclick=()=>dialog.close(); dialog.addEventListener("close",()=>dialog.remove()); dialog.showModal();
}

function zoomImage(image) {
  const dialog=document.createElement("dialog"); dialog.innerHTML=`<button class="button ghost" data-close>关闭</button><div><img src="${image.src}" alt="${e(image.alt)}"></div>`; document.body.append(dialog); dialog.querySelector("[data-close]").onclick=()=>dialog.close(); dialog.addEventListener("close",()=>dialog.remove()); dialog.showModal();
}

function exportProgress() {
  const blob=new Blob([JSON.stringify({schemaVersion:1,exportedAt:new Date().toISOString(),progress:state.progress},null,2)],{type:"application/json"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=`shangyin-815-progress-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(a.href);
}

async function importProgress(event) {
  try { const data=JSON.parse(await event.target.files[0].text()); if(data.schemaVersion!==1||!data.progress?.answers) throw new Error("记录格式不正确"); state.progress=data.progress; await saveProgress(state.progress); showToast("学习记录已恢复"); render(); } catch(error){ showToast(`导入失败：${error.message}`); }
}

async function checkOffline() {
  if (!("serviceWorker" in navigator)) return showToast("当前浏览器不支持离线安装");
  const registration=await navigator.serviceWorker.ready;
  const cacheName=(await caches.keys()).find(name=>name.startsWith("shangyin-815-shell-"));
  if (!cacheName) return showToast("离线外壳尚未缓存完成");
  const cache=await caches.open(cacheName);
  const missing=(await Promise.all(["./index.html","./styles.css","./app.js","./core.js","./db.js"].map(async url=>(await cache.match(url))?null:url))).filter(Boolean);
  showToast(missing.length ? `离线外壳缺少 ${missing.length} 项资源` : `${registration.active ? "离线外壳已就绪" : "服务尚未激活"}${state.pack?.private ? "，私人内容已保存" : "，尚未导入私人内容"}`);
}

function updateTimer() {
  clearInterval(updateTimer.handle);
  const tick=()=>{ const node=document.querySelector("#timer"); if(!node)return clearInterval(updateTimer.handle); const remaining=Math.max(0,state.timer-Date.now()),m=Math.floor(remaining/60000),s=Math.floor(remaining%60000/1000); node.textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`; if(!remaining){clearInterval(updateTimer.handle);showToast("时间到，请完成当前题后交卷");}}; tick(); updateTimer.handle=setInterval(tick,1000);
}

window.addEventListener("hashchange",()=>{state.route=location.hash.slice(1)||"practice";render();});
window.addEventListener("error",event=>console.error("APP_ERROR",event.error||event.message));

async function init() {
  try { state.pack=withGeneratedQuestions(await getContent())||null; state.progress=await getProgress()||state.progress; } catch(error){ console.error(error); }
  if (new URL(location.href).searchParams.get("privatePack") === "local") {
    try {
      const response = await fetch("./private.815pack");
      if (response.ok) await installPack(await response.json(), Number(response.headers.get("content-length")) || 0);
    } catch (error) { console.error("LOCAL_PACK_TEST", error); }
  }
  render();
}
init();
