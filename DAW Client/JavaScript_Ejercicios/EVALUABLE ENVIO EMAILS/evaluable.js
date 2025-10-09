const formulario = document.querySelector("#formulario");
let email = document.querySelector("#email");
let asunto;
let mensaje;

const validacionCompleta = {
  correo: email,
  asunto: asunto,
  mensaje: mensaje,
};

formulario.addEventListener("submit", (e) => {
  e.preventDefault();;
  if (validacionEmail(email.value)) {
    validacionCompleta.correo = email.value;
  } else {
    email.parentElement.appendChild(crearAlerta("email"));
  }
});

function validacionEmail(email) {
  const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const resultado = regex.test(email);
  return resultado;
}

function crearAlerta(campo) {
  const alerta = document.createElement("p");
  alerta.textContent = `El campo ${campo.toUpperCase()} NO es válido.`;
  alerta.style.background = "red";
  alerta.style.color = "white";
  alerta.style.textAlign = "center";
  return alerta;
}
