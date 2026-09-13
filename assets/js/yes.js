const container = document.querySelector(".container");
for (var i = 1; i <= 100; i++) {
  const hearts = document.createElement("div");
  hearts.classList.add("heart");
  container.appendChild(hearts);
}

function animateHearts() {
  anime({
    targets: ".heart",
    translateX: function () {
      return anime.random(-700, 700);
    },
    translateY: function () {
      return anime.random(-500, 500);
    },
    rotate: 45,
    scale: function () {
      return anime.random(1, 5);
    },
    easing: "easeInOutBack",
    duration: 1000,
    delay: anime.stagger(10),
    complete: animateHearts,
  });
}

animateHearts();