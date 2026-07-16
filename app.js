const composerWords = [
  {word:'der Komponist', article:'der · plural: die Komponisten', en:'composer', zh:'作曲家', group:'score', tag:'角色', explain:'创作音乐作品的人。阴性形式为 die Komponistin。', sentence:'Der Komponist schreibt eine neue Oper.'},
  {word:'die Komposition', article:'die · plural: die Kompositionen', en:'composition', zh:'作品；作曲', group:'score', tag:'结构', explain:'既可以指“作曲这个过程”，也可以指一部已经完成的音乐作品。', sentence:'Die Komposition dauert zwölf Minuten.'},
  {word:'die Partitur', article:'die · plural: die Partituren', en:'full score', zh:'总谱', group:'score', tag:'乐谱', explain:'汇集所有声部的完整乐谱，指挥和作曲家用它来查看全貌。', sentence:'Die Dirigentin liest die Partitur.'},
  {word:'die Stimme', article:'die · plural: die Stimmen', en:'part / voice', zh:'声部；分谱', group:'score', tag:'乐谱', explain:'在乐队或合唱中指一个独立的演奏或演唱线条。', sentence:'Die erste Geige hat eine schwierige Stimme.'},
  {word:'das Motiv', article:'das · plural: die Motive', en:'motif', zh:'动机', group:'sound', tag:'音乐元素', explain:'一个短小但有辨识度的音乐想法，会被反复发展或变形。', sentence:'Das Motiv kommt im ganzen Satz wieder.'},
  {word:'die Melodie', article:'die · plural: die Melodien', en:'melody', zh:'旋律', group:'sound', tag:'音乐元素', explain:'可以被哼唱、通常处于听觉前景的音高线条。', sentence:'Die Melodie klingt sehr ruhig.'},
  {word:'die Harmonie', article:'die · plural: die Harmonien', en:'harmony', zh:'和声', group:'sound', tag:'音乐元素', explain:'不同音高同时出现时形成的关系与色彩。', sentence:'Die Harmonie wird plötzlich dunkler.'},
  {word:'der Rhythmus', article:'der · plural: die Rhythmen', en:'rhythm', zh:'节奏', group:'sound', tag:'音乐元素', explain:'音符在时间中的组织方式，包括时值、重音与律动。', sentence:'Der Rhythmus ist nicht leicht zu zählen.'},
  {word:'das Tempo', article:'das · plural: die Tempi', en:'tempo', zh:'速度', group:'performance', tag:'演出', explain:'音乐进行的快慢；德语中复数常用源自意大利语的 Tempi。', sentence:'Das Tempo muss etwas langsamer sein.'},
  {word:'die Dynamik', article:'die · plural: die Dynamiken', en:'dynamics', zh:'力度变化', group:'performance', tag:'演出', explain:'音乐的强弱层次和它们之间的变化。', sentence:'Die Dynamik in diesem Takt ist sehr fein.'},
  {word:'die Probe', article:'die · plural: die Proben', en:'rehearsal', zh:'排练', group:'performance', tag:'排练', explain:'为演出准备而进行的合练；die Generalprobe 是总彩排。', sentence:'Die Probe beginnt um zehn Uhr.'},
  {word:'die Aufführung', article:'die · plural: die Aufführungen', en:'performance', zh:'演出；上演', group:'performance', tag:'演出', explain:'一部作品在观众面前被实际演奏或上演的场合。', sentence:'Die Aufführung war ausverkauft.'}
];
const tonmeisterWords = [
  {word:'der Tonmeister', article:'der · plural: die Tonmeister', en:'recording producer / sound engineer', zh:'录音师；音响导演', group:'capture', tag:'角色', explain:'在德语古典音乐语境中，负责声音审美与录音制作的人；阴性为 Tonmeisterin。', sentence:'Der Tonmeister prüft den Klang im Regieraum.'},
  {word:'die Aufnahme', article:'die · plural: die Aufnahmen', en:'recording', zh:'录音；录制', group:'capture', tag:'拾音', explain:'可以指录制这一过程，也可以指最终得到的一条录音。', sentence:'Die Aufnahme beginnt nach dem Signal.'},
  {word:'das Mikrofon', article:'das · plural: die Mikrofone', en:'microphone', zh:'麦克风', group:'capture', tag:'拾音', explain:'把声波转化为可记录信号的设备。', sentence:'Das Mikrofon steht vor dem Cello.'},
  {word:'die Mikrofonierung', article:'die · no common plural', en:'microphone placement', zh:'麦克风布置；拾音方式', group:'capture', tag:'拾音', explain:'决定用什么麦克风、放在哪里、以什么角度收录声音。', sentence:'Die Mikrofonierung klingt sehr natürlich.'},
  {word:'die Spur', article:'die · plural: die Spuren', en:'track', zh:'音轨', group:'capture', tag:'拾音', explain:'多轨录音中可独立录制、编辑和处理的一条声音通道。', sentence:'Die Sängerin nimmt ihre Spur noch einmal auf.'},
  {word:'das Mischpult', article:'das · plural: die Mischpulte', en:'mixing console', zh:'调音台', group:'mix', tag:'混音', explain:'用来调节音量、声像、均衡与发送效果的控制台。', sentence:'Am Mischpult steht der Tonmeister.'},
  {word:'die Mischung', article:'die · plural: die Mischungen', en:'mix', zh:'混音；混合', group:'mix', tag:'混音', explain:'把多条音轨平衡、定位并塑造成一个整体的过程和结果。', sentence:'Die Mischung braucht mehr Tiefe.'},
  {word:'der Nachhall', article:'der · plural: die Nachhalle', en:'reverberation', zh:'混响；余响', group:'mix', tag:'空间', explain:'声音停止后，在空间里持续衰减的反射声。日常也常说 Hall。', sentence:'Der Nachhall in der Kirche ist lang.'},
  {word:'der Pegel', article:'der · plural: die Pegel', en:'level', zh:'电平；音量级', group:'mix', tag:'混音', explain:'信号强度的测量值。录音时要避免过高而产生削波。', sentence:'Der Pegel ist zu hoch.'},
  {word:'der Klang', article:'der · plural: die Klänge', en:'sound / timbre', zh:'声音；音色', group:'mix', tag:'空间', explain:'既泛指声音，也特别指一种声音的质地、色彩与美感。', sentence:'Der Klang der Geige ist warm.'},
  {word:'der Schnitt', article:'der · plural: die Schnitte', en:'edit / cut', zh:'剪辑；剪接点', group:'finish', tag:'编辑', explain:'对录音片段进行选择、拼接和修整，以形成流畅的版本。', sentence:'Der Schnitt zwischen den Takes ist kaum hörbar.'},
  {word:'das Mastering', article:'das · no plural', en:'mastering', zh:'母带处理', group:'finish', tag:'完成', explain:'发布前对整体响度、频率平衡和格式进行最终整理的步骤。', sentence:'Nach dem Mastering ist das Album fertig.'}
];

