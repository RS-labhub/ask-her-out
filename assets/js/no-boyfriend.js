//Integrating Flagsmith
function enabledarkmode() {
    document.body.style.filter = "invert(1)"
  }
  async function checkDark() {
    // init flagsmith
    await flagsmith.init({
      environmentID: environment_id
    });
    const is_dark = flagsmith.getValue("dark_mode", {
      fallback: false
    });
    console.log("[FLAGSMITH] Is dark mode enabled:- ", is_dark)
    if (!is_dark) return;
    if (is_dark) {
      enabledarkmode()
    }
  }
  checkDark()

var pos = document.documentElement;
pos.addEventListener('mousemove', e =>{pos.style.setProperty('--x',e.clientX + 'px')
pos.style.setProperty('--y',e.clientY + 'px')})

pos.addEventListener('touchmove', e => {
    const t = e.touches[0];
    pos.style.setProperty('--x', t.clientX + 'px');
    pos.style.setProperty('--y', t.clientY + 'px');
}, { passive: true });

window.addEventListener('DOMContentLoaded', () => {
    if (!window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    const btn = document.querySelector('section .btn');
    const r = btn.getBoundingClientRect();
    pos.style.setProperty('--x', r.left + r.width / 2 + 'px');
    pos.style.setProperty('--y', r.top + r.height / 2 + 'px');
});


//Linking to Yes page
function myFunction() {
    window.location.href = "no-final.html";
}