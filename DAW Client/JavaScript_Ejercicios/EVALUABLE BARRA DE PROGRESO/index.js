// Declaro tanto el acumulador como el contador/porcentaje y la barra a ampliar.
let acu = 0;
const contador = document.querySelector(".contenedor .contador");
const barraFront = document.querySelector(".barraFront");

// Declaro una variable para controlar el cierre del intervalo.
let intervalo;

// Función para actualizar la barra, cuando el acumulador/porcentaje llegue a 100
// entrara en la condición y se limpiara el intervalo es decir dejara de ejecutarse.
function actualizarBarra() {
  if (acu >= 100) {
    clearInterval(intervalo);
    return;
  }
  // Se va sumando uno al acumulador.
  acu++;
  // Se actualiza el contenido del porcentaje.
  contador.textContent = `${acu}%`;
  // Se actualiza el ancho de la barra.
  barraFront.style.width = `${acu}%`;
}

// Función para iniciar la barra, ya que si no se usa esta función no se puede controlar el cierre del intervalo.
function iniciarBarra() {
  actualizarBarra();
  intervalo = setInterval(actualizarBarra, 100);
}
