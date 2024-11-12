const pairs = [
    // Comparaciones positivas con sustantivos
    { id: 1, text: "As much water as", type: "phrase" },
    { id: 1, text: "He drinks ____________ his brother.", type: "noun" },

    { id: 2, text: "As many books as", type: "phrase" },
    { id: 2, text: "She has ____________ her classmates.", type: "noun" },

    { id: 3, text: "As much rice as", type: "phrase" },
    { id: 3, text: "I need ____________ I can carry.", type: "noun" },

    { id: 4, text: "As many apples as", type: "phrase" },
    { id: 4, text: "I bought ____________ I could.", type: "noun" },

    { id: 5, text: "As much coffee as", type: "phrase" },
    { id: 5, text: "She drinks ____________ her colleague.", type: "noun" },

    { id: 6, text: "As many cars as", type: "phrase" },
    { id: 6, text: "They have ____________ we do.", type: "noun" },

    { id: 7, text: "As much time as", type: "phrase" },
    { id: 7, text: "We have ____________ we need.", type: "noun" },

    { id: 8, text: "As many chairs as", type: "phrase" },
    { id: 8, text: "There are ____________ there are students.", type: "noun" },

    // Comparaciones negativas con sustantivos
    { id: 9, text: "Not as much water as", type: "phrase" },
    { id: 9, text: "He doesn't drink ____________ his brother.", type: "noun" },

    { id: 10, text: "Not as many books as", type: "phrase" },
    { id: 10, text: "She doesn't have ____________ her classmates.", type: "noun" },

    { id: 11, text: "Not as much rice as", type: "phrase" },
    { id: 11, text: "I don't need ____________ I thought.", type: "noun" },

    { id: 12, text: "Not as many apples as", type: "phrase" },
    { id: 12, text: "I didn't buy ____________ I could.", type: "noun" },

    { id: 13, text: "Not as much coffee as", type: "phrase" },
    { id: 13, text: "She doesn't drink ____________ her colleague.", type: "noun" },

    { id: 14, text: "Not as many cars as", type: "phrase" },
    { id: 14, text: "They don't have ____________ we do.", type: "noun" },

    { id: 15, text: "Not as much time as", type: "phrase" },
    { id: 15, text: "We don't have ____________ we need.", type: "noun" },

    { id: 16, text: "Not as many chairs as", type: "phrase" },
    { id: 16, text: "There aren't ____________ there are students.", type: "noun" }
];

// Crear el array de tarjetas único, sin repeticiones
let items = [...pairs].sort(() => Math.random() - 0.5);

// Variables del juego
let firstCard, lockBoard = false, moves = 0, remainingPairs = 16;
let timer, timeLeft = 240;  // Ajustamos el tiempo a 4 minutos

window.onload = function () {
    startGame();
};

function startGame() {
    moves = 0;
    remainingPairs = 16;
    $("#moves").html("Moves: 0");
    $("#time").html("Time: 04:00");

    timeLeft = 240;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        $("#time").html(`Time: 0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        if (timeLeft <= 0) {
            clearInterval(timer);
            $('#endModal').modal('show');  // Muestra el modal al acabar el tiempo
        }
    }, 1000);

    createBoard();
}

function createBoard() {
    $("table").html("");
    items.sort(() => Math.random() - 0.5);

    let cardId = 1;
    for (let i = 0; i < 4; i++) {  // Ajustamos el número de filas a 4
        $("table").append("<tr>");
        for (let j = 0; j < 8; j++) {  // Ajustamos el número de columnas a 8
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
function goToNextLevel() {
    window.location.href = 'win.html';  // Ir al siguiente nivel
}
