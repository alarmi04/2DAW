import { Persona } from './Persona.js';

export class Cliente extends Persona {
    static contadorClientes = 0;
    constructor(idPersona, nombre, apellido, edad, idCliente, fechaRegistro) {
        super(idPersona, nombre, apellido, edad);
        this.idCliente = parseInt(idCliente);
        this.fechaRegistro = new Date(fechaRegistro).toLocaleDateString();
        Cliente.contadorClientes++;
    }

    get getIdCliente() {
        return this.idCliente;
    }

    get getFechaRegistro() {
        return this.fechaRegistro;
    }

    set setFechaRegistro(fecha) {
        this.fechaRegistro = fecha;
    }

    toString() {
        return `${super.toString()}\nId Cliente: ${this.idCliente}\nFecha de registro: ${this.fechaRegistro}`
    }
}