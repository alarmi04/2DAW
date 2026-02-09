// Importo la clase Poliza y declaro los objetos del DOM a usar.
import { Poliza } from "./Poliza.js";
const gama = document.querySelector("#gama");
const anyo = document.querySelector("#year");
const btnCalcular = document.querySelector("#cotizar-seguro button");

// Creo un eventListener para que el DOM se cargue correctamente y le añado el calculo de los Anyos al select.
document.addEventListener("DOMContentLoaded", (e) => {
  console.log("El DOM está completamente cargado y listo.");
  calcularAnyos();
});

// Creo un eventListener que al clicar cree la alerta de error y la borre con setTimeout(), 
// ademas creo el objeto/instancia de la clase Poliza.
btnCalcular.addEventListener("click", (e) => {
  e.preventDefault();
  const alerta = document.querySelector("#alerta");
  // Si los datos no se validan, se comprueba que la alerta exista, si lo hace se elimina, para que no se duplique la alerta.
  // Y se crea la laerta con DOM scripting.
  if (!validarDatos()) {
    if (alerta) {
      alerta.remove();
    }
    const alertaDom = document.createElement("div");
    alertaDom.classList.add("error");
    alertaDom.classList.add("mt-10");
    alertaDom.id = "alerta";
    alertaDom.textContent = "Todos los campos son OBLIGATORIOS.";
    document
      .querySelector("#resultado")
      .parentElement.insertBefore(
        alertaDom,
        document.querySelector("#resultado")
      );
    setTimeout(function () {
      alertaDom.remove();
    }, 2000);
  } else {
    const p1 = new Poliza(
      gama.value,
      anyo.value,
      document.querySelector("input[name='tipo']:checked").value,
      300
    );
    // Llamo a las funciones de la clase.
    p1.calcularSeguro();
    p1.mostrarInfoHTML();
  }
});

// Creo la función para validar que los datos no se encuentren vacios.
function validarDatos() {
  const tipoSeguro = document.querySelector("input[name='tipo']:checked");
  if (
    gama.value === "" ||
    anyo.value === "" ||
    !tipoSeguro
  )
    return false;
  return true;
}

// Funcion para añadir los años al select del HTML usando DOM scripting.
function calcularAnyos() {
  let fechaActual = new Date().getFullYear();
  for (let i = 1; i <= 20; i++) {
    const option = document.createElement("option");
    let fecha = fechaActual--;
    option.value = fecha;
    option.textContent = fecha;
    anyo.appendChild(option);
  }
}
