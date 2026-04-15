var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// GENERATE BARS

// c.fillRect(x, y, width, height);
c.fillStyle = 'green';


function renderBlocks() {
    let x = canvas.width * 0.3; // starting position
    const upperY = 0;
    let width = canvas.width * 0.08; 
    let spacing = canvas.width * 0.25; // space between bars

    while (x <= canvas.width) {
        
        const gap = canvas.height * 0.25; // gap between pipes

        let minHeight = canvas.height * 0.1;
        let maxHeight = canvas.height * 0.6;

        let upperHeight = Math.random() * (maxHeight - minHeight) + minHeight;
        let lowerY = upperHeight + gap;
        let lowerHeight = canvas.height - lowerY;

        c.fillRect(x, upperY, width, upperHeight);
        c.fillRect(x, lowerY , width, lowerHeight);

        x += spacing;
    }

}

function draw() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    renderBlocks();
}

draw();



