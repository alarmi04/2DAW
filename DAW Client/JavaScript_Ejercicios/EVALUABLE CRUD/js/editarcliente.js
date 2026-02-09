// Defino los elementos del DOM que voy a necesitar.
const inputNombre = document.querySelector("#nombre");
const inputCorreo = document.querySelector("#email");
const inputTelefono = document.querySelector("#telefono");
const inputEmpresa = document.querySelector("#empresa");
const formulario = document.querySelector("#formulario");
const btnEditar = formulario.querySelector("input[type=submit]");
const parametrosURL = new URLSearchParams(window.location.search);
const idCliente = parseInt(parametrosURL.get("id"));

// Añado un eventListener para que al cargar el DOM se obtenga la información del cliente a editar.
document.addEventListener("DOMContentLoaded", (e) => {
  obtenerCLientePorID(idCliente);
});

// Hago un eventListener que al clicar el boton de editar te edite la información si no hay ningún problema.
btnEditar.addEventListener("click", (e) => {
  e.preventDefault();
  // Si la alerta esta creada se borra para no duplicarla.
  const alerta = document.querySelector("#alerta-error");
  if (alerta) alerta.remove();
  // Si los datos no se validan se crea la alerta.
  if (!validarDatos()) {
    const alertaDOM = document.createElement("p");
    alertaDOM.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center"
    );
    alertaDOM.textContent = "Error! Todos los campos son obligatorios";
    alertaDOM.id = "alerta-error";
    formulario.parentElement.appendChild(alertaDOM);
    setTimeout(function() {
      alertaDOM.remove();
    }, 3000)
  } else {
    // Llamo a la funcion pasandole un objeto.
    actualizarCliente(
      {
        nombre: inputNombre.value,
        email: inputCorreo.value,
        telefono: inputTelefono.value,
        empresa: inputEmpresa.value,
      },
      idCliente
    );
    // Redirijo a index.html
    window.location.href = "./index.html";
  }
});


// Función asyncrona para obtener el cliente por el id.
async function obtenerCLientePorID(id) {
  const url = `http://localhost:4000/clientes?id=${id}`;

  try {
    // Obtengo los datos necesarios del cliente, pongo cliente[0] aunque solo devuelva uno porque la respuesta me da un array de objetos.
    const respuesta = await fetch(url);
    const cliente = await respuesta.json();
    console.log(cliente);
    const { email, empresa, nombre, telefono } = cliente[0];
    console.log(nombre);
    inputNombre.value = nombre;
    inputCorreo.value = email;
    inputTelefono.value = telefono;
    inputEmpresa.value = empresa;
  } catch (error) {
    console.log(error);
  }
}

// Función asyncrona para actualizar el cliente, mediante el id.
async function actualizarCliente(cliente, id) {
  const url = `http://localhost:4000/clientes/${id}`;

  try {
    // Uso PUT para actualziar el cliente.
    const respuesta = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(cliente),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!respuesta.ok) throw new Error("Error");
    const put = await respuesta.json();
    console.log("PUT creado: " + put);
  } catch (error) {
    console.log(error);
  }
}

// Función para validar que los datos no esten vacíos.
function validarDatos() {
  if (
    inputNombre.value === "" ||
    inputCorreo.value === "" ||
    inputEmpresa.value === "" ||
    inputTelefono.value === ""
  )
    return false;
  return true;
}
