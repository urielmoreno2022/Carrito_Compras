//variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody") //donde se van a colocar los elementos
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = []; //se crea el arreglo vacío por el momento.

//Función para cargar los Listeners
cargarEventListeners() //mando a llamar la función
function cargarEventListeners(){
    //se agrega curso presionando el botón Agregar al Carrito
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = [];   //Reseteamos el arreglo
        limpiarHTML();  //Eliminamos todo el HTML
    })
}


//Funciones

function agregarCurso(e){
    e.preventDefault(); //como todavía no hay enlaces, previene de que no se me va a ningín id. 
    if(e.target.classList.contains('agregar-carrito')){  //nos aseguramos que el usuario le haya dado clic a agrgar carrito
       const cursoSeleccionado = e.target.parentElement.parentElement;
       leerDatosCurso(cursoSeleccionado);
    }
    
}

//elimina un curso del carrito
function eliminarCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso=>curso.id !== cursoId);
        carritoHTML();  //Iterar sobre el carrito y mostrar su HTML

    }

}

//Leer el contenido y extrae la información del curso

function leerDatosCurso(curso){
    console.log(curso);
    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    //console.log(existe);
    if (existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso =>{    //map crea un nuevo arreglo
            if(curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso; //retorna los objetos actualizados.
            }else{
                return curso; //retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];      
    }else{
        //Agregamos el curso al carrito
        //Agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito,infoCurso]; //...articulosCarrito se toma una copia del carrito de compra y se agrega el objeto.
    }



    //console.log(infoCurso)
    
    console.log(articulosCarrito);

    carritoHTML(); //Llamamos la función

}

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    //Limpiar el HTML
    limpiarHTML()

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso =>{
        const {imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
          <img src="${imagen}" width="100">
        </td>
        <td> ${titulo} </td>
        <td> ${precio} </td>
        <td> ${cantidad} </td>
        <td>
          <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;
        //agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })

}

//Elimina los cursos del tbody
function limpiarHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    while (contenedorCarrito.firstChild){  //mientras halla hijos los va elminando
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
}