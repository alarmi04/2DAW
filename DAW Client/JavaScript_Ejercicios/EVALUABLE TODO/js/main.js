const formulario = document.querySelector("#formulario");
const btnAgregar = formulario.querySelector("input[type=submit]");
const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
const container = document.querySelector(".container");
let error = "";

document.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM cargado correctamente");
  tareas.forEach((tarea) => {
    mostrarTarea(tarea);
  });
});

btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  const mensaje = formulario.querySelector("#tarea").value;
  if (!validarMensaje(mensaje)) {
    if (document.querySelector("#alerta"))
      document.querySelector("#alerta").remove();
    const alerta = crearAlerta(mensaje, error);
    container.appendChild(alerta);
    setTimeout(function () {
      alerta.remove();
    }, 3000);
  } else {
    agregarTarea(mensaje);
  }
});

function validarMensaje(mensaje) {
  switch (true) {
    case mensaje === "":
      error = "vacio";
      return false;
    case mensaje.length > 30:
      error = "max";
      return false;
    case tareas.includes(mensaje):
      error = "repe";
      return false;
  }
  return true;
}

function crearAlerta(mensaje, error) {
  const alerta = document.createElement("p");
  alerta.id = "alerta";
  if (error === "vacio") alerta.textContent = "NO HAS PUESTO NINGUNA TAREA...";
  if (error === "max") alerta.textContent = "LA TAREA ES DEMASIADO LARGA...";
  if (error === "repe")
    alerta.textContent = '"' + mensaje + '"' + " YA EXISTE...";
  alerta.classList.add("error");
  return alerta;
}

function mostrarTarea(mensaje) {
  const lista = document.querySelector("#lista-tareas");
  const tareaDOM = document.createElement("p");
  tareaDOM.textContent = mensaje;
  lista.appendChild(tareaDOM);
}

function agregarTarea(mensaje) {
  mostrarTarea(mensaje);
  tareas.push(mensaje);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
