import {canvas, c} from './script.js';
import {speed} from './bird.js';

export const bars = [];
let gap = canvas.height * 0.35;
let spacing = canvas.width * 0.4;
let width = Math.min(canvas.width * 0.08, 80);
let x = canvas.width;

function createBars() {

    for (let i = 0; i < 6; i++) {

        let centerY = Math.random() * (canvas.height * 0.6) + canvas.height * 0.2;

        let upperHeight = centerY - gap / 2;

        bars.push({
            x: x,
            width: width,
            upperHeight: upperHeight,
            gap: gap,
            passed: false
        });
            
        x += spacing;
    }
    
}

export function renderBlocks() {
    
    for (let bar of bars) {
        if (bar.x + bar.width < 0) {
            bar.x += bars.length * spacing;

            bar.passed = false;

            let centerY = Math.random() * (canvas.height * 0.6) + canvas.height * 0.2;
            bar.upperHeight = centerY - bar.gap / 2;

        }

        let lowerY = bar.upperHeight + bar.gap;
        let lowerHeight = canvas.height - lowerY;

        // draw
        let gradient = c.createLinearGradient(bar.x, 0, bar.x, canvas.height);

        gradient.addColorStop(0, "#1a8453");
        gradient.addColorStop(1, "#006633");

        c.fillStyle = gradient;

        // c.fillRect(x, y, width, height);
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
        bar.x -= speed * deltaTime; 
    }

    renderBlocks();

    requestAnimationFrame(animate);
}

createBars();
animate(0);





