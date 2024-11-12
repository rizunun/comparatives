
// Obtener el cubo
var cube = document.getElementById('cube');



// Agregar un evento al cubo para iniciar el movimiento
cube.addEventListener('click', function () {
    // Agregar la clase para moverlo si aún no está en movimiento
    if (!cube.classList.contains('move')) {
        cube.classList.add('move');
    }
});

// Cuando la animación del cubo termine, mostrar el modal
cube.addEventListener('animationend', function () {
    var modal = new bootstrap.Modal(document.getElementById('endModal'));
    document.body.classList.add('modal-backdrop-2');
    modal.show()
});

var cube1 = document.getElementById('cube1');

// Agregar un evento al cubo para iniciar el movimiento
cube1.addEventListener('click', function () {
    // Agregar la clase para moverlo si aún no está en movimiento
    if (!cube1.classList.contains('move')) {
        cube1.classList.add('move');
    }
});

// Cuando la animación del cubo termine, mostrar el modal
cube1.addEventListener('animationend', function () {
    var modal = new bootstrap.Modal(document.getElementById('endModal1'));
    document.body.classList.add('modal-backdrop-1');
    modal.show()
});

var cube2 = document.getElementById('cube2');

// Agregar un evento al cubo para iniciar el movimiento
cube2.addEventListener('click', function () {
    // Agregar la clase para moverlo si aún no está en movimiento
    if (!cube2.classList.contains('move')) {
        cube2.classList.add('move');
    }
});

// Cuando la animación del cubo termine, mostrar el modal
cube2.addEventListener('animationend', function () {
    var modal = new bootstrap.Modal(document.getElementById('endModal1'));
    document.body.classList.add('modal-backdrop-1');
    modal.show()
});

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

// Asignar el evento al cubo para cambiar la imagen y animar
cube.addEventListener('click', function () {
    cambiarImagenYAnimar(cube, 'endModal', 'Designer-removebg-preview.png', 'gatocarroo.png');
});

cube1.addEventListener('click', function () {
    cambiarImagenYAnimar(cube1, 'endModal1', 'Designer-removebg-preview.png', 'gatocarroo.png');
});

cube2.addEventListener('click', function () {
    cambiarImagenYAnimar(cube2, 'endModal1', 'Designer-removebg-preview.png', 'gatocarroo.png');
});

nextLevelBtn.addEventListener('click', function () {
    // Lógica para desbloquear el siguiente nivel o redirigir a la página del siguiente nivel
    window.location.href = 'carro2ex.html'; // Redirige al segundo nivel
});