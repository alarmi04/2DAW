/*EDITAR UN REGISTRO:
  Todo lo relacionado con las dos fases de la edición
*/
const inputNombre = document.querySelector("#nombre");
const inputCorreo = document.querySelector("#email");
const inputTelefono = document.querySelector("#telefono");
const inputEmpresa = document.querySelector("#empresa");
const formulario = document.querySelector("#formulario");
const btnEditar = formulario.querySelector("input[type=submit]");

document.addEventListener("DOMContentLoaded", (e) => {
  const parametrosURL = new URLSearchParams(window.location.search);
  const idCliente = parseInt(parametrosURL.get("id"));
  obtenerCLientePorID(idCliente);
});

btnEditar.addEventListener("click", (e) => {});

async function obtenerCLientePorID(id) {
  const url = `http://localhost:4000/clientes?id=${id}`;

  try {
    const respuesta = await fetch(url);
    const cliente = await respuesta.json();
    console.log(cliente);
    const { email, empresa, nombre, telefono } = cliente[0];
    console.log(nombre)
    inputNombre.value = nombre;
    inputCorreo.value = email;
    inputTelefono.value = telefono;
    inputEmpresa.value = empresa;
  } catch (error) {
    console.log(error);
  }
}
