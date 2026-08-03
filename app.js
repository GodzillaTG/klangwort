const musicWords = [
  ['der Komponist','der','composer','作曲家','Der Komponist schreibt eine neue Oper.','作曲家正在创作一部新歌剧。'],
  ['die Komposition','die','composition','作曲；音乐作品','Die Komposition dauert zwölf Minuten.','这部作品时长十二分钟。'],
  ['die Partitur','die','full score','总谱','Die Dirigentin liest die Partitur.','指挥正在阅读总谱。'],
  ['die Stimme','die','part / voice','声部；分谱','Die erste Geige hat eine schwierige Stimme.','第一小提琴声部很难。'],
  ['das Motiv','das','motif','动机','Das Motiv kommt im ganzen Satz wieder.','这个动机在整个乐章中反复出现。'],
  ['die Melodie','die','melody','旋律','Die Melodie klingt sehr ruhig.','这段旋律听起来很平静。'],
  ['die Harmonie','die','harmony','和声','Die Harmonie wird plötzlich dunkler.','和声突然变得更暗。'],
  ['der Rhythmus','der','rhythm','节奏','Der Rhythmus ist nicht leicht zu zählen.','这个节奏不容易数。'],
  ['das Tempo','das','tempo','速度','Das Tempo muss etwas langsamer sein.','速度需要再慢一点。'],
  ['die Dynamik','die','dynamics','力度变化','Die Dynamik ist sehr fein.','力度变化非常细腻。'],
  ['die Probe','die','rehearsal','排练','Die Probe beginnt um zehn Uhr.','排练十点开始。'],
  ['die Aufführung','die','performance','演出；上演','Die Aufführung war ausverkauft.','这场演出门票售罄。'],
  ['der Tonmeister','der','recording producer / sound engineer','录音师；音响导演','Der Tonmeister prüft den Klang.','录音师正在检查声音。'],
  ['die Aufnahme','die','recording','录音；录制','Die Aufnahme beginnt nach dem Signal.','录音在信号之后开始。'],
  ['das Mikrofon','das','microphone','麦克风','Das Mikrofon steht vor dem Cello.','麦克风放在大提琴前面。'],
  ['die Mikrofonierung','die','microphone placement','麦克风布置；拾音方式','Die Mikrofonierung klingt natürlich.','这种拾音方式听起来很自然。'],
  ['die Spur','die','track','音轨','Die Sängerin nimmt ihre Spur neu auf.','歌手重新录制她的音轨。'],
  ['das Mischpult','das','mixing console','调音台','Der Tonmeister steht am Mischpult.','录音师站在调音台前。'],
  ['die Mischung','die','mix','混音；混合','Die Mischung braucht mehr Tiefe.','混音需要更有纵深感。'],
  ['der Nachhall','der','reverberation','混响；余响','Der Nachhall in der Kirche ist lang.','教堂里的混响很长。'],
  ['der Pegel','der','level','电平；音量级','Der Pegel ist zu hoch.','电平太高了。'],
  ['der Klang','der','sound / timbre','声音；音色','Der Klang der Geige ist warm.','小提琴的音色很温暖。'],
  ['der Schnitt','der','edit / cut','剪辑；剪接点','Der Schnitt ist kaum hörbar.','这个剪接点几乎听不出来。'],
  ['das Mastering','das','mastering','母带处理','Nach dem Mastering ist das Album fertig.','母带处理后，专辑就完成了。']
];

const aiWords = [
  ['die künstliche Intelligenz','die','artificial intelligence','人工智能','Künstliche Intelligenz verändert viele Berufe.','人工智能正在改变许多职业。'],
  ['der Algorithmus','der','algorithm','算法','Der Algorithmus erkennt ein Muster.','算法识别出了一个模式。'],
  ['das Modell','das','model','模型','Das Modell lernt aus Beispielen.','模型从示例中学习。'],
  ['der Datensatz','der','dataset','数据集','Der Datensatz enthält viele Bilder.','数据集包含许多图片。'],
  ['das neuronale Netz','das','neural network','神经网络','Das neuronale Netz wird trainiert.','神经网络正在接受训练。'],
  ['das Training','das','training','训练','Das Training braucht viel Rechenleistung.','训练需要大量算力。'],
  ['die Eingabe','die','input','输入','Die Eingabe muss klar sein.','输入必须清晰。'],
  ['die Ausgabe','die','output','输出','Die Ausgabe enthält einen Fehler.','输出中有一个错误。'],
  ['der Chatbot','der','chatbot','聊天机器人','Der Chatbot beantwortet die Frage.','聊天机器人回答了这个问题。'],
  ['die Bilderkennung','die','image recognition','图像识别','Die Bilderkennung funktioniert gut.','图像识别运行良好。'],
  ['die Automatisierung','die','automation','自动化','Die Automatisierung spart Zeit.','自动化节省时间。'],
  ['der Prompt','der','prompt','提示词','Der Prompt beschreibt die Aufgabe.','提示词描述了任务。']
];

const gameWords = [
  ['das Spiel','das','game','游戏','Das Spiel erscheint im Herbst.','这款游戏将在秋季发行。'],
  ['der Spieler','der','player','玩家','Der Spieler öffnet die Karte.','玩家打开地图。'],
  ['die Spielwelt','die','game world','游戏世界','Die Spielwelt ist sehr groß.','游戏世界非常大。'],
  ['die Steuerung','die','controls','操控；控制方式','Die Steuerung fühlt sich direkt an.','操控感觉很直接。'],
  ['der Controller','der','controller','手柄','Der Controller liegt auf dem Tisch.','手柄放在桌上。'],
  ['das Level','das','level','关卡；等级','Das Level ist zu schwierig.','这个关卡太难了。'],
  ['die Aufgabe','die','quest / task','任务','Die Aufgabe bringt viel Erfahrung.','这个任务提供很多经验值。'],
  ['der Gegner','der','opponent / enemy','对手；敌人','Der Gegner wartet hinter der Tür.','敌人在门后等待。'],
  ['der Mehrspielermodus','der','multiplayer mode','多人模式','Der Mehrspielermodus startet heute.','多人模式今天上线。'],
  ['die Grafik','die','graphics','画面；图形','Die Grafik sieht realistisch aus.','画面看起来很真实。'],
  ['der Spielstand','der','save game / game progress','游戏存档','Der Spielstand wurde gespeichert.','游戏进度已经保存。'],
  ['die Belohnung','die','reward','奖励','Die Belohnung ist ein neues Schwert.','奖励是一把新剑。']
];

const filmWords = [
  ['der Film','der','film / movie','电影','Der Film beginnt um acht Uhr.','电影八点开始。'],
  ['der Regisseur','der','director','导演','Der Regisseur erklärt die Szene.','导演解释这场戏。'],
  ['das Drehbuch','das','screenplay','剧本','Das Drehbuch hat ein offenes Ende.','剧本有一个开放式结局。'],
  ['die Szene','die','scene','场景；戏','Diese Szene wurde nachts gedreht.','这一幕是在夜间拍摄的。'],
  ['die Kamera','die','camera','摄影机','Die Kamera bewegt sich langsam.','摄影机缓慢移动。'],
  ['die Handlung','die','plot','剧情','Die Handlung ist leicht zu verstehen.','剧情很容易理解。'],
  ['der Schauspieler','der','actor','男演员','Der Schauspieler spielt sehr überzeugend.','这位演员演得很有说服力。'],
  ['die Schauspielerin','die','actress','女演员','Die Schauspielerin gewinnt einen Preis.','这位女演员获得了一个奖项。'],
  ['der Ton','der','sound','声音；录音','Der Ton ist in dieser Szene besonders wichtig.','声音在这一幕尤其重要。'],
  ['die Untertitel','die','subtitles','字幕','Die Untertitel sind auf Deutsch.','字幕是德语的。'],
  ['die Premiere','die','premiere','首映','Die Premiere findet in Berlin statt.','首映在柏林举行。'],
  ['die Filmkritik','die','film review','影评','Die Filmkritik ist sehr positiv.','影评非常正面。']
];

