const gameContainer = document.getElementById('game-container');
const gameOverScreen = document.getElementById('game-over');
const restartBtn = document.getElementById('restart-btn');
const nextLevelBtn = document.getElementById('next-level-btn');

let gameOver = false;
let timerStarted = false;
let countdownTime = 25; // Temporizador de 25 segundos
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

// Función para crear un objeto (bomba o globo)
function crearObjeto() {
    if (gameOver) return;

    // Generar globos vacíos antes de los 25 segundos
    const tipo = (allowTextDisplay || Math.random() < 0.6) ? 'globo' : 'bomba'; // 60% chance de que sea un globo
    const objeto = document.createElement('div');
    objeto.classList.add(tipo);

    const colorAleatorio = generarColorAleatorio();
    objeto.style.backgroundColor = colorAleatorio;

    const posX = Math.floor(Math.random() * (window.innerWidth - 70));
    objeto.style.left = `${posX}px`;
    objeto.style.top = `-90px`; // Fuera de la pantalla al principio

    // Generar texto dentro de los globos solo después de 25 segundos
    if (tipo === 'globo' && allowTextDisplay) {
        const textos = ['fewer apples / less intelligent', 'less apples / fewer intelligent', 'not apples / less intelligent'];
        const textoAleatorio = textos[Math.floor(Math.random() * textos.length)];
        objeto.textContent = textoAleatorio;
        objeto.style.color = '#fff';
        objeto.style.fontSize = '16px';
        objeto.style.display = 'flex';
        objeto.style.justifyContent = 'center';
        objeto.style.alignItems = 'center';
        objeto.style.height = '90px';
    }

    gameContainer.appendChild(objeto);

    // Si es una bomba, hacerla caer más rápido (más velocidad)
    let velocidadCaida = tipo === 'bomba' ? Math.random() * 3 + 5 : Math.random() * 2 + 3; // Bombas caen entre 6 y 10, globos entre 2 y 4

    const intervaloCaida = setInterval(() => {
        if (gameOver) {
            clearInterval(intervaloCaida);
            return;
        }

        let objetoPosY = parseInt(objeto.style.top);
        if (objetoPosY < window.innerHeight - 90) {
            objeto.style.top = `${objetoPosY + velocidadCaida}px`;
        } else {
            clearInterval(intervaloCaida);
            gameContainer.removeChild(objeto);

            // Si es un globo vacío antes de los 25 segundos, el jugador pierde
            if (tipo === 'globo' && !allowTextDisplay) {
                endGame();
            }
        }
    }, 20);

    objeto.addEventListener('click', () => {
        clearInterval(intervaloCaida);
        gameContainer.removeChild(objeto);

        // Si es una bomba, el jugador pierde
        if (tipo === 'bomba') {
            endGame();
        } else if (allowTextDisplay) {
            // Si el globo tiene texto y el jugador hace clic en uno incorrecto
            if (objeto.textContent !== 'fewer apples / less intelligent') {
                endGame();
            } else {
                const endModal = new bootstrap.Modal(document.getElementById('endModal'));
                endModal.show();
            }
        }
    });
}

// Generar objetos cada 500 ms (más frecuentemente)
setInterval(crearObjeto, 500);

// Reiniciar el juego
restartBtn.addEventListener('click', () => {
    gameOverScreen.classList.add('hidden');
    gameOver = false;
    allowTextDisplay = false;
    countdownTime = 25; // Reiniciar el temporizador
});

// Iniciar temporizador de 25 segundos
function iniciarTemporizador() {
    if (timerStarted) return;
    timerStarted = true;

    const timerInterval = setInterval(() => {
        if (countdownTime <= 0 || gameOver) {
            clearInterval(timerInterval);
            allowTextDisplay = true; // Permitir la aparición de texto en los globos
            return;
        }
        countdownTime--;
    }, 1000);
}

// Llamar a la función de temporizador al inicio del juego
iniciarTemporizador();

// Redirigir al siguiente nivel al hacer clic en el botón
nextLevelBtn.addEventListener('click', function () {
    window.location.href = 'memoryex.html'; // Redirige al siguiente nivel
});