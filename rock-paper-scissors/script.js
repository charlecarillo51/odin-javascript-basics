const choices = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getHumanChoice(choice) {
  return choice.toLowerCase();
}

function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase();
  computerChoice = computerChoice.toLowerCase();

  if (humanChoice === computerChoice) {
    return "It's a tie!";
  }

  const humanWins =
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper");

  if (humanWins) {
    humanScore++;
    return `You win! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}.`;
  }

  computerScore++;
  return `You lose! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}.`;
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function updateScore() {
  document.querySelector("#human-score").textContent = humanScore;
  document.querySelector("#computer-score").textContent = computerScore;
}

function endGame() {
  if (humanScore === 5 || computerScore === 5) {
    document.querySelectorAll(".choice").forEach(button => button.disabled = true);
    document.querySelector("#status").textContent =
      humanScore === 5 ? "You won the game! 🎉" : "Computer won the game.";
  }
}

document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    if (humanScore === 5 || computerScore === 5) return;

    const humanChoice = getHumanChoice(button.dataset.choice);
    const computerChoice = getComputerChoice();
    const result = playRound(humanChoice, computerChoice);

    document.querySelector("#human-choice").textContent = capitalize(humanChoice);
    document.querySelector("#computer-choice").textContent = capitalize(computerChoice);
    document.querySelector("#status").textContent = result;
    updateScore();
    endGame();
  });
});

document.querySelector("#reset").addEventListener("click", () => {
  humanScore = 0;
  computerScore = 0;
  updateScore();
  document.querySelector("#status").textContent = "First to 5 wins!";
  document.querySelector("#human-choice").textContent = "—";
  document.querySelector("#computer-choice").textContent = "—";
  document.querySelectorAll(".choice").forEach(button => button.disabled = false);
});