const TARGET_TOPIC_SIZE = 520;
const parseLexicon = source => source.trim().split('\n').map(line => line.split('|'));
const compoundLexicons = {
  music:{
    modifiers:parseLexicon(`
Aufnahme|recording|录音
Studio|studio|录音棚
Konzert|concert|音乐会
Orchester|orchestra|管弦乐团
Chor|choir|合唱
Instrumental|instrumental|器乐
Vokal|vocal|声乐
Mikrofon|microphone|麦克风
Stereo|stereo|立体声
Surround|surround|环绕声
Signal|signal|信号
Klang|sound|声音
Frequenz|frequency|频率
Dynamik|dynamics|动态
Misch|mixing|混音
Mastering|mastering|母带
Schnitt|editing|剪辑
Produktions|production|制作
Proben|rehearsal|排练
Partitur|score|总谱
Kompositions|composition|作曲
Arrangement|arrangement|编曲
Bühnen|stage|舞台
Raumakustik|room acoustics|室内声学`),
    heads:parseLexicon(`
system|das|system|系统
technik|die|technique|技术
analyse|die|analysis|分析
prozess|der|process|流程
planung|die|planning|规划
kontrolle|die|control|控制
einstellung|die|setting|设置
messung|die|measurement|测量
bearbeitung|die|processing|处理
version|die|version|版本
struktur|die|structure|结构
qualität|die|quality|质量
methode|die|method|方法
konzept|das|concept|概念
gerät|das|device|设备
raum|der|space|空间
position|die|position|位置
spur|die|track|音轨
ebene|die|layer|层次
phase|die|phase|阶段
dokumentation|die|documentation|文档
signal|das|signal|信号`)
  },
  ai:{
    modifiers:parseLexicon(`
Daten|data|数据
Modell|model|模型
Lern|learning|学习
Trainings|training|训练
Inferenz|inference|推理
Sprach|language|语言
Bild|image|图像
Text|text|文本
Agenten|agent|智能体
Prompt|prompt|提示词
Token|token|词元
Vektor|vector|向量
Wissens|knowledge|知识
Such|search|搜索
Sicherheits|safety|安全
Bewertungs|evaluation|评估
Automatisierungs|automation|自动化
Benutzer|user|用户
System|system|系统
Netzwerk|network|网络
Cloud|cloud|云端
Rechen|compute|计算
Entscheidungs|decision|决策
Generierungs|generation|生成`),
    heads:parseLexicon(`
system|das|system|系统
modell|das|model|模型
datenbank|die|database|数据库
analyse|die|analysis|分析
prozess|der|process|流程
pipeline|die|pipeline|管线
steuerung|die|control|控制
schnittstelle|die|interface|接口
architektur|die|architecture|架构
plattform|die|platform|平台
funktion|die|function|功能
methode|die|method|方法
dienst|der|service|服务
anwendung|die|application|应用
prüfung|die|test|测试
qualität|die|quality|质量
ausgabe|die|output|输出
eingabe|die|input|输入
leistung|die|performance|性能
sicherheit|die|security|安全
version|die|version|版本
umgebung|die|environment|环境`)
  },
  games:{
    modifiers:parseLexicon(`
Spiel|game|游戏
Level|level|关卡
Quest|quest|任务
Kampf|combat|战斗
Gegner|enemy|敌人
Spieler|player|玩家
Mehrspieler|multiplayer|多人
Online|online|在线
Karten|map|地图
Inventar|inventory|物品栏
Charakter|character|角色
Waffen|weapon|武器
Bewegungs|movement|移动
Kamera|camera|镜头
Steuerungs|control|操控
Grafik|graphics|画面
Audio|audio|音频
Dialog|dialogue|对话
Missions|mission|任务
Belohnungs|reward|奖励
Fortschritts|progression|进度
Speicher|save|存档
Netzwerk|network|网络
Turnier|tournament|锦标赛`),
    heads:parseLexicon(`
system|das|system|系统
design|das|design|设计
mechanik|die|mechanic|机制
modus|der|mode|模式
karte|die|map|地图
welt|die|world|世界
steuerung|die|controls|操控
anzeige|die|display|显示
menü|das|menu|菜单
funktion|die|function|功能
logik|die|logic|逻辑
balance|die|balance|平衡
entwicklung|die|development|开发
prüfung|die|testing|测试
version|die|version|版本
qualität|die|quality|质量
strategie|die|strategy|策略
bewegung|die|movement|移动
animation|die|animation|动画
effekt|der|effect|效果
punkt|der|point|点数
phase|die|phase|阶段`)
  },
  film:{
    modifiers:parseLexicon(`
Film|film|电影
Drehbuch|screenplay|剧本
Szenen|scene|场景
Kamera|camera|摄影
Licht|lighting|灯光
Ton|sound|声音
Schnitt|editing|剪辑
Regie|directing|导演
Produktions|production|制作
Besetzungs|casting|选角
Kostüm|costume|服装
Bühnenbild|set design|布景
Dialog|dialogue|对白
Erzähl|narrative|叙事
Montage|montage|蒙太奇
Farb|color|色彩
Effekt|effects|特效
Animations|animation|动画
Dokumentar|documentary|纪录片
Kino|cinema|影院
Festival|festival|电影节
Casting|casting|试镜
Drehort|location|拍摄地
Postproduktions|post-production|后期制作`),
    heads:parseLexicon(`
planung|die|planning|规划
analyse|die|analysis|分析
gestaltung|die|design|设计
konzept|das|concept|概念
technik|die|technique|技术
prozess|der|process|流程
version|die|version|版本
struktur|die|structure|结构
wirkung|die|effect|效果
qualität|die|quality|质量
kontrolle|die|control|控制
leitung|die|direction|统筹
team|das|team|团队
gerät|das|device|设备
aufbau|der|setup|搭建
probe|die|rehearsal|排练
sequenz|die|sequence|段落
einstellung|die|shot|镜头
perspektive|die|perspective|视角
bewegung|die|movement|运动
atmosphäre|die|atmosphere|氛围
rhythmus|der|rhythm|节奏`)
  }
};

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
function buildCompoundRows(baseRows, lexicon) {
  const rows = [...baseRows];
  const seen = new Set(rows.map(row => row[0].toLowerCase()));
  for (const modifier of lexicon.modifiers) {
    for (const head of lexicon.heads) {
      if (rows.length >= TARGET_TOPIC_SIZE) return rows;
      const [prefix,prefixEn,prefixZh] = modifier;
      const [tail,article,tailEn,tailZh] = head;
      const prefixRoot = prefix.replace(/[-s]$/i,'').toLowerCase();
      const tailRoot = tail.toLowerCase();
      if (prefixRoot === tailRoot || tailRoot.startsWith(prefixRoot)) continue;
      const compound = prefix.endsWith('-') ? `${prefix}${titleCase(tail)}` : `${prefix}${tail}`;
      const word = `${article} ${compound}`;
      if (seen.has(word.toLowerCase())) continue;
      seen.add(word.toLowerCase());
      const accusative = article === 'der' ? 'den' : article;
      rows.push([
        word,
        article,
        `${prefixEn} ${tailEn}`,
        `${prefixZh}${tailZh}`,
        `Wir untersuchen ${accusative} ${compound} im Fachkurs.`,
        `我们在专业课程中学习“${prefixZh}${tailZh}”。`
      ]);
    }
  }
  if (rows.length < TARGET_TOPIC_SIZE) throw new Error('Topic lexicon did not reach its target size.');
  return rows;
}

const expandedMusicWords = buildCompoundRows(musicWords,compoundLexicons.music);
const expandedAiWords = buildCompoundRows(aiWords,compoundLexicons.ai);
const expandedGameWords = buildCompoundRows(gameWords,compoundLexicons.games);
const expandedFilmWords = buildCompoundRows(filmWords,compoundLexicons.film);

