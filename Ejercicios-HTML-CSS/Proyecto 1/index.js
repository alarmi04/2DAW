const servicios = document.querySelector('.servicios');
const serviciosBoton = document.querySelector('.servicios_boton');
const boton = document.querySelector('.servicios button');

boton.addEventListener('click', (e) => {
    e.preventDefault();
    servicios.style.display = 'none';
    serviciosBoton.style.display = 'flex';
})
