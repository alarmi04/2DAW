const gama = document.querySelector("#gama");
const anyo = document.querySelector("#year");
const btnCalcular = document.querySelector("#cotizar-seguro button");
const btnCerraModal = document.querySelector("#btnCerrarModal");

document.addEventListener("DOMContentLoaded", (e) => {
  console.log("El DOM está completamente cargado y listo.");
});

if (btnCerraModal) {
  btnCerraModal.addEventListener("click", (e) => {
    e.preventDefault();
    const modal = bootstrap.Modal.getInstance(document.querySelector("#modal"));
    modal.hide();
  });
}

btnCalcular.addEventListener("click", (e) => {
  e.preventDefault();
  const alerta = document.querySelector("#alerta");
  if (!validarDatos()) {
    if (alerta) {
      alerta.remove();
    }
    const alertaDom = document.createElement("div");
    alertaDom.classList.add("error");
    alertaDom.classList.add("mt-10");
    alertaDom.id = "alerta";
    alertaDom.textContent = "Todos los campos son OBLIGATORIOS.";
    document
      .querySelector("#resultado")
      .parentElement.insertBefore(
        alertaDom,
        document.querySelector("#resultado")
      );
    setTimeout(function () {
      alertaDom.remove();
    }, 2000);
  } else {
    const p1 = new Poliza(
      gama.value,
      300,
      anyo.value,
      document.querySelector("input[name='tipo']:checked").value
    );
    p1.calcularSeguro();
    p1.mostrarInfoHTML();
  }
});

function validarDatos() {
  const tipoSeguro = document.querySelector("input[name='tipo']:checked");
  if (
    gama.value === "" ||
    anyo.value === "" ||
    tipoSeguro.value === "" ||
    tipoSeguro.value === null
  )
    return false;
  return true;
}
