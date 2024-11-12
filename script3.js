const gameContainer = document.getElementById('game-container');
const gameOverScreen = document.getElementById('game-over');
const restartBtn = document.getElementById('restart-btn');
const nextLevelBtn = document.getElementById('next-level-btn');

let gameOver = false;
let timerStarted = false;
let countdownTime = 10; // 10 segundos para el temporizador
let allowTextDisplay = false; // Para controlar la aparición de texto en los globos

function endGame() {
    gameOver = true;
    gameOverScreen.classList.remove('hidden');
}

// Generar un color aleatorio
function generarColorAleatorio() {
    const letras = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Función para crear solo globos
function crearGlobo() {
    if (gameOver) return;

    const globo = document.createElement('div');
    globo.classList.add('globo');

    const colorAleatorio = generarColorAleatorio();
    globo.style.backgroundColor = colorAleatorio;

    const posX = Math.floor(Math.random() * (window.innerWidth - 70));
    globo.style.left = `${posX}px`;
    globo.style.top = `-90px`; // Fuera de la pantalla

    if (allowTextDisplay) {
        const textos = ['less fast', 'less faster', 'not fast'];
        const textoAleatorio = textos[Math.floor(Math.random() * textos.length)];
        globo.textContent = textoAleatorio;
        globo.style.color = '#fff';
        globo.style.fontSize = '16px';
        globo.style.display = 'flex';
        globo.style.justifyContent = 'center';
        globo.style.alignItems = 'center';
        globo.style.height = '90px';
    }

    gameContainer.appendChild(globo);

    let velocidadCaida = Math.random() * 2 + 2; // Entre 2 y 4

    const intervaloCaida = setInterval(() => {
        if (gameOver) {
            clearInterval(intervaloCaida);
            return;
        }

        let globoPosY = parseInt(globo.style.top);
        if (globoPosY < window.innerHeight - 90) {
            globo.style.top = `${globoPosY + velocidadCaida}px`;
        } else {
            clearInterval(intervaloCaida);
            gameContainer.removeChild(globo);

            // Si un globo toca el fondo y no tiene texto, el jugador pierde
            if (!allowTextDisplay) {
                endGame();
            }
        }
    }, 20);

    globo.addEventListener('click', () => {
        clearInterval(intervaloCaida);
        gameContainer.removeChild(globo);

        if (allowTextDisplay) {
            if (globo.textContent !== 'less fast') {
                endGame();
            } else {
                const endModal = new bootstrap.Modal(document.getElementById('endModal'));
                endModal.show();
            }
        }
    });
}

// Generar globos cada cierto tiempo
setInterval(crearGlobo, 1000);

// Reiniciar el juego
restartBtn.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    gameOver = false;
    allowTextDisplay = false;
});

// Iniciar temporizador de 10 segundos
function iniciarTemporizador() {
    if (timerStarted) return;
    timerStarted = true;

    const timerInterval = setInterval(() => {
        if (countdownTime <= 0 || gameOver) {
            clearInterval(timerInterval);
            allowTextDisplay = true;
            return;
        }
        countdownTime--;
    }, 1000);
}

// Llamar a la función de temporizador al inicio del juego
iniciarTemporizador();

// Redirigir al siguiente nivel al hacer clic en el botón
nextLevelBtn.addEventListener('click', function () {
    window.location.href = 'ballon1ex.html';
});