const topicMeta = {
  music:{label:'Klangwort · Musik',short:'Klangwort'},
  ai:{label:'AI · Künstliche Intelligenz',short:'AI'},
  games:{label:'Games · Spiele',short:'Games'},
  film:{label:'Film · Kino',short:'Film'}
};

function makeWords(rows, topic) {
  return rows.map((row, index) => ({
    key:`${topic}-${index}`,
    word:row[0], gender:row[1], en:row[2], zh:row[3],
    example:row[4], exampleZh:row[5], topic
  }));
}
const allWords = [
  ...makeWords(expandedMusicWords,'music'),
  ...makeWords(expandedAiWords,'ai'),
  ...makeWords(expandedGameWords,'games'),
  ...makeWords(expandedFilmWords,'film')
];

const caseSeedEnglish = {
  'case-01':'The composer is writing a new opera.',
  'case-02':'I hear the sound.',
  'case-03':'We thank the recording engineer.',
  'case-04':'The ending of the film is surprising.',
  'case-05':'I play with the controller.',
  'case-06':'The gift is for the player.',
  'case-07':'We are talking about the film.',
  'case-08':'The music comes from the game.',
  'case-09':'She works at the production.',
  'case-10':'It does not work without the microphone.',
  'case-11':'He is going to the studio.',
  'case-12':'The recording stops because of the error.',
  'case-13':'The cable is lying on the table.',
  'case-14':'I put the cable onto the table.',
  'case-15':'The director shows the actress the scene.',
  'case-16':'The director shows the actress the scene.',
  'case-17':'I see a film.',
  'case-18':'We are filming with a camera.',
  'case-19':'The idea of a game is original.',
  'case-20':'I help the player.',
  'case-21':'The algorithm learns quickly.',
  'case-22':'We are testing the model.',
  'case-23':'The graphics of the game are beautiful.',
  'case-24':'We play with the players.'
};
const caseQuestionSeeds = [
  ['case-01','冠词变化 · 主格','___ Komponist schreibt eine neue Oper.','谁在做动作？Komponist 是主语。',['Der','Den','Dem','Des'],'Der','主语使用 Nominativ。阳性定冠词是 der。'],
  ['case-02','冠词变化 · 宾格','Ich höre ___ Klang.','“声音”是 hören 直接作用的对象。',['der','den','dem','des'],'den','阳性名词作直接宾语，用 Akkusativ：der → den。'],
  ['case-03','冠词变化 · 与格','Wir danken ___ Tonmeister.','danken 后面的人使用 Dativ。',['der','den','dem','des'],'dem','danken + Dativ。阳性定冠词变为 dem。'],
  ['case-04','冠词变化 · 属格','Das Ende ___ Films ist überraschend.','电影的结尾：表示所属。',['der','den','dem','des'],'des','Genitiv 表示“谁的”。阳性名词用 des，并给名词加 -s。'],
  ['case-05','介词支配 · 与格','Ich spiele mit ___ Controller.','mit 永远支配 Dativ。',['der','den','dem','des'],'dem','mit + Dativ：der Controller → mit dem Controller。'],
  ['case-06','介词支配 · 宾格','Das Geschenk ist für ___ Spieler.','für 永远支配 Akkusativ。',['der','den','dem','des'],'den','für + Akkusativ：der Spieler → für den Spieler。'],
  ['case-07','介词支配 · 宾格','Wir sprechen über ___ Film.','sprechen über 使用 Akkusativ。',['der','den','dem','des'],'den','über 在这里表示谈论的对象，使用 Akkusativ。'],
  ['case-08','介词支配 · 与格','Die Musik kommt aus ___ Spiel.','aus 永远支配 Dativ。',['das','dem','des','den'],'dem','aus + Dativ：das Spiel → aus dem Spiel。'],
  ['case-09','介词支配 · 与格','Sie arbeitet bei ___ Produktion.','bei 永远支配 Dativ。',['die','der','den','des'],'der','bei + Dativ：die Produktion → bei der Produktion。'],
  ['case-10','介词支配 · 宾格','Ohne ___ Mikrofon geht es nicht.','ohne 永远支配 Akkusativ。',['das','dem','des','den'],'das','ohne + Akkusativ。中性 das 在宾格中不变。'],
  ['case-11','介词支配 · 与格','Er fährt zu ___ Studio.','zu 永远支配 Dativ。',['das','dem','des','den'],'dem','zu + Dativ：das Studio → zu dem Studio（常缩写为 zum）。'],
  ['case-12','介词支配 · 属格','Wegen ___ Fehlers stoppt die Aufnahme.','wegen 在标准书面语中支配 Genitiv。',['der','den','dem','des'],'des','wegen + Genitiv：der Fehler → wegen des Fehlers。'],
  ['case-13','静态位置 · 与格','Das Kabel liegt auf ___ Tisch.','位置不变：Wo? 在哪里？',['der','den','dem','des'],'dem','双向介词表示静态位置时用 Dativ：auf dem Tisch。'],
  ['case-14','方向移动 · 宾格','Ich lege das Kabel auf ___ Tisch.','发生方向移动：Wohin? 去哪里？',['der','den','dem','des'],'den','双向介词表示方向时用 Akkusativ：auf den Tisch。'],
  ['case-15','双宾语 · 与格','Der Regisseur zeigt ___ Schauspielerin die Szene.','“给女演员”是间接对象。',['die','der','den','des'],'der','间接对象用 Dativ：die Schauspielerin → der Schauspielerin。'],
  ['case-16','双宾语 · 宾格','Der Regisseur zeigt der Schauspielerin ___ Szene.','被展示的“场景”是直接对象。',['die','der','den','des'],'die','直接对象用 Akkusativ；阴性冠词 die 不变。'],
  ['case-17','不定冠词 · 宾格','Ich sehe ___ Film.','Film 是 sehen 的直接宾语。',['ein','einen','einem','eines'],'einen','阳性不定冠词在 Akkusativ 中：ein → einen。'],
  ['case-18','不定冠词 · 与格','Wir drehen mit ___ Kamera.','mit + Dativ，Kamera 是阴性。',['eine','einer','einen','eines'],'einer','阴性不定冠词在 Dativ 中是 einer。'],
  ['case-19','不定冠词 · 属格','Die Idee ___ Spiels ist originell.','一个游戏的想法：表示所属。',['ein','einen','einem','eines'],'eines','中性不定冠词在 Genitiv 中是 eines，名词加 -s。'],
  ['case-20','识别格','Ich helfe dem Spieler.','dem Spieler 在句子中是什么格？',['Nominativ','Akkusativ','Dativ','Genitiv'],'Dativ','helfen 支配 Dativ；dem 也是阳性与格的明确信号。'],
  ['case-21','识别格','Der Algorithmus lernt schnell.','der Algorithmus 在句子中是什么格？',['Nominativ','Akkusativ','Dativ','Genitiv'],'Nominativ','Algorithmus 是动作 lernt 的执行者，即主语。'],
  ['case-22','识别格','Wir testen das Modell.','das Modell 在句子中是什么格？',['Nominativ','Akkusativ','Dativ','Genitiv'],'Akkusativ','Modell 是 testen 的直接宾语。中性冠词在宾格中仍是 das。'],
  ['case-23','识别格','Die Grafik des Spiels ist schön.','des Spiels 在句子中是什么格？',['Nominativ','Akkusativ','Dativ','Genitiv'],'Genitiv','des Spiels 表示“游戏的”，是所属关系。'],
  ['case-24','复数与格','Wir spielen mit ___ Spielern.','mit + Dativ；Spieler 是复数。',['die','der','den','des'],'den','复数 Dativ 使用 den，名词通常再加 -n：den Spielern。']
].map(row => ({
  id:row[0], category:row[1], prompt:row[2], context:row[3],
  options:row[4].map(value => ({value,label:value})), answer:row[5], explanation:row[6],
  translationEn:caseSeedEnglish[row[0]], type:'case'
}));

