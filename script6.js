// Pares de frases incompletas y sus correspondientes adjetivos
const pairs = [
    { id: 1, text: "Sara is _______ Ana", type: "phrase" },
    { id: 1, text: "as tall as", type: "adjective" },
    { id: 2, text: "This car is _______ the other one", type: "phrase" },
    { id: 2, text: "as fast as", type: "adjective" },
    { id: 3, text: "My house is _______ yours", type: "phrase" },
    { id: 3, text: "as big as", type: "adjective" },
    { id: 4, text: "Your bag is _______ my bag", type: "phrase" },
    { id: 4, text: "as heavy as", type: "adjective" },
    { id: 5, text: "The movie was _______ the book", type: "phrase" },
    { id: 5, text: "as interesting as", type: "adjective" },
    { id: 6, text: "She sings _______ her sister", type: "phrase" },
    { id: 6, text: "as beautifully as", type: "adjective" }
];

// Duplicamos el array de pares para tener 12 tarjetas (6 pares únicos)
let items = [...pairs].sort(() => Math.random() - 0.5);

// Variables del juego
let pre = "", preId, preType, pID, ppID = 0, turn = 0;
let t = "transform", flip = "rotateY(180deg)", flipBack = "rotateY(0deg)";
let moves = 0, rem = 6, timer;

// Inicializar juego al cargar la página
window.onload = function () {
    startGame();
};

// Función para iniciar el juego
function startGame() {
    moves = 0;
    rem = 6; // Número de pares
    $("#moves").html("Moves: 0");
    $("#time").html("Time: 01:30");

    let timeLeft = 90; // 3 minutos en segundos
    clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        $("#time").html(`Time: 0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

        if (timeLeft <= 0) {
            clearInterval(timer);
            $('#timeUpModal').modal('show');  // Mostrar el modal cuando el tiempo se acabe
        }
    }, 1000);

    // Generar tablero
    createBoard();
}

// Función para crear el tablero
function createBoard() {
    $("table").html("");
    items.sort(() => Math.random() - 0.5); // Mezclar tarjetas

    let n = 1;
    for (let i = 0; i < 3; i++) {
        $("table").append("<tr>");
        for (let j = 0; j < 4; j++) {
            const item = items[n - 1];
            $("table").append(`
          <td id="${n}" onclick="flipCard(${n})">
            <div class="inner" data-id="${item.id}" data-type="${item.type}">
              <div class="front"></div>
              <div class="back"><p>${item.text}</p></div>
            </div>
          </td>`);
            n++;
        }
        $("table").append("</tr>");
    }
}

// Función para voltear tarjetas
function flipCard(x) {
    let card = `#${x} .inner`;
    let backText = `#${x} .inner .back p`;

    // Evitar voltear la misma tarjeta dos veces o tarjetas bloqueadas
    if (turn === 2 || $(card).attr("flip") === "block" || ppID === x) return;

    $(card).css(t, flip);
    let currentText = $(backText).text();
    let currentId = $(card).data("id");
    let currentType = $(card).data("type");

    if (turn === 1) {
        turn = 2;

        // Comprobar si coinciden los IDs pero con diferente tipo (frase y adjetivo)
        if (preId === currentId && preType !== currentType) {
            // Emparejamiento correcto
            rem--;
            $(card).attr("flip", "block");
            $(pID).attr("flip", "block");

            // Comprobar si todas las tarjetas han sido emparejadas
            if (rem === 0) {
                clearInterval(timer);
                $('#endModal').modal('show');
            }
        } else {
            // Si no coinciden, voltear de nuevo después de 1 segundo
            setTimeout(() => {
                $(pID).css(t, flipBack);
                $(card).css(t, flipBack);
            }, 1000);
        }

        // Reiniciar turno
        setTimeout(() => {
            turn = 0;
            moves++;
            $("#moves").html("Moves: " + moves);
        }, 1000);

    } else {
        // Guardar datos de la primera tarjeta seleccionada
        pre = currentText;
        preId = currentId;
        preType = currentType;
        pID = card;
        ppID = x;
        turn = 1;
    }
}

// Función para reiniciar el nivel
function restartLevel() {
    location.reload(); // Recargar la página y reiniciar el juego
}

// Función para volver al inicio
function goToHome() {
    window.location.href = 'index.html'; // Cambiar por la URL de tu página de inicio
}

// Función para avanzar al siguiente nivel (si es necesario)
function goToNextLevel() {
    window.location.href = 'memory1ex.html';
}



