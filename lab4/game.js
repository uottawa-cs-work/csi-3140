const secretNumber = Math.floor(Math.random() * 100) + 1;
const maxGuesses = 7;

let guesses = [];
let guessCount = 0;
let gameStatus = "lost"; // "won", "lost", "cancelled"

function playGame() {
  let remaining = maxGuesses;

  while (remaining > 0) {
    const input = prompt(`Guess a number (1-100). Remaining guesses: ${remaining}`);

    if (input === null) {
      gameStatus = "cancelled";
      break;
    }

    const guess = parseInt(input.trim(), 10);

    if (isNaN(guess) || guess < 1 || guess > 100) {
      alert("Please enter a valid number between 1 and 100.");
      continue;
    }

    guesses.push(guess);
    guessCount++;
    remaining--;

    if (guess === secretNumber) {
      gameStatus = "won";
      break;
    } else {
      const diff = Math.abs(secretNumber - guess);
      if (diff > 50) {
        alert(guess > secretNumber ? "Too high!" : "Too low!");
      } else {
        alert(guess > secretNumber ? "A little high." : "A little low.");
      }
    }
  }

  buildResultsPage();
}

function buildResultsPage() {
  const guessHistoryHTML = guesses.length > 0
    ? `<p class="guess-history">Your guesses: ${guesses.join(", ")}</p>`
    : "";

  const performanceFeedback = gameStatus === "won" ? getPerformanceFeedback(guessCount) : "";
  const statusClass = `status ${gameStatus}`;

  let statusMessage = "";
  if (gameStatus === "won") {
    statusMessage = `🎉 You guessed it right!`;
  } else if (gameStatus === "lost") {
    statusMessage = `💀 You ran out of guesses! The correct number was <strong>${secretNumber}</strong>.`;
  } else {
    statusMessage = `🚪 You cancelled the game.`;
  }

  document.write(`
    <html>
      <head>
        <title>Game Over</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <div class="result-box">
          <h1>Game Over</h1>
          <p class="${statusClass}">${statusMessage}</p>
          <p>You made <strong>${guessCount}</strong> guess(es).</p>
          ${performanceFeedback}
          ${guessHistoryHTML}
        </div>
      </body>
    </html>
  `);
}

function getPerformanceFeedback(guessesUsed) {
  switch (true) {
    case guessesUsed === 1:
      return `<p>🎯 Exceptional performance!</p>`;
    case guessesUsed <= 3:
      return `<p>🔥 Very good!</p>`;
    case guessesUsed <= 5:
      return `<p>👍 Decent effort.</p>`;
    case guessesUsed <= 7:
      return `<p>😅 Last-minute success!</p>`;
    default:
      return "";
  }
}

window.onload = playGame;