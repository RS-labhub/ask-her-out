function hearts(){
    const creat = document.createElement('div');
    creat.classList.add('hearts');
    creat.innerHTML = '💓';

    creat.style.left = Math.random() * 100 + 'vw';
    creat.style.animationDuration = Math.random() * 3 + 2  + 's';

    document.body.appendChild(creat)
    setTimeout(() => {
        creat.remove();
    }, 3000);
}

setInterval(hearts, 100);

function scrollToBottom() {
    document.querySelector('.screens__track').classList.add('is-revealed');
}


function myFunction() {
    window.location.href = "loading.html";
}