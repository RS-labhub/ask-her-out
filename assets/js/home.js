const img = document.getElementById('image');

const images = {
    hi: "assets/img/hi.gif",
    ori: "assets/img/sad.gif"
};

function ChangeImage(giphy) {
    img.src = images[giphy];
}
function ResetImage() {
    img.src = images.ori;
}

var body = document.body;

function bg() {
    body.className = 'hovered';
}

function resetBG() {
    body.className = '';
}

function myFunction() {
    window.location.href = "pages/compliments.html";
}