const caseNames = ['Nominativ','Akkusativ','Dativ','Genitiv'];
const caseLabels = {
  Nominativ:'主格 · 谁在做动作',
  Akkusativ:'宾格 · 直接作用对象',
  Dativ:'与格 · 介词 mit 后的对象',
  Genitiv:'属格 · 表示所属关系'
};
const articleForms = {
  der:{Nominativ:'der',Akkusativ:'den',Dativ:'dem',Genitiv:'des'},
  die:{Nominativ:'die',Akkusativ:'die',Dativ:'der',Genitiv:'der'},
  das:{Nominativ:'das',Akkusativ:'das',Dativ:'dem',Genitiv:'des'}
};
function makeCaseQuestion(word,index,caseName) {
  const noun = word.word.replace(/^(der|die|das)\s+/,'');
  const article = articleForms[word.gender][caseName];
  const genitiveNoun = word.gender === 'die' || /us$/i.test(noun)
    ? noun
    : /(?:s|ß|x|z)$/i.test(noun) ? `${noun}es` : `${noun}s`;
  const phrase = `${article} ${caseName === 'Genitiv' ? genitiveNoun : noun}`;
  const prompt = caseName === 'Nominativ'
    ? `${titleCase(phrase)} ist heute wichtig.`
    : caseName === 'Akkusativ'
      ? `Wir untersuchen ${phrase}.`
      : caseName === 'Dativ'
        ? `Wir arbeiten mit ${phrase}.`
        : `Die Bedeutung ${phrase} ist klar.`;
  const translationEn = caseName === 'Nominativ'
    ? `The ${word.en} is important today.`
    : caseName === 'Akkusativ'
      ? `We examine the ${word.en}.`
      : caseName === 'Dativ'
        ? `We work with the ${word.en}.`
        : `The meaning of the ${word.en} is clear.`;
  return {
    id:`case-generated-${index}`,
    category:`格判断 · ${caseName}`,
    prompt,
    context:`判断句子中“${phrase}”使用的是哪一个格。`,
    translationEn,
    options:caseNames.map(value => ({value,label:value,sub:caseLabels[value].split(' · ')[0]})),
    answer:caseName,
    explanation:caseName === 'Nominativ'
      ? `${phrase} 是句子的主语，所以使用 Nominativ。`
      : caseName === 'Akkusativ'
        ? `untersuchen 的直接宾语使用 Akkusativ。`
        : caseName === 'Dativ'
          ? `介词 mit 固定支配 Dativ。`
          : `${article} 表示所属关系，这里使用 Genitiv。`,
    type:'case',
    wordKey:word.key
  };
}
function buildCaseBank(count) {
  return Array.from({length:count},(_,index) => {
    const caseName = caseNames[index % caseNames.length];
    return makeCaseQuestion(allWords[(index * 7) % allWords.length],index,caseName);
  });
}
const caseQuestions = [
  ...caseQuestionSeeds,
  ...buildCaseBank(TARGET_TOPIC_SIZE - caseQuestionSeeds.length)
];

const articleFamilies = [
  {key:'definite',label:'der / die / das',base:'der',en:'the',kind:'definite',plural:true},
  {key:'ein',label:'ein',base:'ein',en:'a/an',kind:'ein',plural:false},
  {key:'kein',label:'kein',base:'kein',en:'no',kind:'ein',plural:true},
  {key:'mein',label:'mein',base:'mein',en:'my',kind:'ein',plural:true},
  {key:'dein',label:'dein',base:'dein',en:'your',kind:'ein',plural:true},
  {key:'sein',label:'sein',base:'sein',en:'his/its',kind:'ein',plural:true},
  {key:'ihr',label:'ihr',base:'ihr',en:'her/their',kind:'ein',plural:true},
  {key:'unser',label:'unser',base:'unser',en:'our',kind:'ein',plural:true},
  {key:'euer',label:'euer',base:'euer',en:'your (plural)',kind:'ein',plural:true},
  {key:'formal',label:'Ihr',base:'Ihr',en:'your (formal)',kind:'ein',plural:true}
];
const articleGenders = [
  {key:'m',de:'Maskulin',zh:'阳性',en:'masculine',noun:'Algorithmus',genitive:'Algorithmus',nounEn:'algorithm'},
  {key:'f',de:'Feminin',zh:'阴性',en:'feminine',noun:'Kamera',genitive:'Kamera',nounEn:'camera'},
  {key:'n',de:'Neutrum',zh:'中性',en:'neuter',noun:'Modell',genitive:'Modells',nounEn:'model'},
  {key:'pl',de:'Plural',zh:'复数',en:'plural',noun:'Daten',genitive:'Daten',nounEn:'data'}
];
const articleCaseEnglish = {
  Nominativ:'nominative',
  Akkusativ:'accusative',
  Dativ:'dative',
  Genitiv:'genitive'
};
const definiteDeclension = {
  Nominativ:{m:'der',f:'die',n:'das',pl:'die'},
  Akkusativ:{m:'den',f:'die',n:'das',pl:'die'},
  Dativ:{m:'dem',f:'der',n:'dem',pl:'den'},
  Genitiv:{m:'des',f:'der',n:'des',pl:'der'}
};
const einEndings = {
  Nominativ:{m:'',f:'e',n:'',pl:'e'},
  Akkusativ:{m:'en',f:'e',n:'',pl:'e'},
  Dativ:{m:'em',f:'er',n:'em',pl:'en'},
  Genitiv:{m:'es',f:'er',n:'es',pl:'er'}
};
function attachArticleEnding(base,ending) {
  if (!ending) return base;
  return base === 'euer' ? `eur${ending}` : `${base}${ending}`;
}
function declinedArticle(family,caseName,genderKey) {
  return family.kind === 'definite'
    ? definiteDeclension[caseName][genderKey]
    : attachArticleEnding(family.base,einEndings[caseName][genderKey]);
}
function articleMemoryTip(family,caseName,gender,answer) {
  const definiteRows = {
    Nominativ:'der · die · das · die',
    Akkusativ:'den · die · das · die',
    Dativ:'dem · der · dem · den',
    Genitiv:'des · der · des · der'
  };
  if (family.kind === 'definite') {
    return `${caseName} 横排背法：${definiteRows[caseName]}。${gender.zh}位置对应 ${answer}。`;
  }
  const ending = einEndings[caseName][gender.key] || '零词尾';
  return `ein 类冠词共用同一套词尾。${caseName} 的 ${gender.zh}位置记作 ${ending === '零词尾' ? ending : `-${ending}`}：${family.base} → ${answer}。`;
}
function articleChoiceOptions(family,answer,index) {
  const candidates = family.kind === 'definite'
    ? ['der','die','das','den','dem','des']
    : ['', 'e','en','em','er','es'].map(ending => attachArticleEnding(family.base,ending));
  const values = [answer,...candidates.filter(value => value !== answer)].slice(0,4);
  const shift = index % values.length;
  return [...values.slice(shift),...values.slice(0,shift)].map(value => ({value,label:value}));
}
function articleSentence(family,caseName,gender,answer) {
  const noun = caseName === 'Genitiv' ? gender.genitive : gender.noun;
  const phrase = `${answer} ${noun}`;
  const englishDeterminer = family.key === 'ein'
    ? (/^[aeiou]/i.test(gender.nounEn) ? 'an' : 'a')
    : family.en;
  if (caseName === 'Nominativ') return {
    de:`___ ${gender.noun} ist wichtig.`,
    en:`${titleCase(englishDeterminer)} ${gender.nounEn} is important.`
  };
  if (caseName === 'Akkusativ') return {
    de:`Wir benutzen ___ ${gender.noun}.`,
    en:`We use ${englishDeterminer} ${gender.nounEn}.`
  };
  if (caseName === 'Dativ') return {
    de:`Wir arbeiten mit ___ ${gender.noun}.`,
    en:`We work with ${englishDeterminer} ${gender.nounEn}.`
  };
  return {
    de:`Die Qualität ___ ${noun} ist gut.`,
    en:`The quality of ${englishDeterminer} ${gender.nounEn} is good.`,
    phrase
  };
}
const articleCombinations = articleFamilies.flatMap(family =>
  caseNames.flatMap(caseName =>
    articleGenders
      .filter(gender => family.plural || gender.key !== 'pl')
      .map(gender => ({family,caseName,gender}))
  )
);
function makeArticleQuestion(combo,index) {
  const {family,caseName,gender} = combo;
  const answer = declinedArticle(family,caseName,gender.key);
  const variant = Math.floor(index / articleCombinations.length) % 3;
  const sentence = articleSentence(family,caseName,gender,answer);
  const directPrompt = `${family.label} · ${gender.de} · ${caseName}`;
  return {
    id:`article-${family.key}-${caseName}-${gender.key}-${index}`,
    type:'article',
    category:'冠词变格 · ARTIKEL',
    prompt:variant === 1 ? sentence.de : directPrompt,
    context:variant === 1
      ? `填写正确冠词。基础形式：${family.label}；${gender.zh}；${caseName}。`
      : `写出 ${family.label} 在${gender.zh} ${caseName} 中的正确形式。`,
    translationEn:variant === 1
      ? sentence.en
      : `What is the ${gender.en} ${articleCaseEnglish[caseName]} form of “${family.label}”?`,
    options:articleChoiceOptions(family,answer,index),
    answer,
    explanation:`${family.label} + ${gender.de} + ${caseName} = ${answer}。`,
    memoryTip:articleMemoryTip(family,caseName,gender,answer)
  };
}
const articleBank = Array.from({length:TARGET_TOPIC_SIZE},(_,index) =>
  makeArticleQuestion(articleCombinations[index % articleCombinations.length],index)
);

