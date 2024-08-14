///MY CONSOLE LOGIC ///

// const getComputerChoice = function () {
//   const choices = ["Rock", "Paper", "Scissors"];
//   const randomIndex = Math.floor(Math.random() * choices.length);
//   return choices[randomIndex];
// };
// console.log(getComputerChoice());
// const getPlayerChoice = function () {
//   const userInput = prompt("Rock, Paper, or Scissors?");
//   if (userInput) {
//     let formattedInput = userInput.trim().toLowerCase();
//     formattedInput =
//       formattedInput.charAt(0).toUpperCase() + userInput.slice(1);

//     if (["Rock", "Paper", "Scissors"].includes(formattedInput)) {
//       return formattedInput;
//     }
//   }
//   alert("Please enter Rock, Paper, or Scissors");
//   return getPlayerChoice();
// };

// let winningScore = parseInt(prompt("Enter winning score:"));
// let humanScore = 0;
// let computerScore = 0;

// const playLogic = () => {
//   while (computerScore !== winningScore && humanScore !== winningScore) {
//     const computerChoice = getComputerChoice();
//     const playerChoice = getPlayerChoice();

//     if (computerChoice == playerChoice) {
//       alert("It's a tie!");
//     } else if (
//       (computerChoice == "Rock" && playerChoice == "Paper") ||
//       (computerChoice == "Paper" && playerChoice == "Scissors") ||
//       (computerChoice == "Scissors" && playerChoice == "Rock")
//     ) {
//       humanScore++;
//       alert("You win this round!");
//     } else {
//       computerScore++;
//       alert("Computer wins this round!");
//     }
//     console.log(`playerScore: ${humanScore} BotScore: ${computerScore}`);
//   }
//   if (humanScore === winningScore) {
//     alert("Hooray!!! You win the game!");
//   } else {
//     alert("Sorry, you lose the game! COmputer wins!");
//   }
// };
// playLogic();
/**********************************************************************/
/*MAIN GAME*/
function getComputerSelection() {
  let choices = ["rock", "paper", "scissors"];
  let computerChoice = Math.floor(Math.random() * 3);
  return choices[computerChoice];
}

function playRound(playerChoice, computerChoice) {
  let roundWinner;
  if (playerChoice === computerChoice) {
    roundWinner = "none";
  } else if (playerChoice === "paper" && computerChoice === "rock") {
    roundWinner = "player";
  } else if (playerChoice === "rock" && computerChoice === "paper") {
    roundWinner = "computer";
  } else if (playerChoice === "rock" && computerChoice === "scissors") {
    roundWinner = "player";
  } else if (playerChoice === "scissors" && computerChoice === "rock") {
    roundWinner = "computer";
  } else if (playerChoice === "scissors" && computerChoice === "paper") {
    roundWinner = "player";
  } else if (playerChoice === "paper" && computerChoice === "scissors") {
    roundWinner = "computer";
  }
  return roundWinner;
}

function updateInfo() {
  roundN.innerText = `Round ${roundNum}`;
  pScore.innerText = playerScore;
  cScore.innerText = computerScore;
}

function game(playerChoice) {
  let computerChoice = getComputerSelection();
  cSelectionImg.src = `images/${computerChoice}.png`;
  pSelectionDiv.appendChild(pSelectionImg);
  cSelectionDiv.appendChild(cSelectionImg);

  let roundWinner = playRound(playerChoice, computerChoice);
  switch (roundWinner) {
    case "player":
      console.log("You Win! " + playerChoice + " Beats " + computerChoice);
      playerScore++;
      cSelectionDiv.classList.add("lose");
      break;
    case "computer":
      console.log("You Lose! " + computerChoice + " Beats " + playerChoice);
      computerScore++;
      pSelectionDiv.classList.add("lose");
      break;
    case "none":
      console.log("It's a Tie!");
      pSelectionDiv.classList.add("lose");
      cSelectionDiv.classList.add("lose");
      break;
  }
  roundNum++;
  updateInfo();
  roundSect.addEventListener("transitionend", removeTransitionClass);
  if (playerScore === 5 || computerScore === 5) {
    gameEnd();
  }
}

function removeTransitionClass(e) {
  if (e.propertyName !== "transform") return;
  roundSect.classList.remove("transition");
  selectionSect.classList.remove("transition");
  pSelectionDiv.classList.remove("lose");
  cSelectionDiv.classList.remove("lose");
}

function gameEnd() {
  let messages = [
    "You Won, congratulations!",
    "You lost, better luck next time!",
  ];
  selectionSect.classList.add("fadeOut");
  if (playerScore > computerScore) {
    endMsg.innerText = messages[0];
  } else {
    endMsg.innerText = messages[1];
  }
  gameEndSect.classList.add("transition");
}

let playerScore = 0;
let computerScore = 0;
let roundNum = 1;
//intro
const textDiv = document.querySelector("#game-intro .text");
const circles = document.querySelector("#game-intro .circles");
const wave = document.querySelector("#game-intro .wave");
//game info
const pScore = document.querySelector("#game-info #p-points");
const cScore = document.querySelector("#game-info #c-points");
const playButton = document.querySelector("#game-intro .play.btn");
const roundN = document.querySelector("#game-info .round");
//selection
const rockDiv = document.querySelector("#selection #rock");
const paperDiv = document.querySelector("#selection #paper");
const scissorsDiv = document.querySelector("#selection #scissors");
const gameSect = document.querySelector("#game");
const selectionSect = document.querySelector("#game #selection");
//round
const roundSect = document.querySelector("#game #round");
const pSelectionImg = document.createElement("img");
const cSelectionImg = document.createElement("img");
const pSelectionDiv = document.querySelector("#game #round .player-selection");
const cSelectionDiv = document.querySelector("#game #round .cpu-selection");
//game end
const endMsg = document.querySelector("#game #game-end .end-msg");
const gameEndSect = document.querySelector("#game #game-end");
const replayButton = document.querySelector("#game #game-end .replay.btn");

function main() {
  playButton.addEventListener("click", () => {
    textDiv.classList.add("transition");
    gameSect.classList.add("transition");
    circles.classList.add("transition");
    wave.classList.add("transition");
  });

  replayButton.addEventListener("click", () => {
    gameEndSect.classList.remove("transition");
    selectionSect.classList.remove("fadeOut");
    playerScore = 0;
    computerScore = 0;
    roundNum = 1;
    updateInfo();
  });

  circles.addEventListener("transitionend", () => {
    circles.replaceChildren();
  });

  rockDiv.addEventListener("click", () => {
    selectionSect.classList.add("transition");
    roundSect.classList.add("transition");
    pSelectionImg.src = "images/rock.png";
    game(rockDiv.getAttribute("id"));
  });
  paperDiv.addEventListener("click", () => {
    selectionSect.classList.add("transition");
    roundSect.classList.add("transition");
    pSelectionImg.src = "images/paper.png";
    game(paperDiv.getAttribute("id"));
  });
  scissorsDiv.addEventListener("click", () => {
    selectionSect.classList.add("transition");
    roundSect.classList.add("transition");
    pSelectionImg.src = "images/scissors.png";
    game(scissorsDiv.getAttribute("id"));
  });
}

main();
