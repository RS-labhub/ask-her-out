//Changing image
// function hover(element) {
//     element.setAttribute('src', 'Assets/sad.gif');
// }
  
// function unhover(element) {
//     element.setAttribute('src', 'Assets/hi.gif');
// }



//Changing background
// var button = document.getElementById('hover');
// var body = document.body;

// button.onmouseover = function() {
// 	body.className = 'hovered';
// }

// button.onmouseout = function() {
// 	body.className = '';
// }


//Changing gif
const img = document.getElementById('image');

const images = {
    hi: "Pages/Assets/hi.gif",
    ori: "Pages/Assets/sad.gif"
}

function ChangeImage(giphy) {
    img.src = images[giphy];
}
function ResetImage() {
    img.src = images.ori;
};


//Yes button bg image
var body = document.body;

function bg() {
	body.className = 'hovered';
};

function resetBG(){
	body.className = '';
};

//Linking to second page
function myFunction() {
    window.location.href = "Pages/Page 1/secondPage.html";
}