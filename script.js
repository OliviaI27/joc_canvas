// Obținem canvas-ul și contextul 2D
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Definim variabile pentru poziția și dimensiunea bilei
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

// Definim paleta de joc
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

// Definim variabile pentru tastele stânga și dreapta
var rightPressed = false;
var leftPressed = false;

// Adăugăm evenimentele pentru tastatură
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

// Desenăm bila
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Desenăm paleta
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Desenăm totul
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawBall();
    drawPaddle();

    // Mișcăm paleta la stânga și la dreapta
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // Detectăm coliziunea cu pereții
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        // Detectăm coliziunea cu paleta
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            // Game over
            alert("Game Over");
            document.location.reload();
        }
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();