const adjectivePatterns = [
  {key:'weak',de:'schwach · der-Wort',zh:'弱变化 · 定冠词后',en:'weak declension after a definite article'},
  {key:'mixed',de:'gemischt · ein-Wort',zh:'混合变化 · ein 类后',en:'mixed declension after an ein-word'},
  {key:'strong',de:'stark · ohne Artikel',zh:'强变化 · 无冠词',en:'strong declension without an article'}
];
const adjectiveWords = [
  {de:'neu',en:'new'},{de:'gut',en:'good'},{de:'wichtig',en:'important'},
  {de:'technisch',en:'technical'},{de:'kreativ',en:'creative'},{de:'schnell',en:'fast'},
  {de:'modern',en:'modern'},{de:'klar',en:'clear'},{de:'genau',en:'precise'},
  {de:'ruhig',en:'quiet'},{de:'laut',en:'loud'},{de:'stark',en:'strong'},
  {de:'schwach',en:'weak'},{de:'digital',en:'digital'},{de:'virtuell',en:'virtual'},
  {de:'künstlich',en:'artificial'},{de:'musikalisch',en:'musical'},{de:'filmisch',en:'cinematic'},
  {de:'spielbar',en:'playable'},{de:'sichtbar',en:'visible'},{de:'zuverlässig',en:'reliable'},
  {de:'komplex',en:'complex'}
];
const adjectiveNouns = {
  m:{noun:'Klang',genitive:'Klangs',en:'sound'},
  f:{noun:'Musik',genitive:'Musik',en:'music'},
  n:{noun:'Material',genitive:'Materials',en:'material'},
  pl:{noun:'Daten',genitive:'Daten',en:'data points'}
};
const adjectiveEndings = {
  weak:{
    Nominativ:{m:'e',f:'e',n:'e',pl:'en'},
    Akkusativ:{m:'en',f:'e',n:'e',pl:'en'},
    Dativ:{m:'en',f:'en',n:'en',pl:'en'},
    Genitiv:{m:'en',f:'en',n:'en',pl:'en'}
  },
  mixed:{
    Nominativ:{m:'er',f:'e',n:'es',pl:'en'},
    Akkusativ:{m:'en',f:'e',n:'es',pl:'en'},
    Dativ:{m:'en',f:'en',n:'en',pl:'en'},
    Genitiv:{m:'en',f:'en',n:'en',pl:'en'}
  },
  strong:{
    Nominativ:{m:'er',f:'e',n:'es',pl:'e'},
    Akkusativ:{m:'en',f:'e',n:'es',pl:'e'},
    Dativ:{m:'em',f:'er',n:'em',pl:'en'},
    Genitiv:{m:'en',f:'er',n:'en',pl:'er'}
  }
};
function adjectiveMemoryTip(pattern,caseName,gender,ending) {
  if (pattern.key === 'weak') {
    return `定冠词已经显示格和词性，形容词只用 -e 或 -en。Dativ、Genitiv 和复数优先记 -en；本题是 -${ending}。`;
  }
  if (pattern.key === 'mixed') {
    return `ein 类冠词没有明显词尾时，形容词负责补信号：Nominativ 阳性 -er、中性 -es；其余多数用 -en。本题是 -${ending}。`;
  }
  const strongRows = {
    Nominativ:'-er · -e · -es · -e',
    Akkusativ:'-en · -e · -es · -e',
    Dativ:'-em · -er · -em · -en',
    Genitiv:'-en · -er · -en · -er'
  };
  return `没有冠词时，形容词自己承担格和词性信号。${caseName} 横排：${strongRows[caseName]}；${gender.zh}位置是 -${ending}。`;
}
function adjectiveChoiceOptions(adjective,answer,index) {
  const candidates = ['', 'e','en','em','er','es'].map(ending => `${adjective.de}${ending}`);
  const values = [answer,...candidates.filter(value => value !== answer)].slice(0,4);
  const shift = index % values.length;
  return [...values.slice(shift),...values.slice(0,shift)].map(value => ({value,label:value}));
}
function adjectiveArticle(pattern,caseName,genderKey) {
  if (pattern.key === 'strong') return '';
  if (pattern.key === 'weak') return definiteDeclension[caseName][genderKey];
  const family = genderKey === 'pl'
    ? articleFamilies.find(item => item.key === 'mein')
    : articleFamilies.find(item => item.key === 'ein');
  return declinedArticle(family,caseName,genderKey);
}
function adjectiveEnglishDeterminer(pattern,genderKey,nounEn) {
  if (pattern.key === 'strong') return '';
  if (pattern.key === 'weak') return 'the';
  if (genderKey === 'pl') return 'my';
  return /^[aeiou]/i.test(nounEn) ? 'an' : 'a';
}
function makeAdjectiveQuestion(combo,index) {
  const {adjective,pattern,caseName,gender} = combo;
  const noun = adjectiveNouns[gender.key];
  const ending = adjectiveEndings[pattern.key][caseName][gender.key];
  const answer = `${adjective.de}${ending}`;
  const article = adjectiveArticle(pattern,caseName,gender.key);
  const nounForm = caseName === 'Genitiv' ? noun.genitive : noun.noun;
  const phrase = [article,answer,nounForm].filter(Boolean).join(' ');
  const determiner = adjectiveEnglishDeterminer(pattern,gender.key,noun.en);
  const englishPhrase = [determiner,adjective.en,noun.en].filter(Boolean).join(' ');
  const sentence = caseName === 'Nominativ'
    ? {
        de:`${article ? `${titleCase(article)} ` : ''}___ ${noun.noun} ${gender.key === 'pl' ? 'sind' : 'ist'} wichtig. (${adjective.de})`,
        en:`${titleCase(englishPhrase)} ${gender.key === 'pl' ? 'are' : 'is'} important.`
      }
    : caseName === 'Akkusativ'
      ? {de:`Wir verwenden ${article ? `${article} ` : ''}___ ${noun.noun}. (${adjective.de})`,en:`We use ${englishPhrase}.`}
      : caseName === 'Dativ'
        ? {de:`Wir arbeiten mit ${article ? `${article} ` : ''}___ ${noun.noun}. (${adjective.de})`,en:`We work with ${englishPhrase}.`}
        : {de:`Die Qualität ${article ? `${article} ` : ''}___ ${nounForm} ist gut. (${adjective.de})`,en:`The quality of ${englishPhrase} is good.`};
  const variant = index % 3;
  return {
    id:`adjective-${pattern.key}-${caseName}-${gender.key}-${adjective.de}-${index}`,
    type:'adjective',
    category:'形容词变位 · ADJEKTIVDEKLINATION',
    prompt:variant === 0
      ? `${adjective.de} · ${pattern.de} · ${gender.de} · ${caseName}`
      : sentence.de,
    context:variant === 0
      ? `写出形容词“${adjective.de}”在${pattern.zh}、${gender.zh} ${caseName} 中的形式。`
      : `补全形容词词尾。${pattern.zh}；${gender.zh}；${caseName}。`,
    translationEn:variant === 0
      ? `What is the ${gender.en} ${articleCaseEnglish[caseName]} form of “${adjective.de}” in ${pattern.en}?`
      : sentence.en,
    options:adjectiveChoiceOptions(adjective,answer,index),
    answer,
    explanation:`${pattern.de} + ${gender.de} + ${caseName}: ${phrase}。`,
    memoryTip:adjectiveMemoryTip(pattern,caseName,gender,ending)
  };
}
const adjectiveCombinations = adjectiveWords.flatMap(adjective =>
  adjectivePatterns.flatMap(pattern =>
    caseNames.flatMap(caseName =>
      articleGenders.map(gender => ({adjective,pattern,caseName,gender}))
    )
  )
);
const adjectiveBank = Array.from({length:TARGET_TOPIC_SIZE},(_,index) =>
  makeAdjectiveQuestion(adjectiveCombinations[(index * 37) % adjectiveCombinations.length],index)
);

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const shuffle = values => [...values].sort(() => Math.random() - .5);
const dateKey = () => new Date().toISOString().slice(0,10);
const STORAGE_KEY = 'mein-deutsch-personal-v1';
const defaultState = {
  answered:0, correct:0, streak:0, bestStreak:0,
  today:dateKey(), todayAnswered:0, todayCorrect:0,
  mistakes:[], mastered:[], wordScores:{}
};
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const merged = {...defaultState,...saved};
    if (merged.today !== dateKey()) {
      merged.today = dateKey();
      merged.todayAnswered = 0;
      merged.todayCorrect = 0;
      merged.streak = 0;
    }
    return merged;
  } catch { return {...defaultState}; }
}
let state = loadState();
let activeTopic = 'music';
let wordLimit = 9;
let round = [];
let roundIndex = 0;
let roundCorrect = 0;
let roundResults = [];
let roundMode = 'daily';
let selectedAnswer = null;
let answerChecked = false;
let retryCount = 0;

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateDashboard();
}
function updateDashboard() {
  const accuracy = state.todayAnswered ? Math.round(state.todayCorrect / state.todayAnswered * 100) : null;
  $('#heroAccuracy').textContent = accuracy === null ? '—' : `${accuracy}%`;
  $('#heroProgress').style.width = `${Math.min(state.todayAnswered / 15 * 100,100)}%`;
  $('#heroStreak').textContent = state.streak;
  $('#heroMistakes').textContent = state.mistakes.length;
  $('#sideMastered').textContent = state.mastered.length;
  $('#sideAnswered').textContent = state.todayAnswered;
  $('#examMistakeCount').textContent = state.mistakes.length;
}
function genderClass(gender) { return gender === 'der' ? 'der' : gender === 'die' ? 'die' : 'das'; }
function wordCard(word) {
  return `<article class="word-card" data-word="${word.key}">
    <div class="word-card-top"><span class="word-category">${topicMeta[word.topic].label}</span><button data-speak="${word.word}" aria-label="播放 ${word.word}">◖</button></div>
    <h3>${word.word}</h3><p class="en">${word.en}</p><p class="zh">${word.zh}</p>
    <p class="example">${word.example}</p><span class="gender-pill ${genderClass(word.gender)}">${word.gender}</span>
  </article>`;
}
function renderWords() {
  const words = allWords.filter(word => word.topic === activeTopic);
  $('#wordGrid').innerHTML = words.slice(0,wordLimit).map(wordCard).join('');
  $('#visibleWordCount').textContent = words.length;
  $('#loadMoreWords').hidden = wordLimit >= words.length;
  $$('#topicTabs button').forEach(button => button.classList.toggle('active',button.dataset.topic === activeTopic));
}
function speak(text) {
  if (!window.offlineGermanAudio?.has(text)) {
    console.warn('Offline German audio is unavailable for:',text);
    return;
  }
  window.offlineGermanAudio.play(text).catch(error => console.warn(error.message));
}
function openWord(key) {
  const word = allWords.find(item => item.key === key);
  if (!word) return;
  $('#wordDetail').innerHTML = `
    <p class="detail-topic">${topicMeta[word.topic].label.toUpperCase()}</p>
    <h2>${word.word}</h2><span class="detail-gender">${word.gender} · ${word.gender === 'der' ? '阳性' : word.gender === 'die' ? '阴性' : '中性'}</span>
    <div class="detail-translation"><b>EN</b><span>${word.en}</span><b>中</b><span>${word.zh}</span></div>
    <h4>IM SATZ · 例句</h4><div class="detail-example"><strong>„${word.example}“</strong><span>${word.exampleZh}</span></div>
    <h4>记忆方式</h4><p>${genderHint(word)}</p>
    <button class="detail-speak" data-speak="${word.word}">◖ 听德语发音</button>`;
  $('#wordModal').hidden = false;
}
function genderHint(word) {
  const noun = word.word.toLowerCase();
  if (word.gender === 'die' && /(ung|heit|keit|schaft|tion|ik|enz)$/.test(noun)) return `看到词尾就联想到 die：<b>${word.word}</b>。把冠词和名词一起念三遍。`;
  if (word.gender === 'das' && /(chen|lein|ment|um|ing)$/.test(noun)) return `这个词的结尾常提示中性。整体记忆：<b>${word.word}</b>。`;
  if (word.gender === 'der' && /(er|ling|ismus|or)$/.test(noun)) return `这个词的结尾常见于阳性名词。整体记忆：<b>${word.word}</b>。`;
  return `没有可靠词尾规则时，不猜。直接把 <b>${word.word}</b> 当作一个完整词组记住。`;
}

