    // Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');

const card = document.querySelector('.card');

let articulosCarrito = [];
    // Events
cargarEventListener();

function cargarEventListener(){
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso);
    document.addEventListener('DOMContentLoaded', mostrarCursos)
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        carritoHTML();
    });
} 
    // Functions
function mostrarCursos(){
    articulosCarrito = JSON.parse(localStorage.getItem('cursos')) || [];// Consideramos []
    carritoHTML();
}

function agregarCurso(event){
    event.preventDefault();
    if(event.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = event.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(event){
    if(event.target.classList.contains('borrar-curso')){
        const cursoId = event.target.getAttribute('data-id')
        articulosCarrito = articulosCarrito.filter( cursoAA => cursoAA.id !== cursoId );
        carritoHTML();
    }
}

function leerDatosCurso(cursoSe){
    const infoCurso = {
        imagen: cursoSe.querySelector('img').src,
        titulo: cursoSe.querySelector('h4').textContent,
        precio: cursoSe.querySelector('p span').textContent,
        id: cursoSe.querySelector('a').getAttribute('data-id'),
        cantidad: 1,  
    }

    const existe = articulosCarrito.some( cursoAC => cursoAC.id === infoCurso.id);

    if(existe) {
        const cursos = articulosCarrito.map( cursoAC => {
            if(cursoAC.id === infoCurso.id){
                cursoAC.cantidad++;
                return cursoAC;
            }else{ 
                return cursoAC;
            }
        })
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso]
    }
    console.log(articulosCarrito);
    carritoHTML();
}

function carritoHTML() {
    limpiarHTML();
    articulosCarrito.forEach( cursoAA => {
        const {imagen, titulo, precio, cantidad,id} = cursoAA;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="100px"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href=# class="borrar-curso" data-id="${id}"> - </a></td>
        `;
        contenedorCarrito.appendChild(row);
    })
    sincronizarStorage();
} 

function sincronizarStorage(){
    localStorage.setItem('cursos', JSON.stringify(articulosCarrito));
}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
}






































