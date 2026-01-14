function redimensionaBarra() {
  if (!medio.ended) {
    var total = parseInt((medio.currentTime * maximo) / medio.duration);
    progreso.style.width = total + "px";
  } else {
    progreso.style.width = "0px";
    play.value = "\u25BA";
    window.clearInterval(bucle);
  }
}

function desplazarMedio(e) {
  if (!medio.paused && !medio.ended) {
    var ratonX = e.pageX - barra.offsetLeft;
    var nuevoTiempo = (ratonX * medio.duration) / maximo;
    medio.currentTime = nuevoTiempo;
    progreso.style.width = ratonX + "px";
  }
}

function accionPlay() {
  if (!medio.paused && !medio.ended) {
    medio.pause();
    play.value = "\u25BA";
    window.clearInterval(bucle);
  } else {
    medio.play();
    play.value = "||";
    bucle = setInterval(redimensionaBarra, 1000);
  }
}

function accionReiniciar() {
  const video = document.querySelector("#medio");
  if (!medio.ended && video.currentTime > 0) {
    video.currentTime = 0;
    video.play();
  }
}

function accionRetrasar() {
  const video = document.querySelector("#medio");
  if (!medio.ended && video.currentTime > 0) {
    video.currentTime = video.currentTime - 5;
    video.play();
  }
}

function accionAdelantar() {
  const video = document.querySelector("#medio");
  if (!medio.ended && video.currentTime > 0) {
    video.currentTime = video.currentTime + 5;
    video.play();
  }
}

function accionSilenciarEscuchar() {
  const video = document.querySelector("#medio");
  const botonSilenciar = document.querySelector("#silenciar");
  if (!medio.ended && video.currentTime > 0) {
    if (botonSilenciar.value === "silenciar") {
      botonSilenciar.value = "escuchar";
	  botonSilenciar.textContent = "escuchar";
	  video.muted = true;
    } else {
      botonSilenciar.value = "silenciar";
	  botonSilenciar.textContent = "silenciar";
	  video.muted = false;
    }
  }
}

function iniciar() {
  maximo = 700;

  medio = document.getElementById("medio");
  barra = document.getElementById("barra");
  progreso = document.getElementById("progreso");
  play = document.getElementById("play");
  /* obtener los objetos del resto de elementos necesarios */

  play.addEventListener("click", accionPlay, false);
  /* crear los manejadores de eventos para el resto de botones */

  barra.addEventListener("click", desplazarMedio, false);

  reiniciar = document.querySelector("#reiniciar");
  reiniciar.addEventListener("click", accionReiniciar);

  retrasar = document.querySelector("#retrasar");
  retrasar.addEventListener("click", accionRetrasar);

  adelantar = document.querySelector("#adelantar");
  adelantar.addEventListener("click", accionAdelantar);

  silenciar = document.querySelector('#silenciar');
  silenciar.addEventListener('click', accionSilenciarEscuchar);
}

window.addEventListener("load", iniciar, false);
