// Declaro todas las partes del DOM que vaya a usar.
const moneda = document.querySelector("#moneda");
const criptoMoneda = document.querySelector("#criptomonedas");
const formulario = document.querySelector("#formulario");
const btnResultados = formulario.querySelector("input[type=submit]");
const resultado = document.querySelector("#resultado");

// Agrego un eventListener para que se cargue el DOM correctamente.
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  console.log("DOM cargado correctamente");
  // Relleno el select de las criptomonedas para poder mostarlas una vez se cargue.
  rellenarCriptomonedas();
});

// Añado un eventListener al boton que al clicarlo valide los datos y dependiendo de la respuesta, genere la alerta o muestre los resultados.
btnResultados.addEventListener("click", (e) => {
  e.preventDefault();

  if (!validarDatos(moneda, criptoMoneda)) {
    // Declaro la alerta para comprobar si ya esta, y si es asi la elimino para que no se duplique.
    const alerta = document.querySelector("#alerta");
    if (alerta) alerta.remove();

    // Creo la alerta que voy a añadir al DOM.
    const alertaDOM = document.createElement("p");
    alertaDOM.textContent = "AMBOS CAMPOS SON OBLIGATORIOS";
    alertaDOM.classList.add("error");
    alertaDOM.id = "alerta";
    resultado.appendChild(alertaDOM);

    // Hago un setTimeout para que al cabo de los 3 segundos se elimine la alerta.
    setTimeout(function () {
      alertaDOM.remove();
    }, 3000);
  } else {
    // Si no hay ningun error, se comprueba si los datos ya se estan mostrando,
    // para eliminarlos en caso de que si para que no se dupliquen.
    if (document.querySelector("#datos"))
      document.querySelector("#datos").remove();
    // Muestro los resultados.
    mostrarResultados(moneda.value, criptoMoneda.value);
  }
});

// Función para validar los datos, devuelve un booleano.
function validarDatos(moneda, criptoMoneda) {
  if (moneda.value === "" || criptoMoneda.value === "") return false;
  return true;
}

// Función para rellenar el select de las criptomonedas.
function rellenarCriptomonedas() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

  // Hago un fetch a la url creada anteriormente, obtengo los datos y luego los recorro para hacer un destructuring de los datos que necesito.
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      data.Data.forEach((moneda) => {
        const { Name, FullName } = moneda.CoinInfo;
        // Añado al select las opcionoes con cada moneda.
        const nombre = document.createElement("option");
        nombre.value = Name;
        nombre.textContent = FullName;
        // Las agrego al DOM.
        criptoMoneda.appendChild(nombre);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

// Función para mostrar los resultados de las monedas seleccionadas.
function mostrarResultados(moneda, cripto) {
  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;

  // Creo un div para meter todos los datos que obtenga de la llamada a la API.
  const datosObtenidos = document.createElement("div");
  // Le pongo un id para poder borrarlo luego.
  datosObtenidos.id = "datos";

  // Hago la llamada a la API y repito lo que he hecho con la anterior llamada solo que ahora obtengo mas datos.
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } =
        data.DISPLAY[cripto][moneda];
      const precioDOM = document.createElement("h3");
      precioDOM.textContent = "El Precio es es : " + PRICE;

      const highdayDOM = document.createElement("p");
      highdayDOM.textContent = "Precio más alto del día: " + HIGHDAY;

      const lowdayDOM = document.createElement("p");
      lowdayDOM.textContent = "Precio más bajo del día: " + LOWDAY;

      const changePCP24hourDOM = document.createElement("p");
      changePCP24hourDOM.textContent =
        "Variación últimas 24 horas: " + CHANGEPCT24HOUR;

      const lastupdate = document.createElement("p");
      lastupdate.textContent = "Última actualización: " + LASTUPDATE;

      datosObtenidos.appendChild(precioDOM);
      datosObtenidos.appendChild(highdayDOM);
      datosObtenidos.appendChild(lowdayDOM);
      datosObtenidos.appendChild(changePCP24hourDOM);
      datosObtenidos.appendChild(lastupdate);

      resultado.appendChild(datosObtenidos);
    })
    .catch((error) => {
      console.log(error);
    });
}

