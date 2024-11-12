// Obtener los elementos de los cubos
var cube = document.getElementById('cube');
var cube1 = document.getElementById('cube1');
var cube2 = document.getElementById('cube2');

// Función para cambiar la imagen y animar el cubo
function cambiarImagenYAnimar(cubeElement, modalElement, imagenInicial, imagenNueva) {
    var imagen = cubeElement.querySelector('img');

    // Cambiar la imagen si es la imagen inicial
    if (imagen.src.includes(imagenInicial)) {
        imagen.src = 'ima/' + imagenNueva;
    }

    // Iniciar la animación
    if (!cubeElement.classList.contains('move')) {
        cubeElement.classList.add('move');
    }

    // Mostrar el modal al terminar la animación
    cubeElement.addEventListener('animationend', function () {
        var modal = new bootstrap.Modal(document.getElementById(modalElement));
        modal.show();
    });
}

// Asignar eventos de clic para cada cubo
cube.addEventListener('click', function () {
    cambiarImagenYAnimar(cube, 'endModal1', 'Designer-removebg-preview.png', 'gatocarroo.png');
});

cube1.addEventListener('click', function () {
    cambiarImagenYAnimar(cube1, 'endModal1', 'Designer-removebg-preview.png', 'gatocarroo.png');
});

cube2.addEventListener('click', function () {
    cambiarImagenYAnimar(cube2, 'endModal', 'Designer-removebg-preview.png', 'gatocarroo.png');
});

nextLevelBtn.addEventListener('click', function () {
    window.location.href = 'carro3ex.html';
});
