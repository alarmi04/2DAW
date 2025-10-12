// Declaro todos los elementos del DOM que necessito.
const formulario = document.querySelector("#formulario");
let email = document.querySelector("#email");
let asunto = document.querySelector("#asunto");
let mensaje = document.querySelector("#mensaje");
const submit = formulario.querySelector('button[type="submit"]');

// Creo el objeto literal para comprobar la validacion.
const validacionCompleta = {
  correo: "",
  asunto: "",
  mensaje: "",
};

// Para que no se quede pillado el DOM.
document.addEventListener("DOMContentLoaded", (e) => {
  console.log("El DOM está completamente cargado y listo.");
});

// Añado un eventListener que cada vez que se modifique algún campo input del formulario ejecute lo siguiente.
formulario.addEventListener("input", (e) => {
  // Comprobar validacion para habilitar o no el boton de enviar.
  if (comprobarCampos(validacionCompleta)) {
    submit.disabled = false;
    submit.style.opacity = "1";
  } else {
    submit.disabled = true;
    submit.style.opacity = "0.5";
  }
});

// Añado un eventListener al igual que antes, para que cada vez qyue se modifique el input de emaill se ejecute lo siguiente. 
email.addEventListener("input", (e) => {
  // Asigno al objeto el valor de email sin espacios delante y detras.
  validacionCompleta.correo = email.value.trim();
  // Creo la alerta para el email.
  const alerta = document.querySelector("#email_alerta");
  // Si la alerta ya esta creada se borra para que no aparezca repetida.
  if (alerta) alerta.remove();
  // Añado la alerta al dom si la validacion es incorrecta.
  if (!validacionEmail(validacionCompleta.correo))
    email.parentElement.appendChild(crearAlerta("email"));
});

// Añado un eventListener que actua cada vez que se modifique el input de asunto.
asunto.addEventListener("input", (e) => {
  // Asigno el valor del asunto al objeto.
  validacionCompleta.asunto = asunto.value.trim();
  // Lo mismo que antes...
  const alerta = document.querySelector("#asunto_alerta");
  if (alerta) alerta.remove();
  if (validacionCompleta.asunto === "")
    asunto.parentElement.appendChild(crearAlerta("asunto"));
});

// Este eventListener actua igual que los anteriores pero para el campo mensaje.
mensaje.addEventListener("input", (e) => {
  validacionCompleta.mensaje = mensaje.value.trim();
  const alerta = document.querySelector("#mensaje_alerta");
  if (alerta) alerta.remove();
  if (validacionCompleta.mensaje === "")
    mensaje.parentElement.appendChild(crearAlerta("mensaje"));
});

// Creo un eventListener para cuando se aprete el botono de enviar del formulario.
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  // Creo el spinner seleccionado con DOM scripting
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  const dot1 = document.createElement("div");
  dot1.classList.add("dot1");
  const dot2 = document.createElement("div");
  dot2.classList.add("dot2");
  spinner.appendChild(dot1);
  spinner.appendChild(dot2);
  formulario.parentElement.appendChild(spinner);

  // Uso setTimeout() para ejecutar un bloque de codigo despues del timepo en ms estipulado
  setTimeout(function () {
    // Elimino el spinner
    document.querySelector(".spinner").remove();
    // Reinicio los campos y pongo en estado inicial el boton de envviar 
    formulario.reset();
    submit.disabled = true;
    submit.style.opacity = "0.5";
    // Cro el mensaje que aparece en el video con DOM scripting.
    const mensajeExitoso = document.createElement("p");
    mensajeExitoso.style.backgroundColor = "#2EF527";
    mensajeExitoso.textContent = "CORREO ENVIADO CON EXITO";
    mensajeExitoso.style.fontSize = "13px";
    mensajeExitoso.style.marginTop = "7px";
    mensajeExitoso.style.padding = "5px";
    mensajeExitoso.style.textAlign = "center";
    mensajeExitoso.style.borderRadius = "6px";
    formulario.parentElement.appendChild(mensajeExitoso);
    // Otro timeout para eliminar el mensaje.
    setTimeout(function () {
      mensajeExitoso.remove();
    }, 1500)
  }, 3000);
});

// Funcion para vlaidar el email.
function validacionEmail(email) {
  const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const resultado = regex.test(email);
  return resultado;
}

// Funcion para crear un alerta segun el campo.
function crearAlerta(campo) {
  const alerta = document.createElement("p");
  alerta.id = campo + "_alerta";
  if (campo === "email" && !validacionEmail(email)) {
    alerta.textContent = `El campo ${campo.toUpperCase()} NO es valido.`;
  } else {
    alerta.textContent = `El campo ${campo.toUpperCase()} es obligatorio.`;
  }
  alerta.style.background = "red";
  alerta.style.color = "white";
  alerta.style.textAlign = "center";
  return alerta;
}

// Funcion para comprobar que el objeto no esta vacio.
function comprobarCampos(validacion) {
  if (
    validacion.correo == "" ||
    validacion.asunto == "" ||
    validacion.mensaje == ""
  )
    return false;
  return true;
}
