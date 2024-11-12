// Función que inicia la animación y muestra el modal correspondiente
function startAnimation(cubeId, modalId) {
    const cubeElement = document.getElementById(cubeId);
    const modalElement = document.getElementById(modalId);
    const imagen = cubeElement.querySelector('img');

    // Cambia la imagen solo si es la imagen inicial
    if (imagen.src.includes('Designer-removebg-preview.png')) {
        imagen.src = 'ima/gatocarroo.png';
    }

    // Inicia la animación agregando la clase 'move'
    if (!cubeElement.classList.contains('move')) {
        cubeElement.classList.add('move');
    }

    // Al terminar la animación, muestra el modal
    cubeElement.addEventListener('animationend', function () {
        const modal = new bootstrap.Modal(document.getElementById(modalId));
        modal.show();
    }, { once: true }); // 'once: true' asegura que el evento solo se escuche una vez
}

// Botón para avanzar al siguiente nivel
document.getElementById('nextLevelBtn').addEventListener('click', function () {
    window.location.href = 'ballonex.html';
});
