const btnVaciarCarrito = document.querySelector("#vaciar-carrito");
const btnsAgregarCarrito = document.querySelectorAll(".agregar-carrito");
const contenidoCarrito = document.querySelector("#lista-carrito tbody");
const infoCursos = document.querySelectorAll(".info-card");
const cursos = [];
const carrito = [];

function agregarCarrito(elementCarrito) {
  elementCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    cursos.forEach((element) => {
      if (
        element.titulo ===
        elementCarrito.parentElement.querySelector("h4").textContent
      ) {
        if (carrito.find((item) => item.id === element.id)) {
          const fila = contenidoCarrito.querySelector(`#fila${element.id}`);
          fila.querySelector(".cantidad").textContent++;
        } else {
          carrito.push(element);
          const fila = document.createElement("tr");
          fila.id = "fila" + element.id;
          contenidoCarrito.appendChild(fila);
          const celda = document.createElement("td");
          const imagen = document.createElement("img");
          imagen.src = element.imagen;
          imagen.style.width = "100px";
          celda.appendChild(imagen);
          fila.appendChild(celda);
          const celdaTitulo = document.createElement("td");
          celdaTitulo.textContent = element.titulo;
          fila.appendChild(celdaTitulo);
          const celdaPrecio = document.createElement("td");
          celdaPrecio.textContent = element.precio;
          fila.appendChild(celdaPrecio);
          const celdaCantidad = document.createElement("td");
          celdaCantidad.classList.add("cantidad");
          celdaCantidad.textContent = element.cantidad;
          fila.appendChild(celdaCantidad);
          const celdaBorrarCurso = document.createElement("td");
          const btnBorrarCurso = document.createElement("a");
          btnBorrarCurso.classList.add("borrar-curso");
          btnBorrarCurso.setAttribute("data-id", element.id);
          btnBorrarCurso.href = "#";
          btnBorrarCurso.textContent = "X";
          celdaBorrarCurso.appendChild(btnBorrarCurso);
          fila.appendChild(celdaBorrarCurso);
          borrarCurso(btnBorrarCurso, element);
        }
      }
    });
  });
}

function borrarCurso(btnBorrarCurso, element) {
  btnBorrarCurso.addEventListener("click", (e) => {
    e.preventDefault();
    if (btnBorrarCurso.dataset.id === element.id) {
      const indexCurso = carrito.findIndex((item) => item.id === element.id);
      carrito.splice(indexCurso, 1);
      contenidoCarrito.removeChild(
        contenidoCarrito.querySelector(`#fila${element.id}`)
      );
    }
  });
}

infoCursos.forEach((element) => {
  const curso = {
    imagen: element.parentElement.querySelector(".imagen-curso").src,
    titulo: element.querySelector("h4").textContent,
    precio: element.querySelector(".precio").childNodes[1].textContent,
    id: element.querySelector(".agregar-carrito").dataset.id,
    cantidad: 1,
  };
  console.log(element.querySelector("h4"));
  cursos.push(curso);
});

btnsAgregarCarrito.forEach((elementCarrito) => {
  agregarCarrito(elementCarrito);
});

btnVaciarCarrito.addEventListener("click", (e) => {
  e.preventDefault();
  carrito.splice(0, carrito.length);
  while (contenidoCarrito.firstChild) {
    contenidoCarrito.removeChild(contenidoCarrito.firstChild);
  }
});
