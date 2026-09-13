(function () {
  var SRC = (window.MUSIC_BASE || '') + 'assets/audio/song.mp3';
  var KEY_TIME = 'ily_music_time';
  var KEY_MUTED = 'ily_music_muted';
  var KEY_STARTED = 'ily_music_started';
  var VOLUME = 1;

  var audio = new Audio();
  audio.loop = true;
  audio.preload = 'auto';
  audio.autoplay = true;
  audio.setAttribute('playsinline', '');
  audio.src = SRC;

  var startAt = parseFloat(sessionStorage.getItem(KEY_TIME) || '0') || 0;
  var muted = sessionStorage.getItem(KEY_MUTED) === '1';
  var started = sessionStorage.getItem(KEY_STARTED) === '1';
  var btn = null;
  var seeked = false;

  audio.volume = VOLUME;
  audio.muted = true;

  function seek() {
    if (seeked || startAt <= 0) return;
    seeked = true;
    try { audio.currentTime = startAt; } catch (e) {}
  }

  if (audio.readyState >= 1) seek();
  audio.addEventListener('loadedmetadata', seek);

  audio.addEventListener('timeupdate', function () {
    sessionStorage.setItem(KEY_TIME, String(audio.currentTime));
  });

  window.addEventListener('pagehide', function () {
    sessionStorage.setItem(KEY_TIME, String(audio.currentTime));
  });

  function paint() {
    if (!btn) return;
    btn.textContent = muted ? '🔇' : '🎵';
    btn.setAttribute('aria-label', muted ? 'Unmute music' : 'Mute music');
    btn.classList.toggle('is-muted', muted);
  }

  function play() {
    var p = audio.play();
    if (p && p.catch) p.catch(function () {});
  }

  function sound() {
    seek();
    audio.muted = false;
    audio.volume = VOLUME;
    play();
    sessionStorage.setItem(KEY_STARTED, '1');
    started = true;
  }

  function silence() {
    audio.muted = true;
  }

  function boot() {
    if (muted) { play(); paint(); return; }
    audio.muted = false;
    audio.volume = VOLUME;
    var p = audio.play();
    if (p && p.catch) {
      p.catch(function () {
        audio.muted = true;
        play();
        waitForGesture();
      });
    }
    paint();
  }

  var waiting = false;
  function waitForGesture() {
    if (waiting) return;
    waiting = true;
    var events = ['pointerdown', 'touchstart', 'touchend', 'click', 'keydown', 'scroll'];
    function go() {
      events.forEach(function (e) { window.removeEventListener(e, go, true); });
      waiting = false;
      if (!muted) sound();
    }
    events.forEach(function (e) { window.addEventListener(e, go, true); });
  }

  function toggle() {
    muted = !muted;
    sessionStorage.setItem(KEY_MUTED, muted ? '1' : '0');
    if (muted) silence();
    else sound();
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
    boot();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
