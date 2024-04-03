//Changing gif while hovering on a button
const img = document.getElementById('image');

const images = {
    love: "../Assets/love.gif",
    depressed: '../Assets/depressed.gif',
    ori: "../Assets/handsome.gif"
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
    window.location.href = "../Page 5/yes.html";
}
function noFunction() {
    window.location.href = "../Page 6/no1.html";
}