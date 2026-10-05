(function () {
  var SRC = (window.MUSIC_BASE || '') + 'assets/audio/song.mp3';
  var KEY_TIME = 'ily_music_time';
  var KEY_PLAYING = 'ily_music_playing';

  var audio = new Audio();
  audio.loop = true;
  audio.preload = 'none';
  audio.volume = 1;
  audio.setAttribute('playsinline', '');

  var startAt = parseFloat(sessionStorage.getItem(KEY_TIME) || '0') || 0;
  var wantPlay = sessionStorage.getItem(KEY_PLAYING) === '1';
  var ready = false;
  var loading = false;
  var btn = null;
  var seeked = false;
  var waiting = false;

  function seek() {
    if (seeked || startAt <= 0) return;
    seeked = true;
    try { audio.currentTime = startAt; } catch (e) {}
  }

  function paint() {
    if (!btn) return;
    var playing = wantPlay;
    btn.textContent = playing ? '🎵' : '🔇';
    btn.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
    btn.classList.toggle('is-muted', !playing);
    btn.classList.toggle('is-loading', !ready);
  }

  function setReady(value) {
    if (ready === value) return;
    ready = value;
    paint();
  }

  function load() {
    if (loading) return;
    loading = true;
    audio.preload = 'auto';
    audio.src = SRC;
    audio.load();
  }

  function play() {
    var p = audio.play();
    if (p && p.catch) {
      p.catch(function (err) {
        if (err && err.name === 'NotAllowedError') waitForGesture();
      });
    }
  }

  function waitForGesture() {
    if (waiting) return;
    waiting = true;
    var events = ['pointerdown', 'touchend', 'click', 'keydown'];
    function go(e) {
      if (btn && e.target && btn.contains(e.target)) return;
      events.forEach(function (name) { window.removeEventListener(name, go, true); });
      waiting = false;
      if (wantPlay) play();
    }
    events.forEach(function (name) { window.addEventListener(name, go, true); });
  }

  audio.addEventListener('loadedmetadata', seek);
  audio.addEventListener('canplaythrough', function () { setReady(true); });
  audio.addEventListener('playing', function () { setReady(true); });
  audio.addEventListener('waiting', function () { if (loading) setReady(false); });

  audio.addEventListener('timeupdate', function () {
    sessionStorage.setItem(KEY_TIME, String(audio.currentTime));
  });

  window.addEventListener('pagehide', function () {
    sessionStorage.setItem(KEY_TIME, String(audio.currentTime));
  });

  function toggle() {
    wantPlay = !wantPlay;
    sessionStorage.setItem(KEY_PLAYING, wantPlay ? '1' : '0');
    if (wantPlay) {
      load();
      play();
    } else {
      audio.pause();
    }
    paint();
  }

  function mount() {
    if (btn) return;
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'music-toggle';
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggle();
    });
    document.body.appendChild(btn);
    paint();

    if (wantPlay) {
      load();
      play();
    } else if (document.readyState === 'complete') {
      load();
    } else {
      window.addEventListener('load', load);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