function makeGenderQuestion(word) {
  const memoryTip = genderHint(word).replace(/<[^>]+>/g,'');
  return {
    id:`gender-${word.key}`, type:'gender', category:'词性 · GENUS',
    prompt:`___ ${word.word.replace(/^(der|die|das)\s+/,'')}`,
    context:`选择正确冠词。${word.en} · ${word.zh}`,
    translationEn:`Choose the correct German gender article for “${word.en}”.`,
    options:['der','die','das'].map(value => ({value,label:value,sub:value === 'der' ? '阳性' : value === 'die' ? '阴性' : '中性'})),
    answer:word.gender,
    explanation:memoryTip,
    memoryTip,
    wordKey:word.key, speak:word.word
  };
}
function makeVocabQuestion(word, pool) {
  const wordIndex = pool.findIndex(item => item.key === word.key);
  const distractors = [1,7,19].map(offset => pool[(wordIndex + offset) % pool.length]);
  const options = shuffle([word,...distractors]).map(item => ({value:item.key,label:item.en,sub:item.zh}));
  return {
    id:`vocab-${word.key}`, type:word.topic === 'music' ? 'music' : 'interest',
    category:word.topic === 'music' ? 'KLANGWORT · 专业词汇' : `${topicMeta[word.topic].short.toUpperCase()} · 兴趣词汇`,
    prompt:word.word, context:'选择最准确的英文和中文意思。',
    translationEn:'Choose the most accurate English meaning of this German word.',
    options, answer:word.key,
    explanation:`${word.word} = ${word.en} = ${word.zh}`,
    wordKey:word.key, speak:word.word
  };
}
const genderBank = allWords.map(makeGenderQuestion);
const musicBank = allWords.filter(word => word.topic === 'music').map(word => makeVocabQuestion(word,allWords.filter(item => item.topic === 'music')));
const interestWords = allWords.filter(word => word.topic !== 'music');
const interestBank = interestWords.map(word => makeVocabQuestion(word,interestWords.filter(item => item.topic === word.topic)));
const fullBank = [...genderBank,...articleBank,...adjectiveBank,...caseQuestions,...musicBank,...interestBank];

