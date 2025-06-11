
const statusDisplay = document.querySelector(".game--status") //maakt een variable van game--status class 

let gameActive = true; // gameActive is true

let currentPlayer = "X"; // defineert current player als X

let gameState = ["", "", "", "", "", "", "", "", ""]; // maakt alle hokjes leeg 

const winningMessage = () => `Player ${currentPlayer} has won!`; // win message
const drawMessage = () => `Game ended in a draw`;
const currentPlayerTurn = () => `Its ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn(); // maakt statusDisplay de inner html de currentPlayerTurn

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", handleCellClick)); // select class cell en doet een function en addeventlistener
document.querySelector(".game--restart").addEventListener("click", handleRestartGame); // hier gebeurt het zelfde

function handleCellClick(clickedCellEvent) {  // hier maak ik de handleCellClick function
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute("data-cell-index")

    );
    if (gameState[clickedCellIndex] !== "" || !gameActive){ // checkt of de cell is NIET leeg is of als gameactive false is
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex); 
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) { 

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
} //hier maak ik de function handleCellPoint

const winningConditions = [ 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]; // dit zijn de winningconditions
function handleResultValidation() {
    let roundWon = false;
    for (let i=0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === "" || b === "" || c === ""){
            continue;
        } // defineert de handleresultvalidation function en laat de winconditions zien
        if (a === b && b === c ) {
            roundWon = true;
            break
        }
    }   
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage()
        let winSound = new Audio("win.mp3");
        winSound.play()
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
      statusDisplay.innerHTML = drawMessage();
      let drawSound = new Audio("draw.mp3");
        drawSound.play()
      gameActive = false;
      return; 
    }

    handlePlayerChange();
}   

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // dit is een soort if else statement 
    statusDisplay.innerHTML = currentPlayerTurn();
} // function om de beurten te veranderen

function handleRestartGame() {
gameActive = true;
currentPlayer = "X";
gameState = ["", "", "", "", "", "", "", "", ""];
statusDisplay.innerHTML = currentPlayerTurn();
document.querySelectorAll(".cell")
.forEach(cell => cell.innerHTML = "");
} //restart button function