const majorKeys = [
  ["C大调",["C","D","E","F","G","A","B"],"无升降号"],
  ["G大调",["G","A","B","C","D","E","F#"],"1个升号"],
  ["D大调",["D","E","F#","G","A","B","C#"],"2个升号"],
  ["A大调",["A","B","C#","D","E","F#","G#"],"3个升号"],
  ["E大调",["E","F#","G#","A","B","C#","D#"],"4个升号"],
  ["B大调",["B","C#","D#","E","F#","G#","A#"],"5个升号"],
  ["F#大调",["F#","G#","A#","B","C#","D#","E#"],"6个升号"],
  ["C#大调",["C#","D#","E#","F#","G#","A#","B#"],"7个升号"],
  ["F大调",["F","G","A","Bb","C","D","E"],"1个降号"],
  ["Bb大调",["Bb","C","D","Eb","F","G","A"],"2个降号"],
  ["Eb大调",["Eb","F","G","Ab","Bb","C","D"],"3个降号"],
  ["Ab大调",["Ab","Bb","C","Db","Eb","F","G"],"4个降号"],
  ["Db大调",["Db","Eb","F","Gb","Ab","Bb","C"],"5个降号"],
  ["Gb大调",["Gb","Ab","Bb","Cb","Db","Eb","F"],"6个降号"],
  ["Cb大调",["Cb","Db","Eb","Fb","Gb","Ab","Bb"],"7个降号"]
].map(([name,scale,signature])=>({name,scale,signature}));

const minorKeys = [
  ["a小调",["A","B","C","D","E","F","G"],"无升降号"],
  ["e小调",["E","F#","G","A","B","C","D"],"1个升号"],
  ["b小调",["B","C#","D","E","F#","G","A"],"2个升号"],
  ["f#小调",["F#","G#","A","B","C#","D","E"],"3个升号"],
  ["c#小调",["C#","D#","E","F#","G#","A","B"],"4个升号"],
  ["g#小调",["G#","A#","B","C#","D#","E","F#"],"5个升号"],
  ["d#小调",["D#","E#","F#","G#","A#","B","C#"],"6个升号"],
  ["a#小调",["A#","B#","C#","D#","E#","F#","G#"],"7个升号"],
  ["d小调",["D","E","F","G","A","Bb","C"],"1个降号"],
  ["g小调",["G","A","Bb","C","D","Eb","F"],"2个降号"],
  ["c小调",["C","D","Eb","F","G","Ab","Bb"],"3个降号"],
  ["f小调",["F","G","Ab","Bb","C","Db","Eb"],"4个降号"],
  ["bb小调",["Bb","C","Db","Eb","F","Gb","Ab"],"5个降号"],
  ["eb小调",["Eb","F","Gb","Ab","Bb","Cb","Db"],"6个降号"],
  ["ab小调",["Ab","Bb","Cb","Db","Eb","Fb","Gb"],"7个降号"]
].map(([name,scale,signature])=>({name,scale,signature}));

const naturalPitch = {C:0,D:2,E:4,F:5,G:7,A:9,B:11};
const letters = ["C","D","E","F","G","A","B"];
const chromatic = ["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"];
const source = "依据两本指定教材知识点编写的原创参数化变式";
const answerStatus = "程序规则校验的整理答案";

function accidentalValue(note) {
  return [...note.slice(1)].reduce((sum,char)=>sum+(char==="#"?1:-1),0);
}

function pitchClass(note) {
  return (naturalPitch[note[0]] + accidentalValue(note) + 24) % 12;
}

function alter(note, amount) {
  const value = accidentalValue(note) + amount;
  return note[0] + (value > 0 ? "#".repeat(value) : "b".repeat(-value));
}

function rotate(items, amount) {
  const n = amount % items.length;
  return [...items.slice(n), ...items.slice(0,n)];
}

function hash(text) {
  return [...text].reduce((sum,char)=>sum+char.charCodeAt(0),0);
}

function uniqueOptions(correct, wrong, size = 4) {
  const pool = [...new Set([correct,...wrong])];
  if (pool.length < size) throw new Error(`选项不足：${correct}`);
  return rotate(pool.slice(0,size), hash(correct));
}

function choice(id, topic, prompt, correct, wrong, lessonId, steps) {
  const options = uniqueOptions(correct, wrong);
  return {id,type:"choice",topic,prompt,options,answer:options.indexOf(correct),lessonId,steps,trap:"先按结构规则计算，再核对音名拼写。",source,answerStatus};
}

