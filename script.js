document.addEventListener('DOMContentLoaded', function() {
    const squares = document.querySelectorAll('.square');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let playerMoves = {
        'X': [],
        'O': []
    };
    let removeSequenceStarted = false;

    function initGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        playerMoves = {
            'X': [],
            'O': []
        };
        removeSequenceStarted = false;
        status.textContent = `Player ${currentPlayer}'s turn`;

        squares.forEach((square) => {
            const squareContent = square.querySelector('.square-content');
            squareContent.textContent = ''; // Reset square content
        });
    }

    function handleCellClick(e) {
        const cellIndex = parseInt(e.target.id.split('-')[1]);

        if (gameBoard[cellIndex] !== '' || !gameActive) return;

        gameBoard[cellIndex] = currentPlayer;

        // Get the square content element
        const squareContent = e.target.querySelector('.square-content');

        // Set the X or O symbol
        squareContent.textContent = currentPlayer;

        playerMoves[currentPlayer].push(cellIndex);

        const opponent = currentPlayer === 'X' ? 'O' : 'X';
        const opponentMoves = playerMoves[opponent];

        // Check if Player 2 has made 3 moves to start the remove sequence
        if (currentPlayer === 'O' && !removeSequenceStarted && opponentMoves.length >= 3) {
            removeSequenceStarted = true;
        }

        // Start removing the oldest move of the opposing player after Player 2's 3rd move
        if (removeSequenceStarted && opponentMoves.length > 0) {
            const removeIndex = opponentMoves.shift();
            gameBoard[removeIndex] = '';
            document.getElementById(`cell-${removeIndex}`).querySelector('.square-content').textContent = '';
        }

        if (checkWin() || checkDraw()) {
            gameActive = false;
            status.textContent = checkWin() ? `${currentPlayer} wins!` : 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWin() {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winConditions.some((condition) => {
            const [a, b, c] = condition;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    function checkDraw() {
        return gameBoard.every((cell) => cell !== '');
    }

    function restartGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        playerMoves = {
            'X': [],
            'O': []
        };
        removeSequenceStarted = false; // Reset the remove sequence flag
        status.textContent = `Player ${currentPlayer}'s turn`;

        squares.forEach((square) => {
            const squareContent = square.querySelector('.square-content');
            squareContent.textContent = ''; // Reset square content
        });
        
        console.log('Game restarted');
    }

    // Add event listeners
    squares.forEach((square) => {
        square.addEventListener('click', handleCellClick);
    });

    restartBtn.addEventListener('click', restartGame);
	 initGame();
});