
const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const totalElement = document.getElementById('total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
let nombreUsuario = localStorage.getItem('nombreUsuario');               

window.onload = function() {
    if (!nombreUsuario) {
        while (!nombreUsuario) {
            nombreUsuario = window.prompt("Por favor, ingresa tu nombre:");
            if (!nombreUsuario) {
                alert("El nombre es obligatorio, por favor ingrésalo.");
            }
        }
        localStorage.setItem('nombreUsuario', nombreUsuario);
    }
}
document.getElementById('cambiar-nombre').addEventListener('click', function() {
    localStorage.removeItem('nombreUsuario');
    location.reload(); 
});

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    procesarCompraBtn.addEventListener('click', procesarCompra);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.closest('.product'); 
        leerDatosElemento(producto); 
    }
}

function leerDatosElemento(producto) {
    const infoElemento = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoElemento); 
    actualizarTotal();
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr'); 
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="100" />
        </td>
        <td>${elemento.titulo}</td>
        <td>${elemento.precio}</td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;
    lista.appendChild(row); 
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        e.target.closest('tr').remove(); 
        actualizarTotal();
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild); 
    }
}

function actualizarTotal() {
    let total = 0;
    const productos = document.querySelectorAll('#lista-carrito tbody tr');
    productos.forEach(function(producto) {
        let precio = producto.querySelector('td:nth-child(3)').textContent;
        precio = parseFloat(precio.replace('S/.', '').trim());
        total += precio;
    });
    totalElement.textContent = `Total: S/. ${total.toFixed(2)}`; 
}
/*procesar la compra*/
function procesarCompra(e) {
    e.preventDefault();

    let productos = document.querySelectorAll('#lista-carrito tbody tr');
    let contenido = `Nombre del cliente: ${nombreUsuario}\n\nLista de productos:\n\n`;
    let total = 0;

    productos.forEach(function(producto) {
        let titulo = producto.querySelector('td:nth-child(2)').textContent;
        let precio = producto.querySelector('td:nth-child(3)').textContent;
        let precioNumerico = parseFloat(precio.replace('S/.', '').trim());
        total += precioNumerico; 
        contenido += `${titulo} - ${precio}\n`;
    });

    if (contenido === `Nombre del cliente: ${nombreUsuario}\n\nLista de productos:\n\n`) {
        alert("El carrito está vacío.");
        return;
    }

    contenido += `\nTotal: S/. ${total.toFixed(2)}`;

    let archivo = new Blob([contenido], { type: "text/plain" });
    let enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(archivo);
    enlace.download = "carrito.txt";
    enlace.click();
}