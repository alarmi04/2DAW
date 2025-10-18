// Creo la clase Presupuesto con export para poderu sarla en otros ficheros/clases.
export class Presupuesto {
    // Creo el constructor al cual asocio el importe al prespuesto y al dinero restante, ademas creo un array para almacenar los gastos como objetos.
  constructor(importe) {
    this.presu = importe;
    this.res = importe;
    this.gastos = [];
  }

  // Getter para devolver el presupuesto.
  get presupuesto() {
    return this.presu;
  }

  // Getter para devolver el dinero restante.
  get restante() {
    return this.res;
  }

  // Funcion para agregar un gasto al arrar con las propiedades id, nombre y cantidad, una vez añadido se actualzia el valor restante.
  agregarGasto(id, nombre, cantidad) {
    const gasto = { id, nombre, cantidad };
    this.gastos.push(gasto);
    this.calcularRestante();
  }

  // Funcion para eliminar el gasto mediante el id.
  eliminarGasto(id) {
    // Obtengo el id mediante la funcion findIndex del gasto, cuando el id coincida.
    const indice = this.gastos.findIndex((gasto) => gasto.id === id);
    // Si es correcto lo elimino y actualizo el restante.
    if (indice !== -1) {
      this.gastos.splice(indice, 1);
      this.calcularRestante();
    }
  }

  // Funcion para obtener el gasto total.
  gastoTotal() {
    let gastado = 0;
    this.gastos.forEach((gasto) => {
      gastado += gasto.cantidad;
    });
    return gastado;
  }

  // Funcino para calcular el dinero restante.
  calcularRestante() {
    let gastado = 0;
    this.gastos.forEach((gasto) => {
      gastado += gasto.cantidad;
    });
    return this.res = this.presu - gastado;
  }
}
