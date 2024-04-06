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


//Linking to Yes page
function myFunction() {
    window.location.href = "../Page 8/no3.html";
}