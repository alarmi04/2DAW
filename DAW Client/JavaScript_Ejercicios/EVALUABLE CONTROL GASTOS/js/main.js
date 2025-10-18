// Importo las clases y defino los botones y objetos del DOM.
import { Presupuesto } from "./Presupuesto.js";
import { Interfaz } from "./Interfaz.js";
let prespuestoUsuario = "";
const formulario = document.querySelector("#agregar-gasto");
const btnAgregar = formulario.querySelector('button[type="submit"]');

// Para que no se cargue con problemas.
document.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM cargado correctamente.");
});

// Defino el presupuesto y la interfaz y uso sus metodos, ademas de pedirle el prespuesto al usuario.
const presupuesto = validarPresupuesto(prespuestoUsuario);
const p1 = new Presupuesto(presupuesto);
const interfaz = new Interfaz();
interfaz.mostrarPresupuesto(p1.presupuesto);
interfaz.mostrarRestante(p1.restante);

// Agrego un eventListener que al clicar haga lo siguiente.
btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  // Si el crear la alerta devuelve true es que se puede añadir un gasto, ya que en esa funcion uso los etodos de validar los datos.
  if (interfaz.crearAlertas()) {
    const id = Date.now();
    const gasto = document.querySelector("#gasto").value.trim();
    const cantidad = Number(document.querySelector("#cantidad").value.trim());
    p1.agregarGasto(id, gasto, cantidad);
    interfaz.mostrarRestante(p1.restante);
    interfaz.agregarGastoLista(p1, id, gasto, cantidad);
    interfaz.comprobarPresupuesto(p1);

    // Reseteo los campos del formulario.
    formulario.reset();
    // Compruebo el presupuesto restante para deshabilitar el boton de agregar.
    if (p1.calcularRestante() <= 0) btnAgregar.disabled = true;
  }
});

// Creo una funcion para validar el presupuesto.
function validarPresupuesto(prespuestoUsuario) {
  do {
    prespuestoUsuario = prompt("¿Cuál es tu presupuesto?");
  } while (isNaN(prespuestoUsuario) || prespuestoUsuario <= 0);
  return prespuestoUsuario;
}
