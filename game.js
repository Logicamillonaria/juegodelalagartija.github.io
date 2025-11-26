let dino = document.getElementById("dino");
let cactus = document.getElementById("cactus");
let coin = document.getElementById("coin");
let scoreText = document.getElementById("score");
let livesText = document.getElementById("lives");

let score = 0;
let lives = 3;
let jumping = false;

document.addEventListener("keydown", () => {
    if (!jumping) {
        jumping = true;
        dino.classList.add("jump");
        setTimeout(() => {
            dino.classList.remove("jump");
            jumping = false;
        }, 550);
    }
});

function moveObject(obj, speed, resetAt) {
    let pos = parseInt(window.getComputedStyle(obj).getPropertyValue("right"));
    obj.style.right = pos + speed + "px";

    if (pos > resetAt) {
        obj.style.right = "-80px";
        return true;
    }

    return false;
}

function detectCollision(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        aRect.top > bRect.bottom ||
        aRect.bottom < bRect.top ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}

setInterval(() => {
    let cactusReset = moveObject(cactus, 8, 950);
    let coinReset = moveObject(coin, 6, 950);

    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));

    if (detectCollision(dino, cactus) && dinoBottom < 80) {
        lives--;
        updateLives();

        cactus.style.right = "-80px";
        if (lives <= 0) resetGame();
    }

    if (detectCollision(dino, coin)) {
        score += 25;
        updateScore();
        coin.style.right = "-80px";
    }

    if (cactusReset) {
        score += 10;
        updateScore();
    }

}, 20);

function updateScore() {
    scoreText.textContent = score.toString().padStart(5, "0");
}

function updateLives() {
    livesText.textContent = "❤️".repeat(lives);
}

function resetGame() {
    alert("Game Over — Score: " + score);
    score = 0;
    lives = 3;
    updateScore();
    updateLives();
}