function take(pool,count) {
  if (!pool.length) return [];
  const mixed = shuffle(pool);
  return Array.from({length:count},(_,index) => ({...mixed[index % mixed.length]}));
}
function buildRound(mode) {
  if (mode === 'gender') return take(genderBank,20);
  if (mode === 'articles') return take(articleBank,20);
  if (mode === 'adjectives') return take(adjectiveBank,20);
  if (mode === 'cases') return take(caseQuestions,20);
  if (mode === 'music') return take(musicBank,18);
  if (mode === 'interests') return take(interestBank,18);
  if (mode === 'mock') return shuffle([
    ...take(genderBank,6),...take(articleBank,6),...take(adjectiveBank,6),...take(caseQuestions,6),...take(musicBank,3),...take(interestBank,3)
  ]);
  if (mode === 'mistakes') {
    const wrong = fullBank.filter(question => state.mistakes.includes(question.id));
    return take(wrong.length ? wrong : [...genderBank,...articleBank,...adjectiveBank,...caseQuestions],Math.min(Math.max(wrong.length,12),24));
  }
  return shuffle([
    ...take(genderBank,3),...take(articleBank,3),...take(adjectiveBank,3),...take(caseQuestions,2),...take(musicBank,2),...take(interestBank,2)
  ]);
}
function startRound(mode) {
  roundMode = mode;
  round = buildRound(mode);
  roundIndex = 0;
  roundCorrect = 0;
  roundResults = [];
  retryCount = 0;
  $('#resultScreen').hidden = true;
  $('#trainer').hidden = false;
  document.body.classList.add('training-active');
  renderQuestion();
}
function renderQuestion() {
  const question = round[roundIndex];
  selectedAnswer = null;
  answerChecked = false;
  $('#questionCategory').textContent = question.category;
  $('#questionPrompt').textContent = question.prompt;
  $('#questionEnglish').textContent = `EN · ${question.translationEn}`;
  $('#questionContext').textContent = question.context;
  $('#trainerPosition').textContent = `${roundIndex + 1} / ${round.length}`;
  $('#trainerProgress').style.width = `${roundIndex / round.length * 100}%`;
  $('#streakDisplay').textContent = state.streak;
  $('#confirmAnswer').disabled = true;
  $('#confirmAnswer').textContent = '确定';
  $('#questionFeedback').className = 'question-feedback';
  $('#questionFeedback').innerHTML = '';
  $('#speakQuestion').hidden = !question.speak;
  $('#speakQuestion').dataset.speak = question.speak || '';
  $('#choiceGrid').innerHTML = question.options.map((option,index) =>
    `<button class="choice" data-value="${option.value}"><b>${index + 1}. ${option.label}</b>${option.sub ? `<small>${option.sub}</small>` : ''}</button>`
  ).join('');
}
function selectChoice(button) {
  if (answerChecked) return;
  selectedAnswer = button.dataset.value;
  $$('#choiceGrid .choice').forEach(choice => choice.classList.toggle('selected',choice === button));
  $('#confirmAnswer').disabled = false;
}
function answerLabel(question,value) {
  return question.options.find(option => option.value === value)?.label || value;
}
function gradeAnswer() {
  if (answerChecked) {
    roundIndex += 1;
    if (roundIndex >= round.length) finishRound();
    else renderQuestion();
    return;
  }
  if (selectedAnswer === null) return;
  const question = round[roundIndex];
  const correct = selectedAnswer === question.answer;
  answerChecked = true;
  state.answered += 1;
  state.todayAnswered += 1;
  if (correct) {
    roundCorrect += 1;
    state.correct += 1;
    state.todayCorrect += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak,state.streak);
    state.mistakes = state.mistakes.filter(id => id !== question.id);
    if (question.wordKey) {
      state.wordScores[question.wordKey] = (state.wordScores[question.wordKey] || 0) + 1;
      if (state.wordScores[question.wordKey] >= 2 && !state.mastered.includes(question.wordKey)) state.mastered.push(question.wordKey);
    }
  } else {
    state.streak = 0;
    if (!state.mistakes.includes(question.id)) state.mistakes.push(question.id);
    if (roundMode !== 'mock' && !question.retry && retryCount < 5) {
      round.push({...question,retry:true});
      retryCount += 1;
    }
  }
  roundResults.push({type:question.type,correct});
  saveState();
  $('#streakDisplay').textContent = state.streak;
  $('#trainerProgress').style.width = `${(roundIndex + 1) / round.length * 100}%`;
  $$('#choiceGrid .choice').forEach(choice => {
    if (choice.dataset.value === question.answer) choice.classList.add('correct');
    else if (choice.dataset.value === selectedAnswer) choice.classList.add('wrong');
  });
  const feedback = $('#questionFeedback');
  feedback.className = `question-feedback show ${correct ? 'correct' : 'wrong'}`;
  const memoryMethod = !correct && question.memoryTip
    ? `<span class="memory-method"><strong>背记方法 · MEMORY</strong>${question.memoryTip}</span>`
    : '';
  feedback.innerHTML = correct
    ? `<b>Richtig · 答对了</b>${question.explanation}`
    : `<b>正确答案：${answerLabel(question,question.answer)}</b>${question.explanation}${memoryMethod}${roundMode !== 'mock' && !question.retry ? ' 这道题会在本轮末尾再出现。' : ''}`;
  $('#confirmAnswer').textContent = roundIndex === round.length - 1 ? '查看结果' : '下一题';
}
function finishRound() {
  $('#trainer').hidden = true;
  $('#resultScreen').hidden = false;
  const total = roundResults.length;
  const accuracy = total ? Math.round(roundCorrect / total * 100) : 0;
  const passed = roundMode !== 'mock' || accuracy >= 90;
  $('#resultSymbol').textContent = passed ? '✓' : '↻';
  $('#resultSymbol').style.background = passed ? 'var(--lime)' : '#f5d7cc';
  $('#resultKicker').textContent = roundMode === 'mock' ? 'PRÜFUNGSERGEBNIS' : 'TRAINING BEENDET';
  $('#resultTitle').textContent = roundMode === 'mock' ? (passed ? '模拟考试通过' : '还差一点，再刷一次') : '完成这一轮';
  $('#resultScore').textContent = `${roundCorrect} / ${total}`;
  $('#resultCopy').textContent = roundMode === 'mock'
    ? `正确率 ${accuracy}%，${passed ? '达到 90% 及格线。' : '需要 90% 才能通过。错题已经进入错题本。'}`
    : `${accuracy}% 正确率。${state.mistakes.length ? `目前还有 ${state.mistakes.length} 道错题待消灭。` : '错题已经清空。'}`;
  const groups = [
    ['词性',roundResults.filter(item => item.type === 'gender')],
    ['冠词',roundResults.filter(item => item.type === 'article')],
    ['形容词',roundResults.filter(item => item.type === 'adjective')],
    ['四格',roundResults.filter(item => item.type === 'case')],
    ['词汇',roundResults.filter(item => item.type === 'music' || item.type === 'interest')]
  ].filter(([,items]) => items.length);
  $('#resultBreakdown').innerHTML = groups.map(([label,items]) =>
    `<span><b>${items.filter(item => item.correct).length}/${items.length}</b>${label}</span>`
  ).join('');
  $('#trainMistakes').disabled = !state.mistakes.length;
}
function exitRound() {
  $('#trainer').hidden = true;
  $('#resultScreen').hidden = true;
  document.body.classList.remove('training-active');
}

