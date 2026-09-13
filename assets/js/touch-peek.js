(function () {
  if (!window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

  var PEEK_MS = 3000;


  window.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-peek]').forEach(function (btn) {
      var enter = btn.getAttribute('onmouseover');
      var leave = btn.getAttribute('onmouseout');
      var action = btn.getAttribute('onclick');
      var peeking = false;
      var timer = null;

      btn.removeAttribute('onmouseover');
      btn.removeAttribute('onmouseout');
      btn.onclick = null;

      function reset() {
        clearTimeout(timer);
        peeking = false;
        btn.classList.remove('is-peeking');
        if (leave) new Function(leave).call(btn);
      }

      btn.addEventListener('click', function (e) {
        if (!peeking) {
          e.preventDefault();
          peeking = true;
          btn.classList.add('is-peeking');
          if (enter) new Function(enter).call(btn);
          timer = setTimeout(reset, PEEK_MS);
          return;
        }
        clearTimeout(timer);
        peeking = false;
        btn.classList.remove('is-peeking');
        if (action) new Function(action).call(btn);
      });
    });
  });
})();
