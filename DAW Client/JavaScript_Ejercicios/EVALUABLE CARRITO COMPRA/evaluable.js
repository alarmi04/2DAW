// Declaro los btns que voy a utilizar y los elementos del DOM a usar.
const btnVaciarCarrito = document.querySelector("#vaciar-carrito");
const btnsAgregarCarrito = document.querySelectorAll(".agregar-carrito");
const contenidoCarrito = document.querySelector("#lista-carrito tbody");
const infoCursos = document.querySelectorAll(".info-card");
// Declaro dos arrays para almacenar los cursos totales y los cursos en el carrito.
const cursos = [];
// Ahora hago que el carrito sea un array pero que llame primero al localStorage por si tiene informacion.
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Hago un eventListener para que cuando se cargue el DOM no haya cosas desincroniadas.
document.addEventListener("DOMContentLoaded", (e) => {
  console.log("El DOM está completamente cargado y listo.");
  // Recorro el carrito para crear la fila de cada curso.
  carrito.forEach((curso) => {
    crearCursoDOM(curso);
  });
});

// Recorro la informacion de los cursos del DOM y a cada curso le creo un objeto literal.
infoCursos.forEach((element) => {
  const curso = {
    imagen: element.parentElement.querySelector(".imagen-curso").src,
    titulo: element.querySelector("h4").textContent,
    precio: element.querySelector(".precio").childNodes[1].textContent,
    id: element.querySelector(".agregar-carrito").dataset.id,
    cantidad: 1,
  };
  console.log(element.querySelector("h4"));
  // Añado el curso creado a la lista de cursos totales.
  cursos.push(curso);
});

// Recorro todos los botones de agregar carrito y les añado un eventListener que se ejecuta cuando se clica en él.
btnsAgregarCarrito.forEach((btnAgregar) => {
  btnAgregar.addEventListener("click", (e) => {
    // Paro lo que vaya a hacer.
    e.preventDefault();
    // Llamo a la funcion para argregar el carrito y le paso el boton para comparar luego el título.
    agregarCarrito(btnAgregar);
  });
});

// Añado un eventListener al boton de vaciar carrito para que cuando se clique se ejecute el código.
btnVaciarCarrito.addEventListener("click", (e) => {
  e.preventDefault();
  // Se elimina de la lista de cursos del carrito, todos los cursos.
  carrito.splice(0, carrito.length);
  // Mientras haya un primer hijo significa que sigue habiendo contenido en el carrito del DOM.
  while (contenidoCarrito.firstChild) {
    // Elimino el hijo.
    contenidoCarrito.removeChild(contenidoCarrito.firstChild);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
});

// Funcion para agregar los cursos a carrito mediante createElement,
// se podria hacer con innerHTML y sería menos código pero menos escalable.
function agregarCarrito(btnAgregar) {
  // Recorro los cursos totales.
  cursos.forEach((curso) => {
    // Si el titulo del curso del array es igual al titulo del curso del DOM se hace lo siguiente.
    if (
      curso.titulo === btnAgregar.parentElement.querySelector("h4").textContent
    ) {
      // Si en el array de carrito encuentra el curso que estamos recorriendo se hace lo siguiente.
      if (carrito.find((item) => item.id === curso.id)) {
        // Si llega aqui significa que ya esta añadido por lo que solo habría que sumar la cantidad.
        const fila = contenidoCarrito.querySelector(`#fila${curso.id}`);
        fila.querySelector(".cantidad").textContent++;
        const cursoExistente = carrito.find((item) => item.id === curso.id);
        cursoExistente.cantidad++;
        localStorage.setItem("carrito", JSON.stringify(carrito));
      } else {
        // Si no se cumple que este ya en el carrito.
        // Se añade al array de carrito.
        carrito.push(curso);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        // Se crea todo el contenido de tbody con createElement.
        crearCursoDOM(curso);
      }
    }
  });
}

// Función para borrar el curso
function borrarCurso(btnBorrarCurso, curso) {
  // Al boton se le añade el eventListener que al clicar se borra el curso, no es encesario hacer un
  // "if" ya que le he pasado el boton con el id del curso en el momento que se esta recorriendo y el curso con el mismo id,
  // por lo que va a ser siempre igual.
  btnBorrarCurso.addEventListener("click", (e) => {
    e.preventDefault();
    const indexCurso = carrito.findIndex((item) => item.id === curso.id);
    carrito.splice(indexCurso, 1);
    contenidoCarrito.removeChild(
      contenidoCarrito.querySelector(`#fila${curso.id}`)
    );
    localStorage.setItem("carrito", JSON.stringify(carrito));
  });
}

// Creo esta funcion para no duplicar el codigo para crear el Curso en el DOM, y poder usarlo tanto al añaidrlo
// como al cargar la página.
function crearCursoDOM(curso) {
  // Creo la fila en el DOM
  const fila = document.createElement("tr");
  // Le pongo a la fila el id para luego poder sumar la cantidad más fácil.
  fila.id = "fila" + curso.id;
  // Añado al conteniddo del carrito la fila en el DOM.
  contenidoCarrito.appendChild(fila);
  // Creo la celda para la imagen, le pongo estilos y añado la imagen a su celda para luego añadirla a la fila del DOM.
  const celda = document.createElement("td");
  const imagen = document.createElement("img");
  imagen.src = curso.imagen;
  imagen.style.width = "100px";
  celda.appendChild(imagen);
  fila.appendChild(celda);
  // Hago lo mismo para el titulo.
  const celdaTitulo = document.createElement("td");
  celdaTitulo.textContent = curso.titulo;
  fila.appendChild(celdaTitulo);
  // Hago lo mismo para el precio.
  const celdaPrecio = document.createElement("td");
  celdaPrecio.textContent = curso.precio;
  fila.appendChild(celdaPrecio);
  // Y lo mismo para la cantidad, es decir, les hago su celda para mostrar la información
  const celdaCantidad = document.createElement("td");
  celdaCantidad.classList.add("cantidad");
  celdaCantidad.textContent = curso.cantidad;
  fila.appendChild(celdaCantidad);

  // Creo una celda para hacer un boton que al cliclar borre el curso sobre el que haya clicado la X.
  const celdaBorrarCurso = document.createElement("td");
  const btnBorrarCurso = document.createElement("a");
  btnBorrarCurso.classList.add("borrar-curso");
  btnBorrarCurso.href = "#";
  btnBorrarCurso.textContent = "X";
  celdaBorrarCurso.appendChild(btnBorrarCurso);
  fila.appendChild(celdaBorrarCurso);

  // Llamo al a funcion para crear el eventListener del boton, para borrarlo cuando se clique.
  borrarCurso(btnBorrarCurso, curso);
}