function multi(id, topic, prompt, correct, wrong, lessonId, steps) {
  const tagged = [...new Set([...correct,...wrong])].map(value=>({value,correct:correct.includes(value)}));
  const options = rotate(tagged, hash(id)).map(item=>item.value);
  const answer = options.map((value,index)=>correct.includes(value)?index:-1).filter(index=>index>=0);
  return {id,type:"multi",topic,prompt,options,answer,lessonId,steps,trap:"本题可能有多个正确答案，需逐项判断。",source,answerStatus};
}

function spellInterval(root, degree, semitones) {
  const letter = letters[(letters.indexOf(root[0]) + degree - 1) % 7];
  const desired = (pitchClass(root) + semitones) % 12;
  let accidental = (desired - naturalPitch[letter] + 12) % 12;
  if (accidental > 6) accidental -= 12;
  if (Math.abs(accidental) > 2) throw new Error(`无法用重升重降以内拼写 ${root} 的 ${degree} 度`);
  return letter + (accidental > 0 ? "#".repeat(accidental) : "b".repeat(-accidental));
}

export function generateQuestionBank(lessons) {
  const bank = [];
  const add = question => bank.push(question);

  for (const [family,keys] of [["major",majorKeys],["minor",minorKeys]]) {
    for (const key of keys) for (let degree=0; degree<7; degree+=1) {
      add(choice(`gen-${family}-degree-${key.name}-${degree+1}`,"调式调性",`${key.name}的第${degree+1}级音是？`,key.scale[degree],key.scale.filter((_,i)=>i!==degree),"lesson-major-minor",[`按${key.name}音阶依次排列七个音级。`,`第${degree+1}级是 ${key.scale[degree]}。`]));
    }
  }

  for (const [index,key] of majorKeys.entries()) {
    add(choice(`gen-major-signature-${index}`,"调式调性",`${key.name}使用什么调号？`,key.signature,majorKeys.map(item=>item.signature).filter(value=>value!==key.signature),"lesson-major-minor",[`按五度圈确认${key.name}的调号。`,`答案为${key.signature}。`]));
    add(choice(`gen-relative-minor-${index}`,"调式调性",`${key.name}的关系小调是？`,minorKeys[index].name,minorKeys.map(item=>item.name).filter(value=>value!==minorKeys[index].name),"lesson-key-relation",["关系大小调共享调号。",`${key.name}与${minorKeys[index].name}调号相同。`]));
  }

  for (const [index,key] of minorKeys.entries()) {
    add(choice(`gen-minor-signature-${index}`,"调式调性",`${key.name}使用什么调号？`,key.signature,minorKeys.map(item=>item.signature).filter(value=>value!==key.signature),"lesson-major-minor",[`按其关系大调${majorKeys[index].name}确认调号。`,`答案为${key.signature}。`]));
    add(choice(`gen-relative-major-${index}`,"调式调性",`${key.name}的关系大调是？`,majorKeys[index].name,majorKeys.map(item=>item.name).filter(value=>value!==majorKeys[index].name),"lesson-key-relation",["关系大小调共享调号。",`${key.name}与${majorKeys[index].name}调号相同。`]));
    const raisedSixth = alter(key.scale[5],1);
    const raisedSeventh = alter(key.scale[6],1);
    add(choice(`gen-harmonic-minor-${index}`,"调式调性",`${key.name}写成和声小调时，第七级应写为？`,raisedSeventh,[key.scale[6],raisedSixth,key.scale[5]],"lesson-major-minor",["和声小调升高自然小调第七级。",`${key.scale[6]}升高半音得到${raisedSeventh}。`]));
    add(multi(`gen-melodic-minor-${index}`,"调式调性",`${key.name}旋律小调上行相对自然小调升高哪两个音？`,[raisedSixth,raisedSeventh],[key.scale[5],key.scale[6]],"lesson-major-minor",["旋律小调上行升高第六、七级。",`对应音为${raisedSixth}与${raisedSeventh}。`]));
  }

  const triadQualities = ["大三和弦","小三和弦","小三和弦","大三和弦","大三和弦","小三和弦","减三和弦"];
  for (const [keyIndex,key] of majorKeys.entries()) for (let degree=0; degree<7; degree+=1) {
    const notes = [key.scale[degree],key.scale[(degree+2)%7],key.scale[(degree+4)%7]];
    add(choice(`gen-triad-quality-${keyIndex}-${degree}`,"和弦",`在${key.name}中，第${degree+1}级三和弦的性质是？`,triadQualities[degree],["大三和弦","小三和弦","增三和弦","减三和弦"].filter(value=>value!==triadQualities[degree]),"lesson-chord",["按调内音级作三度叠置。",`第${degree+1}级为${triadQualities[degree]}。`]));
    const spellings = Array.from({length:7},(_,other)=>[key.scale[other],key.scale[(other+2)%7],key.scale[(other+4)%7]].join("–"));
    add(choice(`gen-triad-spelling-${keyIndex}-${degree}`,"和弦",`在${key.name}中，第${degree+1}级三和弦的规范拼写是？`,notes.join("–"),spellings.filter(value=>value!==notes.join("–")),"lesson-chord",["从指定音级开始隔级取音。",`规范拼写为${notes.join("–")}。`]));
  }

  const degreeGroups = [[0,1,2],[1,2,3],[2,3,4],[3,4,5],[4,5,6],[0,2,4],[1,3,5]];
  for (const [keyIndex,key] of majorKeys.entries()) for (const degrees of degreeGroups) {
    const correct = degrees.map(degree=>key.scale[degree]);
    const scalePcs = new Set(key.scale.map(pitchClass));
    const wrong = chromatic.filter(note=>!scalePcs.has(pitchClass(note))).slice(0,2);
    add(multi(`gen-scale-multi-${keyIndex}-${degrees.join("-")}`,"调式调性",`下列哪些分别是${key.name}的第${degrees.map(d=>d+1).join("、")}级音？`,correct,wrong,"lesson-major-minor",[`写出${key.name}完整音阶。`,`选出第${degrees.map(d=>d+1).join("、")}级：${correct.join("、")}。`]));
  }

  const intervalSpecs = [[2,1,"小二度"],[2,2,"大二度"],[3,3,"小三度"],[3,4,"大三度"],[4,5,"纯四度"],[4,6,"增四度"],[5,7,"纯五度"],[6,8,"小六度"],[6,9,"大六度"],[7,10,"小七度"]];
  const roots = ["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"];
  for (const root of roots) for (const [degree,semitones,name] of intervalSpecs) {
    const correct = spellInterval(root,degree,semitones);
    const targetLetter = correct[0];
    add(choice(`gen-interval-${root}-${name}`,"音程",`${root}上方的${name}应规范拼写为？`,correct,[alter(targetLetter,-2),alter(targetLetter,-1),targetLetter,alter(targetLetter,1),alter(targetLetter,2),chromatic[pitchClass(correct)]],"lesson-interval",[`先按字母级数确定${degree}度的目标字母。`,`再按${semitones}个半音调整，得到${correct}。`]));
  }

  let transposeCount = 0;
  outer: for (const [sourceIndex,from] of majorKeys.entries()) for (const [targetIndex,to] of majorKeys.entries()) {
    if (sourceIndex===targetIndex) continue;
    for (let degree=0; degree<7; degree+=1) {
      add(choice(`gen-transpose-${sourceIndex}-${targetIndex}-${degree}`,"移调转调",`把${from.name}第${degree+1}级音${from.scale[degree]}按调内级数移至${to.name}，对应音是？`,to.scale[degree],to.scale.filter((_,i)=>i!==degree),"lesson-transpose",["移调后保持调内级数。",`${to.name}第${degree+1}级为${to.scale[degree]}。`]));
      transposeCount += 1;
      if (transposeCount===139) break outer;
    }
  }

  const pentatonicNames = [[0,"宫"],[1,"商"],[2,"角"],[4,"徵"],[5,"羽"]];
  for (const [keyIndex,key] of majorKeys.entries()) for (const [degree,name] of pentatonicNames) {
    add(choice(`gen-pentatonic-${keyIndex}-${name}`,"民族调式",`以${key.scale[0]}为宫构成同宫五声音列，其中${name}音是？`,key.scale[degree],pentatonicNames.filter(item=>item[0]!==degree).map(item=>key.scale[item[0]]),"lesson-pentatonic",["宫、商、角、徵、羽对应大音阶第1、2、3、5、6级。",`${name}音为${key.scale[degree]}。`]));
  }

  const conceptPoints = lessons.flatMap(lesson=>lesson.points.map((point,index)=>({lesson,point,index})));
  for (const [itemIndex,item] of conceptPoints.entries()) {
    const wrong = [1,7,13].map(offset=>conceptPoints[(itemIndex+offset)%conceptPoints.length].point).filter(point=>point!==item.point);
    add(choice(`gen-concept-${item.lesson.id}-${item.index}`,item.lesson.topic,`根据“${item.lesson.title}”知识卡第${item.index+1}个要点，哪项表述与教材整理一致？`,item.point,wrong,item.lesson.id,[`定位“${item.lesson.title}”知识卡。`,item.point]));
  }

  if (bank.length !== 1000) throw new Error(`生成题库数量异常：${bank.length}`);
  return bank;
}

export function withGeneratedQuestions(pack) {
  if (!pack?.private) return pack;
  const generated = generateQuestionBank(pack.lessons);
  const existing = new Set(pack.questions.map(question=>question.id));
  return {...pack,questions:[...pack.questions,...generated.filter(question=>!existing.has(question.id))]};
}
