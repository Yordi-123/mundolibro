let siguienteBtn = document.querySelector('.siguiente')
let atrasBtn = document.querySelector('.atras')

let explorar = document.querySelector('.explorar')
let explorarList = explorar.querySelector('.explorar .list')
let miniatura = document.querySelector('.explorar .miniatura')
let miniaturaItems = miniatura.querySelectorAll('.item')

miniatura.appendChild(miniaturaItems[0])

// Funcion para el boton siguiente
siguienteBtn.onclick = function () {
    movExplorar('siguiente')
}


// Funcion para el boton atras
atrasBtn.onclick = function () {
    movExplorar('atras')
}


function movExplorar(direccion) {
    let explorarItems = explorarList.querySelectorAll('.item')
    let miniaturaItems = document.querySelectorAll('.miniatura .item')

    if (direccion === 'siguiente') {
        explorarList.appendChild(explorarItems[0])
        miniatura.appendChild(miniaturaItems[0])
        explorar.classList.add('siguiente')
    } else {
        explorarList.prepend(explorarItems[explorarItems.length - 1])
        miniatura.prepend(miniaturaItems[miniaturaItems.length - 1])
        explorar.classList.add('atras')
    }


    explorar.addEventListener('animationend', function () {
        if (direccion === 'siguiente') {
            explorar.classList.remove('siguiente')
        } else {
            explorar.classList.remove('atras')
        }
    }, { once: true })
}