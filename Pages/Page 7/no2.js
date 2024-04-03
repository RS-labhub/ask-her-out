var pos = document.documentElement;
pos.addEventListener('mousemove', e =>{pos.style.setProperty('--x',e.clientX + 'px')
pos.style.setProperty('--y',e.clientY + 'px')})


//Linking to Yes page
function myFunction() {
    window.location.href = "../Page 8/no3.html";
}