class Poliza {
  constructor(gam, any, cobert, impSeg) {
    this.gama = gam;
    this.anyo = any;
    this.cobertura = cobert;
    this.importeSeguro = impSeg;
  }

  calcularSeguro() {
    switch (this.gama) {
      case "baja":
        this.importeSeguro += this.importeSeguro * 0.05;
        break;
      case "media":
        this.importeSeguro += this.importeSeguro * 0.15;
        break;
      case "alta":
        this.importeSeguro += this.importeSeguro * 0.3;
        break;
    }

    diferenciaAnyos = new Date().getFullYear - anyo;
    for (let i = 0; i < diferenciaAnyos; i++) {
      this.importeSeguro += this.importeSeguro * 0.03;
    }

    switch (this.cobertura) {
      case "basico":
        this.importeSeguro += this.importeSeguro * 0.3;
        break;
      case "completo":
        this.importeSeguro += this.importeSeguro * 0.5;
        break;
    }

    return Math.round(this.importeSeguro);
  }

  mostrarInfoHTML() {
    const modal = new bootstrap.Modal(document.querySelector("#modal"));

    const modalHeader = document.querySelector("#modal .modal-header");
    const modalBody = document.querySelector("#modal .modal-body");
    const modalFooter = document.querySelector("#modal .modal-footer");

    while (modalHeader.firstChild) {
      modalHeader.firstChild.remove();
    }

    while (modalBody.firstChild) {
      modalBody.firstChild.remove();
    }

    while (modalFooter.firstChild) {
      modalFooter.firstChild.remove();
    }

    const titulo = document.createElement("p");
    titulo.classList.add("header", "col");
    titulo.textContent = "RESUMEN DE PÓLIZA";

    const parrafo1 = document.createElement("p");
    parrafo1.classList.add('font-bold');
    parrafo1.textContent = "TIPO: "+this.gama;

    const parrafo2 = document.createElement("p");
    parrafo2.classList.add('font-bold');
    parrafo2.textContent = "AÑO: "+this.anyo;

    const parrafo3 = document.createElement("p");
    parrafo3.classList.add('font-bold');
    parrafo3.textContent = "COBERTURA: "+this.cobertura;

    const parrafo4 = document.createElement("p");
    parrafo4.classList.add('font-bold');
    parrafo4.textContent= "TOTAL: "+this.calcularSeguro();

    const btnCerrar = document.createElement("button");
    btnCerrar.type = "button";
    btnCerrar.id = "btnCerraModal";
    btnCerrar.classList.add("btn", "btn-primary", "btn-raised", "col");
    btnCerrar.textContent = "Cerrar";

    modalHeader.appendChild(titulo);
    modalBody.appendChild(parrafo1);
    modalBody.appendChild(parrafo2);
    modalFooter.appendChild(btnCerrar);

    modal.show();
  }
}
