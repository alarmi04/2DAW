// Obtengo el boton y el footer del DOM.
const btnDescubreMas = document.querySelector(".btn-flotante");
const footer = document.querySelector("#footer");

// Comprobando que da el footer.
// console.log(footer);

// Le añado un evento "click" al boton y dependiendo de la información del boton mostrare una cosa u otra. 
btnDescubreMas.addEventListener("click", (e) => {
  if (btnDescubreMas.textContent === "Descubre más") {
    btnDescubreMas.textContent = "X Cerrar";
    btnDescubreMas.style.backgroundColor = "red";
  } else {
    btnDescubreMas.textContent = "Descubre más";
    btnDescubreMas.style.backgroundColor = "var(--claro)";
  }
  // Hago un toggle a la clase ".footer.activo" para mostrar o no el footer.
  footer.classList.toggle("activo");
});
