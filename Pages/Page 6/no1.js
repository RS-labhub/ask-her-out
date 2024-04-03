//Making bg
function lines(){
    let sizeW = Math.random() * 12;
    let duration = Math.random() * 3;
    let e = document. createElement('div');
    e.setAttribute('class', 'circle');
    document.body.appendChild(e);
    e.style.width = 2*sizeW + 'px';
    e.style.left = Math.random() * + innerWidth + 'px';
    e.style.animationDuration = 2 + duration + 's';
    setTimeout(function(){
        document.body.removeChild(e)
    }, 4000);
}

setInterval(function(){
    lines();
}, 200);

//Linking to Yes and page
function yesFunction() {
    window.location.href = "../Page 7/no2.html";
}
function noFunction() {
    window.location.href = "../Page 5/yes.html";
}