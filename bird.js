import {canvas, c} from './script.js';
import {renderBlocks, bars} from './blocks.js';

export let speed;
let startingSpeed = 0;
let score = 0;
speed = startingSpeed;
let hasRun = false;

const birdImg = new Image();
birdImg.src = "bird.png"; // make sure file is in same folder

const bird = {
    x: canvas.width * 0.2,
    y: canvas.height * 0.5,
    width: canvas.width * 0.08,
    height: canvas.height * 0.08,
    velocity: 0,
    gravity: canvas.height * 2,
    lift: -canvas.height * 0.6
}

function start() {
    speed = canvas.width * 0.3;
    hasRun = true;
}

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

function updateBird(deltaTime) {
    bird.velocity += bird.gravity * deltaTime;

    if (bird.velocity > canvas.height * 1.5) {
    bird.velocity = canvas.height * 1.5;
}

    bird.y += bird.velocity * deltaTime;
}

window.addEventListener("keydown", () => {
    bird.velocity = 0;
    bird.velocity += bird.lift;

    // run only once
    if (!hasRun){
        start();
        gameStarted = true;
    }
});

window.addEventListener("pointerdown", () => {
    bird.velocity = 0;
    bird.velocity += bird.lift;
    
    // run only once
    if (!hasRun){
        start();
        gameStarted = true;
    }
});

function drawScore() {
    c.textAlign = "center"; // center horizontally
    c.fillStyle = "white";
    c.strokeStyle = "black";
    c.lineWidth = 4;

    c.font = "bold 70px Flappy";

    let x = canvas.width / 2;
    let y = canvas.height * 0.2;

    c.strokeText(score, x, y); // outline
    c.fillText(score, x, y);   // fill
}

function collisionCheck() {
     for (let bar of bars) {

        if (!bar.passed && bird.x > bar.x + bar.width) {
            score++;
            bar.passed = true;
    
        }

        let lowerY = bar.upperHeight + bar.gap;
        
        //checks if bird hits any bar

        if (
            bird.x < bar.x + bar.width &&
            bird.x + bird.width > bar.x &&
            bird.y < bar.upperHeight
        ) {
            speed = 0;
        }   

        if (
            bird.x < bar.x + bar.width &&
            bird.x + bird.width > bar.x &&
            bird.y + bird.height > lowerY
        ) {
            speed = 0;
        }
       
    }

}

function animate() {

    if (!gameStarted) {
        drawStartText();
        requestAnimationFrame(animate);
        return;
    }

    c.clearRect(0, 0, canvas.width, canvas.height);

    collisionCheck();
    updateBird();     // physics
    renderBlocks();   // pipes
    drawBird();       // bird
    drawScore();   


    requestAnimationFrame(animate);

    if (bird.y + bird.height > canvas.height) {
        bird.y = canvas.height - bird.height;
        bird.velocity = 0;
        speed = 0;
    }

    if (bird.y < 0) {
        bird.y = 0;
        bird.velocity = 0;
        speed = 0;
    }
}

birdImg.onload = () => {
    animate(); // start game ONLY after image loads
};

let gameStarted = false;

function drawStartText() {
    c.fillStyle = "white";
    c.strokeStyle = "black";
    c.lineWidth = 4;

    c.textAlign = "center";
    c.font = "bold 40px Arial";

    c.strokeText("Click to Start", canvas.width / 2, canvas.height / 2);
    c.fillText("Click to Start", canvas.width / 2, canvas.height / 2);
}