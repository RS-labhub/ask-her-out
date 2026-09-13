//Changing gif while hovering on a button
const img = document.getElementById('image');

const images = {
    depressed: '../assets/img/attitude.gif',
    ori: "../assets/img/angry.gif"
};

function ChangeImage(giphy) {
    img.src = images[giphy];
}
function ResetImage() {
    img.src = images.ori;
};

//BG image change while hovering on a button
var body = document.body;

function bg2() {
	body.className = 'noo';
};

function resetBG(){
	body.className = '';
};

//Moving button
const buttonHeight = 50;
const buttonWidth = 150;

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


function moveButton() {
    const button = document.getElementById('yes');
    if (!button) return;
    if (button.parentElement !== document.body) document.body.appendChild(button);
    const pad = 12;
    const maxX = Math.max(0, window.innerWidth - button.offsetWidth - pad * 2);
    const maxY = Math.max(0, window.innerHeight - button.offsetHeight - pad * 2);
    button.style.position = 'fixed';
    button.style.margin = '0';
    button.style.left = pad + Math.floor(Math.random() * (maxX + 1)) + 'px';
    button.style.bottom = pad + Math.floor(Math.random() * (maxY + 1)) + 'px';
}

window.addEventListener('DOMContentLoaded', () =>{
    const button = document.getElementById('yes');
    button.addEventListener('touchstart', function (e) {
        e.preventDefault();
        moveButton();
    }, { passive: false });
    window.addEventListener('resize', () => {
        if (button.style.position === 'fixed') moveButton();
    });
});

//BG image change while hovering on a button
var body = document.body;

function bg() {
	body.className = 'noo';
};

function resetBG(){
	body.className = '';
};

//Linking to no page
function noFunction() {
    window.location.href = "yes.html";
}