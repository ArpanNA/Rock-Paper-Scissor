const playerText = document.querySelector("#playerText");
const computerText = document.querySelector("#computerText");
const resultText = document.querySelector("#resultText");
const choiceBtn = document.querySelectorAll(".choiceBtn");
let player;
let computer;
let result;

choiceBtn.forEach(button => button.addEventListener("click", () => {
    player = button.textContent;
    computerTurn();
    playerText.textContent = `player : ${player}`;
    computerText.textContent = `computer : ${computer}`;
    resultText. textContent = checkWinner();

}));

function computerTurn() {
    const random = Math.floor(Math.random() * 3) +1;

    switch (random){
        case 1:
            computer = "ROCK";
            break;
        case 2:
            computer = "PAPER";
            break;  
        case 3:
            computer = "SCISSORS";
            break; 

    }
}
function checkWinner() {
    if (computer == player){
        return "Draw!";
    }
    else if (computer == "ROCK") {
       return (player == "PAPER") ? "You win!" : "You lose!";
    }
    else if (computer == "PAPER") {
        return (player == "SCISSORS") ? "You win!" : "You lose!";
     }
     else if (computer == "SCISSORS") {
        return (player == "ROCK") ? "You win!" : "You lose!";
     }
}