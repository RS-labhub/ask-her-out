//Changing gif while hovering on a button
const img = document.getElementById('image');

const images = {
    love: "../assets/img/love.gif",
    depressed: '../assets/img/depressed.gif',
    ori: "../assets/img/handsome.gif"
};

function ChangeImage(giphy) {
    img.src = images[giphy];
}
function ResetImage() {
    img.src = images.ori;
};


//BG image change while hovering on a button
var body = document.body;

function bg1() {
	body.className = 'yess';
};

function bg2() {
	body.className = 'noo';
};

function resetBG(){
	body.className = '';
};

//Linking to Yes and page
function yesFunction() {
    window.location.href = "yes.html";
}
function noFunction() {
    window.location.href = "no-still-hate.html";
}