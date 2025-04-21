const images = [
    'url("/assets/Grappa.jpg")',
    'url("/assets/Ember.jpg")',
    'url("/assets/Larimar.jpg")',
    'url("/assets/Zao.jpg")'
];


let index = 0;

function changeBackground() {
    const container = document.getElementById("background-container");
    container.style.backgroundImage = `${images[index]}`;
    index = (index + 1) % images.length;
}


setInterval(changeBackground, 3000);


changeBackground();
console.log("Si")