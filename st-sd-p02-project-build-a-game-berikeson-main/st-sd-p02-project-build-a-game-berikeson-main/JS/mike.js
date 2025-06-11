// Variabelen voor de spelers
const playerRed = "R";
const playerYellow = "Y";
let currentPlayer = playerRed; // Eerst is speler rood aan de beurt

// Gameover
let gameOver = false;
let board = []; // Het bord word gezien als een lege array

// Variabelen tegels
let currentColumns = []; // Array die bijhoudt welke rijen beschikbaar zijn voor elke kolom

// Bord variabelen
const rows = 6;
const columns = 7;

// Functies voor het spel
window.onload = function() {
    setGame();
};


function setGame() {
    board = [];
    currentColumns = Array(columns).fill(rows - 1);  // Zet alle kolommen op de laatste rij
    
    const boardElement = document.querySelector('.board');  // Selecteert het HTML element van het bord
    boardElement.innerHTML = '';  // Maakt het bord leeg in geval van een herstart

    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            // Maakt een nieuwe tegel
            const tile = document.createElement("div");
            tile.dataset.row = r;  // Gebruikt dataset om de rij op te slaan
            tile.dataset.col = c;  // Gebruikt dataset om de kolom op te slaan
            tile.classList.add("tile");

            // Voegt een click event listener toe om een stuk te plaatsen
            tile.addEventListener("click", setPiece);
            boardElement.append(tile); // Voegt de tegel toe aan het bord element
        }
        board.push(row);
    }
}


// Functie om tegels te plaatsen
function setPiece() {
    if (gameOver) {
        return;
    }

    // Spelerbeurten/kleuren
    const r = this.dataset.row;
    const c = this.dataset.col;

    const availableRow = currentColumns[c];
    if (availableRow < 0) {
        return; // Als de kolom vol is doet het niks meer
    }

    board[availableRow][c] = currentPlayer;
    const tile = document.querySelector(`.tile[data-row='${availableRow}'][data-col='${c}']`);
    if (currentPlayer === playerRed) {
        tile.classList.add("red-piece");
        currentPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currentPlayer = playerRed;
    }
    currentColumns[c] -= 1; // Update de beschikbare rij voor de kolom

    checkWinner();
}


function checkWinner() {
    // Horizontale controle voor 4 op een rij
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' && board[r][c] === board[r][c + 1] && board[r][c + 1] === board[r][c + 2] && board[r][c + 2] === board[r][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Verticale controle voor 4 op een rij
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] !== ' ' && board[r][c] === board[r + 1][c] && board[r + 1][c] === board[r + 2][c] && board[r + 2][c] === board[r + 3][c]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Diagonale controle naar rechts omhoog voor 4 op een rij
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' && board[r][c] === board[r - 1][c + 1] && board[r - 1][c + 1] === board[r - 2][c + 2] && board[r - 2][c + 2] === board[r - 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Diagonale controle naar rechts omlaag voor 4 op een rij
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !== ' ' && board[r][c] === board[r + 1][c + 1] && board[r + 1][c + 1] === board[r + 2][c + 2] && board[r + 2][c + 2] === board[r + 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }
}


// Functie om de winnaar in te stellen
function setWinner(r, c) {
    const winnerElement = document.querySelector('.winner'); // Selecteert het html element voor de winnaar
    if (board[r][c] === playerRed) {
        winnerElement.innerText = "Red wins";
    } else {
        winnerElement.innerText = "Yellow wins";
    }

    gameOver = true; // Zet gameOver op true om het spel te beindigen
}

//reset button
const restart = document.querySelector('.restart');
restart.addEventListener('click', function() {
    gameOver = false; // Reset het spel status
    currentPlayer = playerRed; // Rood mag opnieuw beginnen
    document.querySelector('.winner').innerText = ""; //haalt de winnaars tekst weg
    setGame(); // Stelt het bord opnieuw in
});
