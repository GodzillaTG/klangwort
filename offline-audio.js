(() => {
  const manifest = window.OFFLINE_AUDIO_MANIFEST || {};
  const sources = window.OFFLINE_AUDIO_SOURCES || [...new Set(Object.values(manifest).map(entry => entry.src))];
  const decoded = new Map();
  const decoding = new Map();
  let context = null;
  let activeSource = null;
  let activeFallback = null;
  let requestId = 0;
  const appleMobile = /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  function normalize(text) {
    return String(text || '').trim();
  }

  function report(state, detail = {}) {
    window.dispatchEvent(new CustomEvent('offline-audio-status', { detail: { state, ...detail } }));
  }

  function stopActive() {
    if (activeSource) {
      try { activeSource.stop(); } catch {}
      activeSource.disconnect();
    }
    if (activeFallback) {
      activeFallback.pause();
      activeFallback.removeAttribute('src');
      activeFallback.load();
    }
    activeSource = null;
    activeFallback = null;
  }

  function stop() {
    requestId += 1;
    stopActive();
    report('idle');
  }

  function audioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!context || context.state === 'closed') context = new AudioContextClass();
    return context;
  }

  function decodeAudioData(audioContextInstance, bytes) {
    return new Promise((resolve, reject) => {
      let settled = false;
      const succeed = buffer => {
        if (settled) return;
        settled = true;
        resolve(buffer);
      };
      const fail = error => {
        if (settled) return;
        settled = true;
        reject(error || new Error('Audio decoding failed.'));
      };
      try {
        const result = audioContextInstance.decodeAudioData(bytes, succeed, fail);
        if (result?.then) result.then(succeed, fail);
      } catch (error) {
        fail(error);
      }
    });
  }

  async function loadBuffer(src, audioContextInstance) {
    if (decoded.has(src)) return decoded.get(src);
    if (decoding.has(src)) return decoding.get(src);

    const pending = (async () => {
      const response = await fetch(src, { cache: 'force-cache', credentials: 'same-origin' });
      if (!response.ok || response.redirected) throw new Error(`Audio file could not be loaded (${response.status}).`);
      const buffer = await decodeAudioData(audioContextInstance, await response.arrayBuffer());
      decoded.set(src, buffer);
      return buffer;
    })().finally(() => decoding.delete(src));

    decoding.set(src, pending);
    return pending;
  }

  async function playWithWebAudio(entry, text, currentRequest) {
    const audioContextInstance = audioContext();
    if (!audioContextInstance) return false;

    // Start resume() inside the tap event. iOS Safari requires this explicit user action.
    const resumePromise = audioContextInstance.state === 'suspended'
      ? audioContextInstance.resume()
      : Promise.resolve();
    report('loading', { text });
    await resumePromise;
    const buffer = await loadBuffer(entry.src, audioContextInstance);
    if (currentRequest !== requestId) throw new DOMException('Playback was replaced.','AbortError');
    if (audioContextInstance.state === 'suspended') await audioContextInstance.resume();

    const source = audioContextInstance.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextInstance.destination);
    const offset = Math.max(0, Math.min(entry.start, buffer.duration));
    const duration = Math.max(0.05, Math.min(entry.duration, buffer.duration - offset));
    activeSource = source;
    source.onended = () => {
      if (activeSource !== source) return;
      source.disconnect();
      activeSource = null;
      report('idle', { text });
    };
    source.start(0, offset, duration);
    report('playing', { text, duration });
    return true;
  }

  async function playWithElement(entry, text, currentRequest) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.playsInline = true;
    audio.setAttribute('playsinline','');
    audio.src = entry.src;
    activeFallback = audio;
    report('loading', { text });

    const needsSeek = entry.start > 0.01;
    audio.muted = needsSeek;
    const metadataReady = needsSeek && audio.readyState < 1
      ? new Promise((resolve, reject) => {
          audio.addEventListener('loadedmetadata', resolve, { once: true });
          audio.addEventListener('error', () => reject(new Error('Audio file could not be loaded.')), { once: true });
        })
      : Promise.resolve();
    // Call play() before the first await so iPhone sees it as part of the user's tap.
    const playbackStarted = audio.play();
    if (needsSeek) {
      await metadataReady;
      audio.currentTime = entry.start;
      audio.muted = false;
    }
    await playbackStarted;
    if (currentRequest !== requestId) throw new DOMException('Playback was replaced.','AbortError');
    report('playing', { text, duration: entry.duration });
    window.setTimeout(() => {
      if (activeFallback !== audio) return;
      audio.pause();
      activeFallback = null;
      report('idle', { text });
    }, Math.ceil(entry.duration * 1000));
  }

  async function play(text) {
    const normalized = normalize(text);
    const entry = manifest[normalized];
    if (!entry) {
      const error = new Error(`Offline audio is missing: ${text}`);
      report('error', { text, message: error.message });
      throw error;
    }

    const currentRequest = ++requestId;
    stopActive();
    try {
      const useMediaElement = appleMobile || entry.src.includes('/goethe-');
      if (useMediaElement) {
        await playWithElement(entry, normalized, currentRequest);
      } else {
        const usedWebAudio = await playWithWebAudio(entry, normalized, currentRequest);
        if (!usedWebAudio) await playWithElement(entry, normalized, currentRequest);
      }
    } catch (error) {
      if (error?.name === 'AbortError') throw error;
      if (currentRequest === requestId) stopActive();
      const friendly = new Error('语音加载失败，请再点一次重试。');
      friendly.cause = error;
      report('error', { text: normalized, message: friendly.message });
      throw friendly;
    }
  }

  // Files are already cached by the service worker. Avoid opening 33 media players at once on iPhone.
  function preload() {
    return Promise.resolve();
  }

  window.offlineGermanAudio = {
    play,
    stop,
    preload,
    has: text => Boolean(manifest[normalize(text)]),
    count: Object.keys(manifest).length,
    sourceCount: sources.length,
    mode: appleMobile ? 'html-audio' : (window.AudioContext || window.webkitAudioContext) ? 'web-audio' : 'html-audio'
  };
})();
