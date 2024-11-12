const pairs = [
    { id: 1, text: "This road is _______ the highway.", type: "phrase" },
    { id: 1, text: "not as wide as", type: "adjective" },
    { id: 2, text: "This book is _______ that one.", type: "phrase" },
    { id: 2, text: "as interesting as", type: "adjective" },
    { id: 3, text: "Her dress is _______ her sister's.", type: "phrase" },
    { id: 3, text: "as stylish as", type: "adjective" },
    { id: 4, text: "My computer is _______ yours.", type: "phrase" },
    { id: 4, text: "not as fast as", type: "adjective" },
    { id: 5, text: "The mountain is _______ the hills.", type: "phrase" },
    { id: 5, text: "as tall as", type: "adjective" },
    { id: 6, text: "The weather today is _______ yesterday.", type: "phrase" },
    { id: 6, text: "not as cold as", type: "adjective" },
    { id: 7, text: "The dessert is _______ it looks.", type: "phrase" },
    { id: 7, text: "as delicious as", type: "adjective" },
    { id: 8, text: "This exam was _______ the last one.", type: "phrase" },
    { id: 8, text: "not as difficult as", type: "adjective" },
    { id: 9, text: "Her painting is _______ the others.", type: "phrase" },
    { id: 9, text: "as beautiful as", type: "adjective" },
    { id: 10, text: "The puppy is _______ the kitten.", type: "phrase" },
    { id: 10, text: "as playful as", type: "adjective" }
];

let items = [...pairs].sort(() => Math.random() - 0.5);

let firstCard, lockBoard = false, moves = 0, remainingPairs = 10;
let timer, timeLeft = 180;

window.onload = function () {
    startGame();
};

function startGame() {
    moves = 0;
    remainingPairs = 10;
    $("#moves").html("Moves: 0");
    $("#time").html("Time: 03:00");

    timeLeft = 180;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        $("#time").html(`Time: 0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        if (timeLeft <= 0) {
            clearInterval(timer);
            $('#timeUpModal').modal('show');  // Mostrar el modal cuando el tiempo se acaba
        }
    }, 1000);

    createBoard();
}

function createBoard() {
    $("table").html("");
    items.sort(() => Math.random() - 0.5);

    let cardId = 1;
    for (let i = 0; i < 4; i++) {
        $("table").append("<tr>");
        for (let j = 0; j < 5; j++) {
            const item = items[cardId - 1];
            $("table").append(`
                <td id="${cardId}" onclick="flipCard(${cardId})">
                    <div class="inner" data-id="${item.id}" data-type="${item.type}">
                        <div class="front"></div>
                        <div class="back"><p>${item.text}</p></div>
                    </div>
                </td>
            `);
            cardId++;
        }
        $("table").append("</tr>");
    }
}

function flipCard(cardId) {
    if (lockBoard) return;
    const card = $(`#${cardId} .inner`);
    if (card.hasClass("flipped")) return;

    card.css("transform", "rotateY(180deg)").addClass("flipped");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    const firstCardId = firstCard.data("id");
    const firstCardType = firstCard.data("type");
    const secondCardId = card.data("id");
    const secondCardType = card.data("type");

    if (firstCardId === secondCardId && firstCardType !== secondCardType) {
        remainingPairs--;
        firstCard = null;
        moves++;
        $("#moves").html("Moves: " + moves);
        if (remainingPairs === 0) {
            clearInterval(timer);
            $('#endModal').modal('show');  // Muestra el modal al ganar
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.css("transform", "rotateY(0deg)").removeClass("flipped");
            card.css("transform", "rotateY(0deg)").removeClass("flipped");
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    [firstCard, lockBoard] = [null, false];
}

// Funciones para los botones del modal
function restartLevel() {
    location.reload(); // Recargar la página para reiniciar el juego
}

function goToHome() {
    window.location.href = 'index.html'; // Cambiar a la página de inicio
}

function goToNextLevel() {
    window.location.href = 'memory2ex.html';  // Ir al siguiente nivel
}
