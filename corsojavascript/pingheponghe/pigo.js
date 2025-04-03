const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 10;

let leftY = canvas.height / 2 - paddleHeight / 2;
let rightY = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

// Punteggi separati per i due giocatori
let score1 = 0; // Giocatore sinistro
let score2 = 0; // Giocatore destro

const paddleSpeed = 10;
const keys = {};

// Gestione tastiera
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

// Funzione per aggiornare il punteggio a schermo
function updateScore() {
  document.getElementById("score1").innerText = "Giocatore 1: " + score1;
  document.getElementById("score2").innerText = "Giocatore 2: " + score2;
}

// Reset della pallina al centro
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX; // cambia direzione
  ballSpeedY = 3;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Racchette
  ctx.fillStyle = "black";
  ctx.fillRect(0, leftY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, rightY, paddleWidth, paddleHeight);

  // Pallina
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fill();

  // Movimento
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Rimbalzo su alto/basso
  if (ballY <= 0 || ballY >= canvas.height) {
    ballSpeedY *= -1;
  }

  // Collisione paddle sinistro
  if (ballX - ballSize < paddleWidth &&
      ballY > leftY &&
      ballY < leftY + paddleHeight) {
    ballSpeedX *= -1;
  }

  // Collisione paddle destro
  if (ballX + ballSize > canvas.width - paddleWidth &&
      ballY > rightY &&
      ballY < rightY + paddleHeight) {
    ballSpeedX *= -1;
  }

  // Punto per il giocatore 1 se la pallina esce a destra
  if (ballX + ballSize > canvas.width) {
    score1++;
    updateScore();
    resetBall();
  }

  // Punto per il giocatore 2 se la pallina esce a sinistra
  if (ballX - ballSize < 0) {
    score2++;
    updateScore();
    resetBall();
  }

  // Movimento paddle sinistro (W / S)
  if (keys["w"] && leftY > 0) leftY -= paddleSpeed;
  if (keys["s"] && leftY + paddleHeight < canvas.height) leftY += paddleSpeed;

  // Movimento paddle destro (↑ / ↓)
  if (keys["ArrowUp"] && rightY > 0) rightY -= paddleSpeed;
  if (keys["ArrowDown"] && rightY + paddleHeight < canvas.height) rightY += paddleSpeed;

  requestAnimationFrame(draw);
}


// Avvia il gioco
updateScore(); // mostra 0-0 all'inizio
draw();
