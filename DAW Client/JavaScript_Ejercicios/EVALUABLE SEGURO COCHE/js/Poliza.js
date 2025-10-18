// Creo la clase con export para que se pueda usar en otras clases/ficheros.
export class Poliza {
  // Creo un constructor para obtener los datos.
  constructor(gam, any, cobert, impSeg) {
    this.gama = gam;
    this.anyo = any;
    this.cobertura = cobert;
    this.importeSeguro = impSeg;
  }

  // Creo una funcion para calcular el seguro dependiendo de la gama, año y cobertura del coche.
  calcularSeguro() {
    let seguro = this.importeSeguro;
    switch (this.gama) {
      case "1":
        seguro += seguro * 0.05;
        break;
      case "2":
        seguro += seguro * 0.15;
        break;
      case "3":
        seguro += seguro * 0.3;
        break;
    }

    // Obtengo la diferenia de años usando Date y su metodo getFullYear(), restandolo al año seleccionado
    const diferenciaAnyos = new Date().getFullYear() - this.anyo;
    for (let i = 0; i < diferenciaAnyos; i++) {
      seguro += seguro * 0.03;
    }

    switch (this.cobertura) {
      case "Básico":
        seguro += seguro * 0.3;
        break;
      case "Completo":
        seguro += seguro * 0.5;
        break;
    }

    // Devuelvo el coste total sin decimales.
    return Math.round(seguro);
  }

  // Creo la funcion para mostrar toda la información en un modal.
  mostrarInfoHTML() {
    const modal = new bootstrap.Modal(document.querySelector("#modal"));

    // Obtengo todas las partes del modal.
    const modalHeader = document.querySelector("#modal .modal-header");
    const modalBody = document.querySelector("#modal .modal-body");
    const modalFooter = document.querySelector("#modal .modal-footer");

    // Si el header del modal tiene elementos de un caclulo anterior se eliminan.
    while (modalHeader.firstChild) {
      modalHeader.firstChild.remove();
    }

    // Lo mismo...
    while (modalBody.firstChild) {
      modalBody.firstChild.remove();
    }

    // Lo mismo...
    while (modalFooter.firstChild) {
      modalFooter.firstChild.remove();
    }

    // Creo con DOM scripting las secciones para el header, body y footer.
    const titulo = document.createElement("p");
    titulo.classList.add("header", "col");
    titulo.textContent = "RESUMEN DE PÓLIZA";

    const parrafo1 = document.createElement("p");
    parrafo1.classList.add("font-bold");
    if (this.gama === "1") {
      parrafo1.textContent = "TIPO: Gama Baja";
    } else if (this.gama === "2"){
      parrafo1.textContent = "TIPO: Gama Media";
    } else {
      parrafo1.textContent = "TIPO: Gama Alta";
    }

    const parrafo2 = document.createElement("p");
    parrafo2.classList.add("font-bold");
    parrafo2.textContent = "AÑO: " + this.anyo;

    const parrafo3 = document.createElement("p");
    parrafo3.classList.add("font-bold");
    parrafo3.textContent = "COBERTURA: " + this.cobertura;

    const parrafo4 = document.createElement("p");
    parrafo4.classList.add("font-bold");
    parrafo4.textContent = "TOTAL: " + this.calcularSeguro();

    const btnCerrar = document.createElement("button");
    btnCerrar.type = "button";
    btnCerrar.id = "btnCerrarModal";
    btnCerrar.classList.add("btn", "btn-primary", "btn-raised", "col");
    btnCerrar.textContent = "Cerrar";

    // Una vez creado el boton le añado un eventListener que al clicar se cierre el modal, obteniendo la instancia del modal abierto en ese momento.
    btnCerrar.addEventListener("click", (e) => {
      e.preventDefault();
      const modalInstance = bootstrap.Modal.getInstance(
        document.querySelector("#modal")
      );
      modalInstance.hide();
    });

    modalHeader.appendChild(titulo);
    modalBody.appendChild(parrafo1);
    modalBody.appendChild(parrafo2);
    modalBody.appendChild(parrafo3);
    modalBody.appendChild(parrafo4);
    modalFooter.appendChild(btnCerrar);

    // Muestro el modal.
    modal.show();
  }
}
