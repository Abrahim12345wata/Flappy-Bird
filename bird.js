import {canvas, c} from '/script.js';
import {renderBlocks} from '/blocks.js';

const birdImg = new Image();
birdImg.src = "bird.png"; // make sure file is in same folder

const bird = {
    x: canvas.width * 0.2,
    y: canvas.height * 0.5,
    width: 100,
    height: 80,
    velocity: 0,
    gravity: 0.1,
    lift: -5
};

function drawBird() {
    c.save();

    c.translate(bird.x + bird.width / 2, bird.y + bird.height / 2);
    c.rotate(bird.velocity * 0.05);

    c.drawImage(
        birdImg,
        -bird.width / 2,
        -bird.height / 2,
        bird.width,
        bird.height
    );

    c.restore();
}

function updateBird() {
    bird.velocity += bird.gravity; // falling
    bird.y += bird.velocity;
}

window.addEventListener("keydown", () => {
    bird.velocity = bird.lift;
});

let collision = false;

function animate() {
    if (collision) return;
    c.clearRect(0, 0, canvas.width, canvas.height);

    updateBird();     // physics
    renderBlocks();   // pipes
    drawBird();       // bird

    requestAnimationFrame(animate);

    if (bird.y + bird.height > canvas.height) {
    bird.y = canvas.height - bird.height;
    bird.velocity = 0;
    }

    if (bird.y < 0) {
        bird.y = 0;
        bird.velocity = 0;
    }
}

birdImg.onload = () => {
    animate(); // start game ONLY after image loads
};
