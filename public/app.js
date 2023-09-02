// JavaScript code for the Tic Tac Toe game

const btns = document.querySelectorAll('.btn');
const resultElement = document.getElementById('result');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let gameOver = false;

// Function to handle player's move
function handleMove(event) {
    const btn = event.target;
    
    if (!btn.value && !gameOver) {
        btn.value = currentPlayer;
        btn.disabled = true;
        checkWin();
        togglePlayer();
    }
}

// Function to toggle between players
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    resultElement.textContent = `Player ${currentPlayer}'s Turn`;
}

// Function to check for a win
function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (btns[a].value && btns[a].value === btns[b].value && btns[a].value === btns[c].value) {
            resultElement.textContent = `Player ${currentPlayer} Wins!`;
            gameOver = true;
            resetButton.disabled = false;
            return;
        }
    }

    // Check for a draw
    if ([...btns].every(btn => btn.value)) {
        resultElement.textContent = "It's a Draw!";
        gameOver = true;
        resetButton.disabled = false;
    }
}

// Function to reset the game
function resetGame() {
    btns.forEach(btn => {
        btn.value = '';
        btn.disabled = false;
    });
    resultElement.textContent = `Player X's Turn`;
    currentPlayer = 'X';
    gameOver = false;
    resetButton.disabled = true;
}

// Add event listeners
btns.forEach(btn => btn.addEventListener('click', handleMove));
resetButton.addEventListener('click', resetGame);

// Initial setup
resetGame();