//todo lo relacionado con la validación y llamada a función conexión API
const nombre = document.querySelector("#nombre");
const formulario = document.querySelector("#formulario");
const btnAgregar = formulario.querySelector("input[type=submit]");
const correo = document.querySelector("#email");
const telefono = document.querySelector("#telefono");
const empresa = document.querySelector("#empresa");

// Dejo cargar el DOM correctamente.
document.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM cargado correctamente");
});

// Le agrego un eventListener al boton que al clicar, según las validaciones agregue o no al cliente.
btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  const alerta = document.querySelector("#alerta-error");
  if (alerta) alerta.remove();

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
  } else {
    agregarCliente({
      nombre: nombre.value,
      email: correo.value,
      telefono: telefono.value,
      empresa: empresa.value,
    });
    window.location.href = "./index.html";
  }
});

function validarDatos() {
  if (
    nombre.value === "" ||
    correo.value === "" ||
    empresa.value === "" ||
    telefono.value === ""
  )
    return false;
  return true;
}

async function agregarCliente(cliente) {
  const url = "http://localhost:4000/clientes";
  try {
    const respuesta = await fetch(url, {
      method: "POST",
      body: JSON.stringify(cliente),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!respuesta.ok) throw new Error("Error");
    const post = await respuesta.json();
    console.log("POST creado: " + post);
  } catch (error) {
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
    alertaDOM.textContent = "Error! Fallo al conectar con la base de datos.";
    alertaDOM.id = "alerta-error";
    formulario.parentElement.appendChild(alertaDOM);
  }
}
