// Creo la clase con export para poder usarla en diferentes clases/ficheros.
export class Interfaz {
  // Funcion para mostrar el prespuesto.
    mostrarPresupuesto(presupuesto) {
    const total = document.querySelector("#total");
    total.textContent = presupuesto;
  }

  // Funcion para mostrar el prespuesto restante.
  mostrarRestante(res) {
    const restante = document.querySelector("#restante");
    restante.textContent = res;
  }

  // Funcino para agregar un gasto a la lista, le paso el objeto y las propiedades del nuevo gasto.
  agregarGastoLista(presupuesto, id, nom, cant) {
    // Obtengo la lista del DOM y creo la fila de la lista con li.
    const lista = document.querySelector("#gastos ul");
    const gasto = document.createElement("li");
    gasto.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    gasto.dataset.id = id;

    // Creo un span para el DOM para nombre y cantidad los cuales se los agregare al gasto.
    const nombre = document.createElement("span");
    const cantidad = document.createElement("span");
    nombre.textContent = nom;

    // Le pongo estilos a la cantidad.
    cantidad.textContent = cant;
    cantidad.style.background = "#3AF0E9";
    cantidad.style.padding = "5px";
    cantidad.style.borderRadius = "3px";

    // Creo un boton para eliminar el gasto.
    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList.add("btn", "btn-danger", "btn-sm");
    btn.textContent = "Eliminar";

    // Añado el nombre, cantidad, boton al li.
    gasto.appendChild(nombre);
    gasto.appendChild(cantidad);
    gasto.appendChild(btn);
    
    // Añado el gasto a la lista despues de añadirle el boton...
    lista.appendChild(gasto);

    // Hago un eventListener que al clicar elimine el gasto segun el id y 
    // lo elimine de la lista, actualice el prespuesto restante y compruebe si hay que deshabilitar el boton.
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      presupuesto.eliminarGasto(id);
      gasto.remove();
      this.mostrarRestante(presupuesto.restante);
      this.comprobarPresupuesto(presupuesto);
      const btnAgregar = document.querySelector(
        '#agregar-gasto button[type="submit"]'
      );
      if (presupuesto.restante > 0) btnAgregar.disabled = false;
    });
  }

  // Funcion para crear las alertas.
  crearAlertas() {
    const form = document.querySelector("#agregar-gasto");

    // Elimino cualquier alerta ya creada para no duplicar.
    const alertaExistente = document.querySelector("#alerta");
    if (alertaExistente) alertaExistente.remove();

    // Creo la nueva alerta.
    const alertaDOM = document.createElement("div");
    alertaDOM.id = "alerta";

    // Asocio a dos variables el resultado de las validaciones para no tener que estar poniendolo todo el rato.
    const gastoValido = this.validarGasto();
    const cantidadValida = this.validarCantidad();

    // Si ambas validaciones son correctas se crea la alerta de exito, y devuelvo true para dar aviso de qeu si se puede crear el gasto.
    if (gastoValido && cantidadValida) {
      alertaDOM.classList.add("text-center", "alert", "alert-success");
      alertaDOM.textContent = "Gasto añadido correctamente";
      // Inserto la alerta en el DOM y la borro segundos despues.
      form.insertBefore(alertaDOM, form.querySelector(".form-group"));
      setTimeout(() => alertaDOM.remove(), 3000);
      return true; 
    }

    // Si se llega aqui es que los datos no son correctos asi que muestor una alerta para cada caso.
    alertaDOM.classList.add("text-center", "alert", "alert-danger");
    if (!gastoValido && !cantidadValida) {
      alertaDOM.textContent = "Los campos son OBLIGATORIOS";
    } else if (!gastoValido) {
      alertaDOM.textContent = "Gasto NO válido";
    } else if (!cantidadValida) {
      alertaDOM.textContent = "Importe NO válido";
    }

    // Inserto la alerta, y la borro segundos despues.
    form.insertBefore(alertaDOM, form.querySelector(".form-group"));
    setTimeout(() => alertaDOM.remove(), 3000);
    return false;
  }

  // Funcion para validar el gasto.
  validarGasto() {
    const gasto = document.querySelector("#gasto").value.trim();
    return gasto !== "" && isNaN(gasto);
  }

  // Funcion para validar la cantidad.
  validarCantidad() {
    const cantidad = document.querySelector("#cantidad").value.trim();
    const numero = Number(cantidad);
    return cantidad !== "" && !isNaN(numero) && numero > 0;
  }

  // Funcion para comprobar el prespuesto y mostrar un color distinto segun eel restante que quede.
  comprobarPresupuesto(presupuesto) {
    const restante = document.querySelector("#presupuesto .restante");
    const mitadPresupuesto = presupuesto.presu * 0.5;
    const dosTerciosPresupuesto = presupuesto.presu * 0.75;

    // Hago un switch para ir añadiendo y borrando los estilos segun el presupuesto restante.
    switch (true) {
      case presupuesto.gastoTotal() > mitadPresupuesto &&
        presupuesto.gastoTotal() < dosTerciosPresupuesto:
        restante.classList.remove("alert-success", "alert-danger");
        restante.classList.add("alert-warning");
        break;
      case presupuesto.gastoTotal() >= dosTerciosPresupuesto:
        restante.classList.remove("alert-warning", "alert-success");
        restante.classList.add("alert-danger");
        break;
      default:
        restante.classList.remove("alert-warning", "alert-danger");
        restante.classList.add("alert-success");
        break;
    }
  }
}
