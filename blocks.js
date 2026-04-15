var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// GENERATE BARS

// c.fillRect(x, y, width, height);
c.fillStyle = 'green';

const bars = [];

function createBars() {
    let spacing = canvas.width * 0.25;
    let width = canvas.width * 0.08;
    let x = canvas.width;

    for (let i = 0; i < 5; i++) {
        let gap = canvas.height * 0.25;

        let minHeight = canvas.height * 0.1;
        let maxHeight = canvas.height * 0.6;

        let upperHeight = Math.random() * (maxHeight - minHeight) + minHeight;

        bars.push({
            x: x,
            width: width,
            upperHeight: upperHeight,
            gap: gap
        });

        x += spacing;
    }
}

function renderBlocks() {
    for (let bar of bars) {

        let lowerY = bar.upperHeight + bar.gap;
        let lowerHeight = canvas.height - lowerY;

        // draw
        c.fillRect(bar.x, 0, bar.width, bar.upperHeight);
        c.fillRect(bar.x, lowerY, bar.width, lowerHeight);

    }
}

let lastTime = 0;

function animate(time) {
    let deltaTime = (time - lastTime) / 1000; // seconds
    lastTime = time;

    c.clearRect(0, 0, canvas.width, canvas.height);

    for (let bar of bars) {
        bar.x -= 100 * deltaTime; 
    }

    renderBlocks();

    requestAnimationFrame(animate);
}

for (let bar of bars) {
    if (bar.x + bar.width < 0) {
        bar.x = canvas.width;

        let minHeight = canvas.height * 0.1;
        let maxHeight = canvas.height * 0.6;

        bar.upperHeight = Math.random() * (maxHeight - minHeight) + minHeight;
    }
}

createBars();
animate(0);





