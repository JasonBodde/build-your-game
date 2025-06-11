console.log('Welkom bij Whack-a-Mole!');
//variablen
let score = 0;
let gridSize = 3;
const winScore = 15;

//queryselectors
const gameGrid = document.querySelector('.game-grid');
const scoreBoard = document.querySelector('.score');
const Name = document.querySelector('.player-name');

//Dit is een functie waar de speler zijn naam in kan vullen
window.onload = function () {
    const specialCharacters = "!@#$%^&*()-_+=[{]}|;:',./?><";
    let playerName = prompt("Voer hier je naam in:");
    let nameIsValid = false;
//while loop zodat het gecontroleerd wordt of er geen speciale tekens in de naam zitten
//indexOF zorgt ervoor dat elk speciaal teken wordt gecontroleerd en stopt wanneer er een teken overeenkomt met de naam
    while (!nameIsValid) {
        nameIsValid = true;
        for (let i = 0; i < playerName.length; i++) {
            if (specialCharacters.indexOf(playerName[i]) != -1) {
                nameIsValid = false;
                alert("De naam mag geen speciale tekens bevatten. Probeer het opnieuw.");
                playerName = prompt("Voer hier je naam in (zonder speciale tekens):"); 
            }
        }
    }
    Name.textContent = playerName;
    console.log('Welkom', playerName);
};

//dit laat zien of de mol actief is en geraakt wordt en niet een leeg vakje
//holes.target kijkt of het geklikte element over een komt met activeMole en zorgt er voor als je de mol raakt +1 score en als je de mol niet raakt -1
gameGrid.addEventListener('click', (holes) => {
    const activeMole = gameGrid.querySelector('.mole.active');
    if (activeMole && holes.target == activeMole) {
        score++;
        console.log('je hebt de mol geraak!');  
        console.log('Je hebt een score van:', score);
    } else {
        score--;
        console.log('je hebt de mol gemist!');
        console.log('score:', score);
    }
    scoreBoard.textContent = score;
    updateGridSize();
    randomMole();
    checkWinCondition();
    checkLoseCondition();
});

//functie voor het bordspel groter te maken als het gelijk staat aan de punten bij de functie updategridsize
function createGrid(size) {
    gameGrid.innerHTML = '';
    gameGrid.style.gridTemplateColumns = `repeat(${size}, 150px)`;
    gameGrid.style.gridTemplateRows = `repeat(${size}, 150px)`;
//dit vergroot het bord en zorgt ervoor dat de nieuwe vakken die worden gemaakt met create element worden opgeslagen in de classlist mole 
//de nieuwe vakken worden aan de functie gameGrid toegevoegd doormiddel van appenchild
    for (let i = 0; i < size * size; i++) {
        const mole = document.createElement('div');
        mole.classList.add('mole');
        gameGrid.appendChild(mole);
    }
}

//deze functie zorgt er voor dat er een random mole verschijnd
//math random zorgt er voor dat er een mol wordt opgeslagen in i dat wordt de index
//for each zorgt ervoor dat de active mol wordt verwijderd voordat er een nieuwe mol verschijnd dit wordt gedaan met moles[i]
function randomMole() {
    const moles = document.querySelectorAll('.mole');
    const i = Math.floor(Math.random() * moles.length);
    moles.forEach(mole => mole.classList.remove('active'));
    moles[i].classList.add('active');
}

//Dit is hoe lang de mol op het scherm blijft 2,0 seconde
setInterval(randomMole, 2000);

//functie zodat het bordspel groter wordt bij een bepaald aantal punten
function updateGridSize() {
    if (score >= 10) {
        gridSize = 6;
    } else if (score >= 8) {
        gridSize = 5;
    } else if (score >= 5) {
        gridSize = 4;
    } else {
        gridSize = 3;
    }
    createGrid(gridSize);
}
//Dit laat het bord verschijnen op het scherm met de juiste size/ Formaat
createGrid(gridSize);

//functies voor het controleren voor als je de benodigde punten hebt om te winnen of als je onder 0 komt dat het spel stopt
function checkWinCondition() {
    if (score == winScore) {
        console.log('Je hebt gewonnen!');
        alert('Je hebt gewonnen!');
        scoreBoard.textContent = '15';
        setTimeout(() => {
            location.reload(); // Refresh de pagina
        }, 1500); // 1,5 seconden voor de refresh   
    }
}

function checkLoseCondition() {
    if (score < 0) {
        console.log('Je hebt verloren!');
        alert('Je hebt verloren!');
        scoreBoard.textContent = '0';
        setTimeout(() => {
            location.reload(); // Refresh de pagina 
        }, 1000); // 1,0 seconden voor de refresh 
    }
} 