const sentenceExercises = [
  {area:'composer', keyWord:'der Komponist', de:'Der Komponist schreibt eine neue Oper.', en:'The composer is writing a new opera.', zh:'这位作曲家正在创作一部新歌剧。'},
  {area:'composer', keyWord:'die Partitur', de:'Die Dirigentin liest die Partitur.', en:'The conductor is reading the full score.', zh:'指挥正在阅读总谱。'},
  {area:'composer', keyWord:'das Motiv', de:'Das Motiv kommt im ganzen Satz wieder.', en:'The motif returns throughout the movement.', zh:'这个动机在整个乐章中反复出现。'},
  {area:'composer', keyWord:'die Melodie', de:'Die Melodie klingt sehr ruhig.', en:'The melody sounds very calm.', zh:'这段旋律听起来非常平静。'},
  {area:'composer', keyWord:'das Tempo', de:'Das Tempo muss etwas langsamer sein.', en:'The tempo needs to be a little slower.', zh:'速度需要再慢一点。'},
  {area:'composer', keyWord:'die Probe', de:'Die Probe beginnt um zehn Uhr.', en:'The rehearsal begins at ten o’clock.', zh:'排练十点开始。'},
  {area:'tonmeister', keyWord:'der Tonmeister', de:'Der Tonmeister prüft den Klang im Regieraum.', en:'The recording engineer checks the sound in the control room.', zh:'录音师在控制室检查声音。'},
  {area:'tonmeister', keyWord:'das Mikrofon', de:'Das Mikrofon steht vor dem Cello.', en:'The microphone is positioned in front of the cello.', zh:'麦克风放在大提琴前面。'},
  {area:'tonmeister', keyWord:'die Spur', de:'Die Sängerin nimmt ihre Spur noch einmal auf.', en:'The singer records her track once again.', zh:'歌手重新录制她的音轨。'},
  {area:'tonmeister', keyWord:'die Mischung', de:'Die Mischung braucht mehr Tiefe.', en:'The mix needs more depth.', zh:'这版混音需要更有纵深感。'},
  {area:'tonmeister', keyWord:'der Nachhall', de:'Der Nachhall in der Kirche ist lang.', en:'The reverberation in the church is long.', zh:'教堂里的混响很长。'},
  {area:'tonmeister', keyWord:'das Mastering', de:'Nach dem Mastering ist das Album fertig.', en:'The album is finished after mastering.', zh:'母带处理完成后，这张专辑就制作完毕了。'}
];

