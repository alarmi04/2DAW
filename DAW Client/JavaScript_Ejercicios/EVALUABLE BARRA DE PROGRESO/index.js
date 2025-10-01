let acu = 0;
const contador = document.querySelector(".contenedor .contador");
const barraFront = document.querySelector(".barraFront");
let intervalo;

function actualizarBarra() {
    if (acu >= 100) {
        clearInterval(intervalo); 
        return;
    }
    acu++;
    contador.textContent = `${acu}%`;
    barraFront.style.width = `${acu}%`;
}

function iniciarBarra() {
    actualizarBarra();
    intervalo = setInterval(actualizarBarra, 100)
}