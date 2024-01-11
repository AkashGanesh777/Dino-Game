const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");

let score = 0;
let cactusPassed = false;
let isAliveInterval;

function jump() {
    if (dino.classList != "jump") {
        dino.classList.add("jump");

        setTimeout(function () {
            dino.classList.remove("jump");
        }, 300);
    }
}

function resetGame() {
    // Reset variables
    score = 0;
    cactusPassed = false;
    scoreDisplay.innerHTML = "Score: 0";

    // Reset dino and cactus positions
    dino.style.top = "150px";
    cactus.style.left = "580px";

    // Restart game loop
    isAliveInterval = setInterval(function () {
        // get current dino Y position
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

        // get current cactus X position
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

        // detect collision
        if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
            // collision
            alert("Game Over! Your Score: " + score);
            clearInterval(isAliveInterval); // Stop the game loop
            resetGame(); // Reset the game
        } else if (cactusLeft < 0 && !cactusPassed) {
            // cactus passed, increase the score
            score++;
            scoreDisplay.innerHTML = "Score: " + score;
            cactusPassed = true;
        } else if (cactusLeft > 0) {
            // reset cactusPassed when cactus is back on screen
            cactusPassed = false;
        }
    }, 10);
}

// Start the initial game loop
resetGame();

document.addEventListener("keydown", function (event) {
    jump();
});
