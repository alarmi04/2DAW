import { Persona } from "./Persona.js";

export class Empleado extends Persona {
    static contadorEmpleados = 0;
    constructor(idPersona, nombre, apellido, edad, idEmpleado, sueldo) {
        super(idPersona, nombre, apellido, edad);
        this.idEmpleado = parseInt(idEmpleado);
        this.sueldo = parseInt(sueldo);
        Empleado.contadorEmpleados++;
    }

    get getIdEmpleado() {
        return this.idEmpleado;
    }

    get getSueldo() {
        return this.sueldo;
    }

    set setSueldo(sueldo) {
        this.sueldo = sueldo;
    }

    toString() {
        return `${super.toString()}\nId Empleado: ${this.idEmpleado}\nSueldo: ${this.sueldo}`;
    }
}