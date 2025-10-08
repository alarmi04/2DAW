const btnVaciarCarrito = document.querySelector("#vaciar-carrito");
const btnsAgregarCarrito = document.querySelectorAll(".agregar-carrito");
const contenidoCarrito = document
  .querySelector("#lista-carrito")
  .querySelector("tbody");
const infoCursos = document.querySelectorAll(".info-card");
console.log(btnVaciarCarrito);

const cursos = [];
const carrito = [];
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
  elementCarrito.addEventListener("click", (e) => {
    e.preventDefault();
    cursos.forEach((element) => {
      if (
        element.titulo ===
        elementCarrito.parentElement.querySelector("h4").textContent
      ) {
        carrito.push(element);
        const fila = document.createElement("tr");
        contenidoCarrito.appendChild(fila);
        const celda = document.createElement("td");
        const imagen = document.createElement("img");
        imagen.src = element.imagen;
        imagen.style.width = "100px";
        celda.textContent = imagen;
        celda.appendChild(imagen);
        fila.appendChild(celda);
        const celdaTitulo = document.createElement("td");
        celdaTitulo.textContent = element.titulo;
        fila.appendChild(celdaTitulo);
        const celdaPrecio = document.createElement("td");
        celdaPrecio.textContent = element.precio;
        fila.appendChild(celdaPrecio);

      }
    });
  });
});
