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
let playerScore = 0;
let computerScore = 0;
let roundNum = 1;

const textDiv = document.querySelector("#game-intro .text");
const circles = document.querySelector("#game-intro .circles");
const wave = document.querySelector("#game-intro .wave");

const pScore = document.querySelector("#game-info #p-points");
const cScore = document.querySelector("#game-info #c-points");
const playButton = document.querySelector("#game-intro .play.btn");
const roundN = document.querySelector("#game-info .round");

const rockDiv = document.querySelector("#selection #rock");
const paperDiv = document.querySelector("#selection #paper");
const scissorsDiv = document.querySelector("#selection #scissors");
const gameSect = document.querySelector("#game");
const selectionSect = document.querySelector("#game #selection");

const roundSect = document.querySelector("#game #round");
const pSelectionImg = document.createElement("img");
const cSelectionImg = document.createElement("img");
const pSelectionDiv = document.querySelector("#game #round .player-selection");
const cSelectionDiv = document.querySelector("#game #round .cpu-selection");

const endMsg = document.querySelector("#game #game-end .end-msg");
const gameEndSect = document.querySelector("#game #game-end");
const replayButton = document.querySelector("#game #game-end .replay.btn");

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
  } else if (playerChoice === "rock" && computerChoice === "scissors") {
    roundWinner = "player";
  } else if (playerChoice === "scissors" && computerChoice === "paper") {
    roundWinner = "player";
  } else if (computerChoice === "paper" && playerChoice === "rock") {
    roundWinner = "computer";
  } else if (computerChoice === "rock" && playerChoice === "scissors") {
    return (roundWinner = "computer");
  } else if (computerChoice === "scissors" && playerChoice === "paper") {
    return (roundWinner = "computer");
  }
  return roundWinner;
}
function updateInfo() {
  roundN.innerText = `Round ${roundNum}`;
  pScore.innerText = playerScore;
  cScore.innerText = computerScore;
}
// Main game logic function
function game(playerChoice) {
  // Get computer's choice
  let computerChoice = getComputerSelection();

  // Set the image sources based on the choices
  cSelectionImg.src = `images/${computerChoice}.png`;
  // Append the images to their respective divs
  pSelectionDiv.appendChild(pSelectionImg);
  cSelectionDiv.appendChild(cSelectionImg);

  // Determine the round winner
  let roundWinner = playRound(playerChoice, computerChoice);

  // Update scores and display the result
  switch (roundWinner) {
    case "player":
      console.log("You win! " + playerChoice + " beats " + computerChoice);
      playerScore++;
      cSelectionDiv.classList.add("lose");
      break;

    case "computer":
      console.log("You lose! " + computerChoice + " beats " + playerChoice);
      computerScore++;
      pSelectionDiv.classList.add("lose");
      break;

    case "none":
      console.log("It's a tie");
      pSelectionDiv.classList.add("lose");
      cSelectionDiv.classList.add("lose");
      break;
  }

  // Update round number and UI information
  roundNum++;
  updateInfo();
  roundSect.addEventListener("transitionend", removeTransitionClass);
  // Check if the game should end
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
    "You Lost, better luck next time!",
  ];
  selectionSect.classList.add("fadeOut");
  if (playerScore > computerScore) {
    endMsg.innerText = messages[0];
  } else {
    endMsg.innerText = messages[1];
  }
  gameEndSect.classList.add("transition");
}

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
