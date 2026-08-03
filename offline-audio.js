(() => {
  const manifest = window.OFFLINE_AUDIO_MANIFEST || {};
  const sources = window.OFFLINE_AUDIO_SOURCES || [...new Set(Object.values(manifest).map(entry => entry.src))];
  const players = new Map(sources.map(src => {
    const audio = new Audio(src);
    audio.preload = 'none';
    audio.playsInline = true;
    return [src,audio];
  }));
  let active = null;
  let endAt = 0;
  let preloaded = false;

  function normalize(text) {
    return String(text || '').trim();
  }

  function stop() {
    if (active) active.pause();
    active = null;
    endAt = 0;
  }

  function monitor() {
    if (!active) return;
    if (active.currentTime >= endAt || active.ended) {
      stop();
      return;
    }
    requestAnimationFrame(monitor);
  }

  function preload() {
    if (preloaded) return;
    preloaded = true;
    players.forEach(audio => {
      audio.preload = 'metadata';
      audio.load();
    });
  }

  async function play(text) {
    const entry = manifest[normalize(text)];
    if (!entry) throw new Error(`Offline audio is missing: ${text}`);
    stop();
    const audio = players.get(entry.src);
    if (!audio) throw new Error(`Offline audio sprite is missing: ${entry.src}`);

    const begin = () => {
      audio.currentTime = entry.start;
      endAt = entry.start + entry.duration;
      active = audio;
      const promise = audio.play();
      requestAnimationFrame(monitor);
      return promise;
    };

    if (audio.readyState >= 1) return begin();
    return new Promise((resolve,reject) => {
      const onReady = () => Promise.resolve(begin()).then(resolve,reject);
      audio.addEventListener('loadedmetadata',onReady,{once:true});
      audio.addEventListener('error',() => reject(new Error('Offline audio could not be loaded.')),{once:true});
      audio.load();
    });
  }

  window.offlineGermanAudio = { play, stop, preload, has:text => Boolean(manifest[normalize(text)]), count:Object.keys(manifest).length, sourceCount:sources.length };
})();
