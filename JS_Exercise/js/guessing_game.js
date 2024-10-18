let targetNumber;
let attempts = 0;

function startNewGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = 'alert';
    document.getElementById('guessInput').value = '';
    document.getElementById('guessButton').disabled = false;
    document.getElementById('newGameButton').classList.add('d-none');
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    const messageElement = document.getElementById('message');

    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageElement.textContent = 'Please enter a valid number between 1 and 100.';
        messageElement.className = 'alert alert-warning';
        return;
    }

    attempts++;

    if (guess === targetNumber) {
        messageElement.textContent = `Congratulations! You guessed the number in ${attempts} attempts.`;
        messageElement.className = 'alert alert-success';
        document.getElementById('guessButton').disabled = true;
        document.getElementById('newGameButton').classList.remove('d-none');
    } else if (guess < targetNumber) {
        messageElement.textContent = 'Too low! Try a higher number.';
        messageElement.className = 'alert alert-info';
    } else {
        messageElement.textContent = 'Too high! Try a lower number.';
        messageElement.className = 'alert alert-info';
    }
}

// Event listeners
document.getElementById('guessButton').addEventListener('click', checkGuess);
document.getElementById('newGameButton').addEventListener('click', startNewGame);

// Start a new game when the page loads
startNewGame();