const allWords = [...composerWords.map(item => ({...item, area:'Komposition · 作曲', section:'composer'})), ...tonmeisterWords.map(item => ({...item, area:'Tonmeister · 录音制作', section:'tonmeister'}))];
const $ = query => document.querySelector(query);
const loadSet = key => { try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); } catch { return new Set(); } };
const persistSet = (key, value) => { try { localStorage.setItem(key, JSON.stringify([...value])); } catch {} };
const shuffled = values => [...values].sort(() => Math.random() - .5);
const normalizeGerman = value => value.toLowerCase().trim().replace(/[.,!?„“"':;()[\]]/g, '').replace(/ß/g, 'ss').replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/\s+/g, ' ');
let composerFilter = 'all';
let tonmeisterFilter = 'all';
let dailyIndex = 0;
let known = loadSet('klangwort-known');
let mistakes = loadSet('klangwort-mistakes');
let session = [];
let sessionMode = 'mixed';
let sessionIndex = 0;
let sessionCorrect = 0;
let selectedAnswer = '';
let answerChecked = false;

function updateStats() {
  $('#knownCount').textContent = known.size;
  $('#practiceKnown').textContent = known.size;
  $('#mistakeCount').textContent = mistakes.size;
  persistSet('klangwort-known', known);
  persistSet('klangwort-mistakes', mistakes);
}
function card(item) { return `<article class="word-card" data-word="${item.word}"><div class="word-card-top"><span class="word-type">${item.area}</span><button class="speaker" data-speak="${item.word}" aria-label="播放 ${item.word} 发音">◖</button></div><h3>${item.word}</h3><p class="translation-en">${item.en}</p><p class="translation-zh">${item.zh}</p><span class="tag">${item.tag}</span></article>`; }
function dailyCard(item) { return `<article class="daily-card" data-word="${item.word}"><span class="word-type">${item.area}</span><h3>${item.word}</h3><p>${item.en}</p><p>${item.zh}</p></article>`; }
function renderWords() {
  $('#composerGrid').innerHTML = allWords.filter(item => item.section === 'composer' && (composerFilter === 'all' || item.group === composerFilter)).map(card).join('');
  $('#tonmeisterGrid').innerHTML = allWords.filter(item => item.section === 'tonmeister' && (tonmeisterFilter === 'all' || item.group === tonmeisterFilter)).map(card).join('');
}
function renderDaily() {
  const selected = [allWords[dailyIndex % 24], allWords[(dailyIndex + 7) % 24], allWords[(dailyIndex + 14) % 24]];
  $('#dailyGrid').innerHTML = selected.map(dailyCard).join('');
}
function speak(word) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const voice = new SpeechSynthesisUtterance(word);
  voice.lang = 'de-DE';
  voice.rate = .8;
  speechSynthesis.speak(voice);
}
function openWord(item) {
  $('#modalContent').innerHTML = `<p class="modal-label">${item.area.toUpperCase()}</p><h2>${item.word}</h2><p class="gender">${item.article}</p><div class="modal-translations"><b>EN</b><span>${item.en}</span><b>中</b><span>${item.zh}</span></div><h4>词义与用法</h4><p class="explanation">${item.explain}</p><h4>例句</h4><div class="modal-sentence"><b>DE</b><p>„${item.sentence}“</p></div><button class="listen-button" data-speak="${item.word}">◖ 听德语发音</button>`;
  $('#wordModal').classList.add('show');
  $('#wordModal').setAttribute('aria-hidden','false');
}
function closeWord() {
  $('#wordModal').classList.remove('show');
  $('#wordModal').setAttribute('aria-hidden','true');
}
function search(query = '') {
  const q = query.trim().toLowerCase();
  const results = allWords.filter(item => `${item.word} ${item.en} ${item.zh} ${item.tag} ${item.area}`.toLowerCase().includes(q));
  $('#searchResults').innerHTML = results.length ? results.map(item => `<button class="search-result" data-word="${item.word}"><b>${item.word}</b><span>${item.en} · ${item.zh}</span></button>`).join('') : '<p class="empty">没有找到这个词。试试 “score”、“录音” 或 “Mikrofon”。</p>';
}

function recognitionOptions(item, pool) {
  const candidates = pool.length >= 3 ? pool : allWords;
  const distractors = shuffled(candidates.filter(entry => entry.word !== item.word)).slice(0, 2);
  return shuffled([item, ...distractors]);
}
function createQuestion(kind, item, pool, sentenceItem) {
  if (kind === 'recognition') return {kind, item, prompt:item.word, expected:item.word, options:recognitionOptions(item, pool)};
  if (kind === 'wordEn') return {kind, item, prompt:item.en, expected:item.word};
  if (kind === 'wordZh') return {kind, item, prompt:item.zh, expected:item.word};
  const sentence = sentenceItem || sentenceExercises[0];
  return {kind, item:allWords.find(entry => entry.word === sentence.keyWord), prompt:kind === 'sentenceEn' ? sentence.en : sentence.zh, expected:sentence.de};
}
function buildSession(mode) {
  let pool = mode === 'composer' ? allWords.filter(item => item.section === 'composer') : mode === 'tonmeister' ? allWords.filter(item => item.section === 'tonmeister') : allWords;
  if (mode === 'mistakes') {
    const missedPool = allWords.filter(item => mistakes.has(item.word));
    pool = missedPool.length ? missedPool : allWords;
  }
  let sentencePool = sentenceExercises.filter(item => mode === 'composer' ? item.area === 'composer' : mode === 'tonmeister' ? item.area === 'tonmeister' : mode === 'mistakes' ? mistakes.has(item.keyWord) : true);
  if (!sentencePool.length) sentencePool = sentenceExercises;
  const wordPool = shuffled(pool);
  const writingPool = shuffled(sentencePool);
  const types = ['recognition','wordEn','wordZh','recognition','sentenceEn','sentenceZh','wordEn','sentenceEn','wordZh','sentenceZh'];
  return types.map((kind, index) => {
    const item = wordPool[index % wordPool.length];
    const sentenceItem = writingPool[index % writingPool.length];
    return createQuestion(kind, item, pool, sentenceItem);
  });
}
function startSession(mode) {
  sessionMode = mode;
  session = buildSession(mode);
  sessionIndex = 0;
  sessionCorrect = 0;
  $('#practiceIntro').hidden = true;
  $('#sessionResult').hidden = true;
  $('#trainer').hidden = false;
  document.body.classList.add('training-active');
  renderQuestion();
}
function questionCopy(kind) {
  return {
    recognition:['认词 · RECOGNITION','选择正确的英语和中文意思。'],
    wordEn:['英译德 · EN → DE','写出对应的德语音乐词，并包含 der / die / das。'],
    wordZh:['中译德 · 中 → DE','写出对应的德语音乐词，并包含 der / die / das。'],
    sentenceEn:['英文写句子 · EN → DE','把整句话翻译成德语；大小写和句末标点不影响判断。'],
    sentenceZh:['中文写句子 · 中 → DE','把整句话翻译成德语；大小写和句末标点不影响判断。']
  }[kind];
}
function renderQuestion() {
  const question = session[sessionIndex];
  const [label, help] = questionCopy(question.kind);
  selectedAnswer = '';
  answerChecked = false;
  $('#questionType').textContent = label;
  $('#questionPrompt').textContent = question.prompt;
  $('#questionHelp').textContent = help;
  $('#trainingPosition').textContent = `${sessionIndex + 1} / ${session.length}`;
  $('#trainingProgress').style.width = `${(sessionIndex / session.length) * 100}%`;
  $('#answerFeedback').className = 'answer-feedback';
  $('#answerFeedback').innerHTML = '';
  $('#checkAnswer').textContent = '检查答案';
  $('#checkAnswer').disabled = true;
  $('#keyboardHint').textContent = question.kind === 'recognition' ? '选择一个答案' : question.kind.startsWith('sentence') ? '⌘ / Ctrl + Enter 检查' : 'Enter 检查';
  $('#questionAudio').hidden = question.kind !== 'recognition';
  $('#questionAudio').dataset.speak = question.item.word;
  if (question.kind === 'recognition') {
    $('#answerArea').innerHTML = question.options.map(option => `<button class="training-choice" data-answer="${option.word}">${option.en}<small>${option.zh}</small></button>`).join('');
  } else {
    const sentence = question.kind.startsWith('sentence');
    $('#answerArea').innerHTML = sentence ? `<textarea class="training-input" id="trainingInput" placeholder="Schreibe den deutschen Satz …" spellcheck="false"></textarea><div class="word-bank"><span>提示词</span><span>${question.item.word}</span></div>` : `<input class="training-input" id="trainingInput" type="text" placeholder="德语词（含冠词）" autocomplete="off" spellcheck="false" />`;
    $('#trainingInput').addEventListener('input', event => { $('#checkAnswer').disabled = !event.target.value.trim(); });
    setTimeout(() => $('#trainingInput').focus(), 30);
  }
}
function selectChoice(button) {
  if (answerChecked) return;
  $('#answerArea').querySelectorAll('.training-choice').forEach(choice => choice.classList.toggle('selected', choice === button));
  selectedAnswer = button.dataset.answer;
  $('#checkAnswer').disabled = false;
}
function checkCurrentAnswer() {
  if (answerChecked) {
    sessionIndex += 1;
    if (sessionIndex >= session.length) finishSession();
    else renderQuestion();
    return;
  }
  const question = session[sessionIndex];
  const given = question.kind === 'recognition' ? selectedAnswer : ($('#trainingInput')?.value || '');
  if (!given.trim()) return;
  const correct = normalizeGerman(given) === normalizeGerman(question.expected);
  answerChecked = true;
  if (correct) {
    sessionCorrect += 1;
    known.add(question.item.word);
    mistakes.delete(question.item.word);
  } else {
    mistakes.add(question.item.word);
    if (!question.retry && session.length < 14) session.push({...question, retry:true});
  }
  updateStats();
  $('#trainingProgress').style.width = `${((sessionIndex + 1) / session.length) * 100}%`;
  const feedback = $('#answerFeedback');
  feedback.className = `answer-feedback show ${correct ? 'correct' : 'wrong'}`;
  feedback.innerHTML = correct ? `<b>Richtig! 答对了</b>${question.expected}` : `<b>Noch einmal merken · 本轮末尾会再考一次</b>${question.expected}`;
  if (question.kind === 'recognition') {
    $('#answerArea').querySelectorAll('.training-choice').forEach(choice => {
      if (choice.dataset.answer === question.expected) choice.classList.add('correct');
      else if (choice.dataset.answer === selectedAnswer) choice.classList.add('wrong');
    });
  }
  $('#checkAnswer').textContent = sessionIndex === session.length - 1 ? '查看结果' : '继续';
  $('#checkAnswer').disabled = false;
}
function finishSession() {
  $('#trainer').hidden = true;
  $('#sessionResult').hidden = false;
  document.body.classList.add('training-active');
  $('#resultScore').textContent = `${sessionCorrect} / ${session.length}`;
  const accuracy = sessionCorrect / session.length;
  $('#resultMessage').textContent = accuracy === 1 ? 'Perfekt！全部答对，这组词已经很稳了。' : accuracy >= .8 ? 'Sehr gut！再强化一下错题会记得更牢。' : accuracy >= .6 ? '不错，错题已经自动收进强化训练。' : '先别急，集中刷一轮错题会进步很快。';
  updateStats();
}
function exitSession() {
  $('#trainer').hidden = true;
  $('#sessionResult').hidden = true;
  $('#practiceIntro').hidden = false;
  document.body.classList.remove('training-active');
}

renderWords();
renderDaily();
updateStats();
document.addEventListener('click', event => {
  const speakButton = event.target.closest('[data-speak]');
  if (speakButton) { event.stopPropagation(); speak(speakButton.dataset.speak); return; }
  const result = event.target.closest('.search-result');
  if (result) {
    const item = allWords.find(entry => entry.word === result.dataset.word);
    if (item) { $('#searchModal').classList.remove('show'); openWord(item); }
    return;
  }
  const wordCard = event.target.closest('.word-card, .daily-card');
  if (wordCard) {
    const item = allWords.find(entry => entry.word === wordCard.dataset.word);
    if (item) openWord(item);
  }
});
document.querySelectorAll('.filter-row').forEach(row => row.addEventListener('click', event => {
  const button = event.target.closest('.filter');
  if (!button) return;
  row.querySelectorAll('.filter').forEach(item => item.classList.toggle('active', item === button));
  if (row.dataset.group === 'composer') composerFilter = button.dataset.filter;
  else tonmeisterFilter = button.dataset.filter;
  renderWords();
}));
$('#practiceIntro').addEventListener('click', event => {
  const button = event.target.closest('[data-session]');
  if (button) startSession(button.dataset.session);
});
$('#answerArea').addEventListener('click', event => {
  const choice = event.target.closest('.training-choice');
  if (choice) selectChoice(choice);
});
$('#checkAnswer').addEventListener('click', checkCurrentAnswer);
$('#exitTraining').addEventListener('click', exitSession);
$('#repeatSession').addEventListener('click', () => startSession(sessionMode));
$('#reviewMistakes').addEventListener('click', () => startSession('mistakes'));
$('#backToDictionary').addEventListener('click', exitSession);
$('#newDaily').addEventListener('click', () => { dailyIndex += 3; renderDaily(); });
$('#closeModal').addEventListener('click', closeWord);
$('#wordModal').addEventListener('click', event => { if (event.target === $('#wordModal')) closeWord(); });
$('#searchButton').addEventListener('click', () => {
  $('#searchModal').classList.add('show');
  $('#searchInput').value = '';
  search();
  setTimeout(() => $('#searchInput').focus(), 50);
});
$('#closeSearch').addEventListener('click', () => $('#searchModal').classList.remove('show'));
$('#searchModal').addEventListener('click', event => { if (event.target === $('#searchModal')) $('#searchModal').classList.remove('show'); });
$('#searchInput').addEventListener('input', event => search(event.target.value));

const navItems = [...document.querySelectorAll('.nav-item')];
const navSections = navItems.map(item => ({
  item,
  hash:item.getAttribute('href'),
  section:document.querySelector(item.getAttribute('href'))
}));
function activateNav(hash) {
  navItems.forEach(item => {
    const active = item.getAttribute('href') === hash;
    item.classList.toggle('active', active);
    if (active) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });
}
function syncNavToScroll() {
  const marker = window.scrollY + Math.min(window.innerHeight * .3, 190);
  let activeHash = '#top';
  navSections.forEach(({hash, section}) => {
    if (!section || hash === '#top') return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    if (sectionTop <= marker) activeHash = hash;
  });
  activateNav(activeHash);
}
navItems.forEach(item => item.addEventListener('click', () => activateNav(item.getAttribute('href'))));
window.addEventListener('hashchange', () => activateNav(location.hash || '#top'));
let navScrollFrame = 0;
window.addEventListener('scroll', () => {
  if (navScrollFrame) return;
  navScrollFrame = requestAnimationFrame(() => {
    syncNavToScroll();
    navScrollFrame = 0;
  });
}, {passive:true});
activateNav(location.hash || '#top');

document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    $('#searchButton').click();
  }
  if (event.key === 'Escape') {
    closeWord();
    $('#searchModal').classList.remove('show');
  }
  if (!$('#trainer').hidden && event.key === 'Enter') {
    const input = $('#trainingInput');
    if (input?.tagName === 'TEXTAREA' && !(event.metaKey || event.ctrlKey)) return;
    if (!$('#checkAnswer').disabled) {
      event.preventDefault();
      checkCurrentAnswer();
    }
  }
});

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./service-worker.js').catch(() => {});
}
