const listaMonedas = document.querySelectorAll("#moneda option");
const moneda = document.querySelector("#moneda");
const criptoMoneda = document.querySelector("#criptomonedas");
const formulario = document.querySelector("#formulario");
const btnResultados = formulario.querySelector("input[type=submit]");
const nombresCripto = [];

// Agrego un eventListener para que se cargue el DOM correctamente.
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  console.log("DOM cargado correctamente");
  rellenarCriptomonedas();
});

btnResultados.addEventListener("click", (e) => {
  e.preventDefault();
  //if (!validarDatos()) {
  //} else {
  //}
});

function validarDatos() {
  if (moneda.value === "" || criptoMoneda.value) return false;
  if (moneda.value === "" && criptoMoneda.value === "") return false;
  return true;
}

function rellenarCriptomonedas() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      data.Data.forEach((moneda) => {
        nombresCripto.push(moneda.CoinInfo.Name);
        const nombre = document.createElement("option");
        nombre.value = moneda.CoinInfo.Name;
        nombre.textContent = moneda.CoinInfo.FullName;
        criptoMoneda.appendChild(nombre);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
