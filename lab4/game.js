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

  document.write(`
    <html>
      <head>
        <title>Game Over</title>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <div class="result-box">
          <h1>Game Over</h1>
          <p class="status">Status: ${gameStatus.toUpperCase()}</p>
          <p>You made <strong>${guessCount}</strong> guesses.</p>
          ${performanceFeedback}
          ${gameStatus === "lost" ? `<p>The correct number was <strong>${secretNumber}</strong>.</p>` : ""}
          ${gameStatus === "cancelled" ? `<p>You exited the game before finishing.</p>` : ""}
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