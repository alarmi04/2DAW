const listaMonedas = document.querySelectorAll("#moneda option");
const moneda = document.querySelector("#moneda");
const criptoMoneda = document.querySelector("#criptomonedas");
const formulario = document.querySelector("#formulario");
const btnResultados = formulario.querySelector("input[type=submit]");
const resultado = document.querySelector("#resultado");
const nombresCripto = [];

// Agrego un eventListener para que se cargue el DOM correctamente.
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  console.log("DOM cargado correctamente");
  rellenarCriptomonedas();
});

btnResultados.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validarDatos()) {

    const alerta = document.querySelector("#alerta");

    if (alerta) alerta.remove();

    const alertaDOM = document.createElement('p');
    alertaDOM.textContent = "AMBOS CAMPOS SON OBLIGATORIOS";
    alertaDOM.classList.add('error');
    alertaDOM.id = "alerta";
    resultado.appendChild(alertaDOM);

    setTimeout(function (){
      alertaDOM.remove();
    }, 3000)

  } else {
  }
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
        const { Name, FullName } = moneda.CoinInfo;
        nombresCripto.push(Name);
        const nombre = document.createElement("option");
        nombre.value = Name;
        nombre.textContent = FullName;
        criptoMoneda.appendChild(nombre);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