function searchWords(query='') {
  const q = query.trim().toLowerCase();
  const results = allWords.filter(word => `${word.word} ${word.en} ${word.zh}`.toLowerCase().includes(q));
  $('#searchResults').innerHTML = results.length
    ? results.slice(0,30).map(word => `<button class="search-result" data-result="${word.key}"><b>${word.word}</b><span>${word.en} · ${word.zh}</span></button>`).join('')
    : '<p class="search-empty">没有找到这个词。</p>';
}
function activateNav(hash) {
  $$('.nav-item').forEach(item => {
    const active = item.getAttribute('href') === hash;
    item.classList.toggle('active',active);
    if (active) item.setAttribute('aria-current','page'); else item.removeAttribute('aria-current');
  });
}
function syncNav() {
  const marker = window.scrollY + Math.min(window.innerHeight * .28,180);
  let active = '#home';
  ['#gender','#cases','#words','#exam','#goethe'].forEach(hash => {
    const section = $(hash);
    if (section && section.getBoundingClientRect().top + window.scrollY <= marker) active = hash;
  });
  activateNav(active);
}

renderWords();
updateDashboard();

document.addEventListener('click',event => {
  const speakButton = event.target.closest('[data-speak]');
  if (speakButton) { event.stopPropagation(); speak(speakButton.dataset.speak); return; }
  const startButton = event.target.closest('[data-start]');
  if (startButton) { startRound(startButton.dataset.start); return; }
  const jumpButton = event.target.closest('[data-jump]');
  if (jumpButton) {
    if (jumpButton.dataset.topic) { activeTopic = jumpButton.dataset.topic; wordLimit = 9; renderWords(); }
    $(jumpButton.dataset.jump)?.scrollIntoView({behavior:'smooth'});
    return;
  }
  const wordCardElement = event.target.closest('.word-card');
  if (wordCardElement) { openWord(wordCardElement.dataset.word); return; }
  const result = event.target.closest('[data-result]');
  if (result) { $('#searchModal').hidden = true; openWord(result.dataset.result); }
});
$('#topicTabs').addEventListener('click',event => {
  const button = event.target.closest('[data-topic]');
  if (!button) return;
  activeTopic = button.dataset.topic;
  wordLimit = 9;
  renderWords();
});
$('#loadMoreWords').addEventListener('click',() => { wordLimit += 9; renderWords(); });
$('#choiceGrid').addEventListener('click',event => {
  const choice = event.target.closest('.choice');
  if (choice) selectChoice(choice);
});
$('#confirmAnswer').addEventListener('click',gradeAnswer);
$('#exitTrainer').addEventListener('click',exitRound);
$('#repeatTraining').addEventListener('click',() => startRound(roundMode));
$('#trainMistakes').addEventListener('click',() => startRound('mistakes'));
$('#closeResult').addEventListener('click',exitRound);
$('#closeWord').addEventListener('click',() => { $('#wordModal').hidden = true; });
$('#wordModal').addEventListener('click',event => { if (event.target === $('#wordModal')) $('#wordModal').hidden = true; });
$('#globalSearch').addEventListener('click',() => {
  $('#searchModal').hidden = false;
  $('#searchInput').value = '';
  searchWords();
  setTimeout(() => $('#searchInput').focus(),50);
});
$('#closeSearch').addEventListener('click',() => { $('#searchModal').hidden = true; });
$('#searchModal').addEventListener('click',event => { if (event.target === $('#searchModal')) $('#searchModal').hidden = true; });
$('#searchInput').addEventListener('input',event => searchWords(event.target.value));
const isAppleMobile = /iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
if (isAppleMobile && !isStandalone) $('#iosInstallButton').hidden = false;
if (isStandalone) document.body.classList.add('standalone-mode');
$('#iosInstallButton').addEventListener('click',() => { $('#installModal').hidden = false; });
$('#closeInstall').addEventListener('click',() => { $('#installModal').hidden = true; });
$('#installDone').addEventListener('click',() => { $('#installModal').hidden = true; });
$('#installModal').addEventListener('click',event => { if (event.target === $('#installModal')) $('#installModal').hidden = true; });
$$('.nav-item').forEach(item => item.addEventListener('click',() => activateNav(item.getAttribute('href'))));
let scrollFrame = 0;
window.addEventListener('scroll',() => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => { syncNav(); scrollFrame = 0; });
},{passive:true});
document.addEventListener('keydown',event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    $('#globalSearch').click();
  }
  if (!$('#trainer').hidden && /^[1-4]$/.test(event.key) && !answerChecked) {
    const choices = $$('#choiceGrid .choice');
    const choice = choices[Number(event.key)-1];
    if (choice) selectChoice(choice);
  }
  if (!$('#trainer').hidden && event.key === 'Enter' && !$('#confirmAnswer').disabled) gradeAnswer();
  if (event.key === 'Escape') {
    if (!$('#searchModal').hidden) $('#searchModal').hidden = true;
    else if (!$('#wordModal').hidden) $('#wordModal').hidden = true;
    else if (!$('#installModal').hidden) $('#installModal').hidden = true;
  }
});

let offlineReady = false;
const OFFLINE_CACHE_NAME = 'mein-deutsch-v13';
const OFFLINE_READY_MARKER = './offline-ready-v13';
let workerRefreshing = false;
let workerRegistration = null;
let offlineAudioCompleted = 0;
let offlineAudioTotal = window.OFFLINE_AUDIO_SOURCES?.length || 0;
let offlineRetryTimer = 0;
async function hasOfflineCache() {
  if (!('caches' in window) || !await caches.has(OFFLINE_CACHE_NAME)) return false;
  const cache = await caches.open(OFFLINE_CACHE_NAME);
  return Boolean(await cache.match(OFFLINE_READY_MARKER));
}
function updateNetworkStatus() {
  const status = $('#networkStatus');
  status.classList.toggle('ready',offlineReady);
  status.classList.toggle('offline',!navigator.onLine);
  if (offlineReady) {
    status.textContent = navigator.onLine ? '已缓存 · 题库与语音可完全离线' : '离线模式 · 题库与语音可用';
  } else if (!navigator.onLine) {
    status.textContent = `离线语音尚未完整 · 已保存 ${offlineAudioCompleted}/${offlineAudioTotal}`;
  } else {
    status.textContent = `正在续传离线语音 · ${offlineAudioCompleted}/${offlineAudioTotal}`;
  }
}
async function requestOfflineAudioCache() {
  clearTimeout(offlineRetryTimer);
  offlineReady = await hasOfflineCache();
  if (offlineReady) {
    window.offlineGermanAudio?.preload();
    updateNetworkStatus();
    return;
  }
  updateNetworkStatus();
  if (!navigator.onLine || !workerRegistration) return;
  const worker = navigator.serviceWorker.controller || workerRegistration.active;
  worker?.postMessage({type:'CACHE_OFFLINE_AUDIO'});
  offlineRetryTimer = window.setTimeout(requestOfflineAudioCache,15000);
}
navigator.serviceWorker?.addEventListener('message',event => {
  if (!event.data?.type?.startsWith('OFFLINE_AUDIO_')) return;
  offlineAudioCompleted = event.data.completed ?? offlineAudioCompleted;
  offlineAudioTotal = event.data.total ?? offlineAudioTotal;
  if (event.data.type === 'OFFLINE_AUDIO_READY') {
    offlineReady = true;
    clearTimeout(offlineRetryTimer);
    window.offlineGermanAudio?.preload();
  }
  updateNetworkStatus();
});
window.addEventListener('online',() => { updateNetworkStatus(); requestOfflineAudioCache(); });
window.addEventListener('offline',updateNetworkStatus);
updateNetworkStatus();
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.addEventListener('controllerchange',async () => {
    offlineReady = await hasOfflineCache();
    updateNetworkStatus();
    if (!workerRefreshing) {
      workerRefreshing = true;
      window.location.reload();
    }
  });
  navigator.serviceWorker.register('./service-worker.js',{updateViaCache:'none'})
    .then(registration => registration.update().catch(() => {}).then(() => registration))
    .then(() => navigator.serviceWorker.ready)
    .then(async registration => {
      workerRegistration = registration;
      await requestOfflineAudioCache();
    })
    .catch(() => { $('#networkStatus').textContent = '离线缓存尚未完成'; });
} else {
  $('#networkStatus').textContent = '请通过正式网址安装离线版';
}
