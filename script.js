var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// GENERATE BARS

// c.fillRect(x, y, width, height);
c.fillStyle = 'green';

let x, upperY, lowerY;
let upperWidth, upperHeight, lowerWidth, lowerHeight;
const lowerYarr = [450, 550, 350];
const upperHeightarr = [200, 300, 100];
const lowerHeightarr = [200, 100, 300];
let index;


function renderBlocks() {
    x = 400;

    while (x <= 1000) {
        // default bars
        upperY = 0;
        width = 100;

        index = Math.floor(Math.random() * 3);
        lowerY = lowerYarr[index];
        upperHeight = upperHeightarr[index];
        lowerHeight = lowerHeightarr[index];;

        c.fillRect(x, upperY, width, upperHeight);
        c.fillRect(x, lowerY , width, lowerHeight);

        x += 300;
    }

}

renderBlocks();



