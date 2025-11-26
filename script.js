const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

let dino = { x: 50, y: 300, width: 50, height: 50, jumping: false, velocityY: 0 };
let gravity = 0.8;
let obstacles = [];
let coins = [];
let score = 0;
let lives = 3;

function drawDino() {
    ctx.fillStyle = 'green';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function drawObstacles() {
    ctx.fillStyle = 'brown';
    obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.width, o.height));
}

function drawCoins() {
    ctx.fillStyle = 'gold';
    coins.forEach(c => ctx.beginPath() || ctx.arc(c.x, c.y, 10, 0, Math.PI * 2) || ctx.fill());
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    drawObstacles();
    drawCoins();

    if (dino.jumping) {
        dino.velocityY += gravity;
        dino.y += dino.velocityY;
        if (dino.y >= 300) {
            dino.y = 300;
            dino.jumping = false;
        }
    }

    obstacles.forEach(o => {
        o.x -= 5;
        if (o.x + o.width < 0) obstacles.shift();
        if (dino.x < o.x + o.width && dino.x + dino.width > o.x && dino.y < o.y + o.height) {
            lives--;
            obstacles.shift();
            document.getElementById('lives').textContent = '❤️'.repeat(lives);
            if (lives <= 0) alert('Game Over');
        }
    });

    coins.forEach((c, i) => {
        c.x -= 5;
        if (c.x < 0) coins.splice(i, 1);
        if (dino.x < c.x + 10 && dino.x + dino.width > c.x && dino.y < c.y + 10 && dino.y + dino.height > c.y) {
            score += 10;
            coins.splice(i, 1);
            document.getElementById('score').textContent = 'Puntuación: ' + score;
        }
    });

    if (Math.random() < 0.02) obstacles.push({ x: canvas.width, y: 330, width: 30, height: 70 });
    if (Math.random() < 0.01) coins.push({ x: canvas.width, y: Math.random() * 300 });

    requestAnimationFrame(update);
}

window.addEventListener('keydown', e => {
    if (e.code === 'Space' && !dino.jumping) {
        dino.jumping = true;
        dino.velocityY = -15;
    }
});

update();