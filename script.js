const gameContainer = document.getElementById('game');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const newGameButton = document.getElementById('new-game-btn');
const restart = document.getElementById("restart");
restart.addEventListener('click',()=>{
    startNewGame();
})
const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (!gameActive || boardState[index] !== '') {
        return;
    }

    boardState[index] = currentPlayer;
    document.getElementById(`cell${index}`).innerText = currentPlayer;
    checkGameStatus();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.innerText = `Player ${currentPlayer}'s turn`;
}

function checkGameStatus() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] !== '' && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameActive = false;
            displayResult(`Player ${currentPlayer} wins!`);
            return;
        }
    }

    if (!boardState.includes('')) {
        gameActive = false;
        displayResult('It\'s a draw!');
    }
}

function displayResult(message) {
    gameContainer.style.display = 'none';
    resultScreen.style.display = 'flex';
    resultMessage.innerText = message;
}

function startNewGame() {
    gameContainer.style.display = 'flex';
    resultScreen.style.display = 'none';
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerText = '';
    });

    status.innerText = `Player ${currentPlayer}'s turn`;
}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell${i}`;
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }
}

createBoard();
