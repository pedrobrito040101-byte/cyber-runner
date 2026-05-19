const character = document.getElementById('character');
const obstacle = document.getElementById('obstacle');
const scoreVal = document.getElementById('score-val');
const gameOverScreen = document.getElementById('game-over-screen');

let score = 0;
let isGameOver = false;
let gameLoop;
let scoreInterval;

function startGame() {
    // Reset de variáveis
    score = 0;
    isGameOver = false;
    scoreVal.innerText = score;
    
    // Esconde tela de erro e limpa estilos de morte
    gameOverScreen.classList.add('game-over-hide');
    obstacle.style.left = '';
    obstacle.style.animation = '';
    character.style.bottom = '0';
    character.style.animation = '';

    // Força o restart da animação do obstáculo
    void obstacle.offsetWidth; 
    obstacle.classList.add('obstacle-move');

    // Inicia os loops
    clearInterval(gameLoop);
    clearInterval(scoreInterval);
    
    gameLoop = setInterval(checkCollision, 10);
    scoreInterval = setInterval(() => {
        score++;
        scoreVal.innerText = score;
    }, 100);
}

function jump() {
    if (isGameOver || character.classList.contains('jump')) return;
    
    character.classList.add('jump');
    setTimeout(() => {
        character.classList.remove('jump');
    }, 500);
}

function checkCollision() {
    const characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
    const obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));

    if (obstacleLeft > 50 && obstacleLeft < 90 && characterBottom <= 40) {
        // Para o jogo
        isGameOver = true;
        
        // Congela posições
        obstacle.classList.remove('obstacle-move');
        obstacle.style.left = `${obstacleLeft}px`;
        character.style.bottom = `${characterBottom}px`;

        clearInterval(gameLoop);
        clearInterval(scoreInterval);
        
        gameOverScreen.classList.remove('game-over-hide');
    }
}

// Comandos
document.addEventListener('keydown', () => {
    if (isGameOver) {
        startGame();
    } else {
        jump();
    }
});

// Começa a primeira vez
startGame();