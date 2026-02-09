const formulario = document.querySelector("#formulario");
const btnAgregar = formulario.querySelector("input[type=submit]");
const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
const container = document.querySelector(".container");
const lista = document.querySelector("#lista-tareas");
let listaTareasDOM;
let error = "";

// Creo un eventListener para que al cargar el DOM se muestre la lista, y si no esta creada que la haga.
document.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM cargado correctamente");
  // Asigno el id de la lista para poder comprobar si existe y asi que no se duplique.
  listaTareasDOM = document.querySelector("#lista-ul");

  // Si no existe se crea y se añade al div del HTML.
  if (!listaTareasDOM) {
    listaTareasDOM = document.createElement("ul");
    listaTareasDOM.id = "lista-ul";
    lista.appendChild(listaTareasDOM);
  }
  // Recorro el array de tareas para mostrarlas.
  tareas.forEach((tarea) => {
    mostrarTarea(tarea);
  });
});

// Aañdo un eventListener que al clicar el boton de agregar se agregue la tarea o muestre el error sin que se duplique.
btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  // Obtengo el mensaje de la tarea.
  const mensaje = formulario.querySelector("#tarea").value;
  // Si no se valida el mensaje se crear la alerta si aun no esta creada para que no se duplique.
  if (!validarMensaje(mensaje)) {
    if (document.querySelector("#alerta"))
      document.querySelector("#alerta").remove();
    const alerta = crearAlerta(mensaje, error);
    container.appendChild(alerta);
    // Se borra la alerta al paso de los tres segundos.
    setTimeout(function () {
      alerta.remove();
    }, 3000);
  } else {
    // Si no hay error se añade la tarea a la lista.
    agregarTarea(mensaje);
  }
});

// Funcion para validar el mensaje de la tarea, asignare el tipo de error a la variable "error" segun la excepcion que sea.
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
  // Si devuelvo true es que no hay ningun error en el mensaje.
  return true;
}

// Creo una funcion a la cual le paso el mensaje para añadir a la alerta del error y le paso el tipo de error para que segun el que sea
// se muestre una alerta u otra.
function crearAlerta(mensaje, error) {
  const alerta = document.createElement("p");
  alerta.id = "alerta";
  if (error === "vacio") alerta.textContent = "NO HAS PUESTO NINGUNA TAREA...";
  if (error === "max") alerta.textContent = "LA TAREA ES DEMASIADO LARGA...";
  if (error === "repe")
    alerta.textContent = '"' + mensaje + '"' + " YA EXISTE...";
  alerta.classList.add("error");
  // Devuelvo la alerta.
  return alerta;
}

// Funcion para mostrar la tare en el DOM.
function mostrarTarea(mensaje) {
  // Creo la tarea con DOM scripting y el boton para borrarla.
  const tareaDOM = document.createElement("li");
  const btnBorrar = document.createElement("a");
  // Les añado sus respectivos atributos, clases, etc...
  btnBorrar.textContent = "X";
  tareaDOM.textContent = mensaje;
  btnBorrar.href = "#";
  btnBorrar.classList.add("borrar-tarea");
  btnBorrar.classList.add("btn-borrar");
  tareaDOM.style.textTransform = "uppercase";
  // Le añado a la tarea su boton.
  tareaDOM.appendChild(btnBorrar);
  // Añado a la lista del DOM la tarea.
  lista.appendChild(tareaDOM);

  // Hago que el boton anteriormente creado tenga un eventListener que al clicar borre la tarea tanto del array como del localStorage
  btnBorrar.addEventListener("click", (e) => {
    e.preventDefault();
    btnBorrar.parentElement.remove();
    const index = tareas.indexOf(mensaje);
    if (index > -1) {
      tareas.splice(index, 1);
    }
    // Actualizo el localStorage.
    localStorage.setItem("tareas", JSON.stringify(tareas));
  });
}

// Funcion para agregar la tarea al array, al localStorage
// y llamo a la funcion mostrar en la cual se encuentra todo lo necesario para mostrarla en el DOM.
function agregarTarea(mensaje) {
  mostrarTarea(mensaje);
  tareas.push(mensaje);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}
