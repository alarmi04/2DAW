// Importo la clase persona ya que es una herencia y Empleado depende de Persona.
import { Persona } from "./Persona.js";

// Exporto la clase para asi poder usarla en otros ficheros, el extends hace que sea herencia de "Persona"
export class Empleado extends Persona {

    // Hago el contador estatico para que se sume cada vez que se cree una instancia del objeto,
    // si no fuese estatico, se sumaria solo al crear el objeto y al siguiente objeto volveria a 0.
    static contadorEmpleados = 0;

    // Hago el constructor para asociar los atributos.
    constructor(idPersona, nombre, apellido, edad, idEmpleado, sueldo) {

        // Con super() estoy diciendo que esos atributos vienen de la clase padre.
        super(idPersona, nombre, apellido, edad);
        this.idEmpleado = parseInt(idEmpleado);
        this.sueldo = parseInt(sueldo);

        // Sumo 1 al contador y como es estatico se usa la clase y no la instancia.
        Empleado.contadorEmpleados++;
    }

    // Getter del idEmpleado, devuelve el id.
    get getIdEmpleado() {
        return this.idEmpleado;
    }

    // Getter del sueldo del empleado, devuelve el valor del sueldo.
    get getSueldo() {
        return this.sueldo;
    }

    // Setter para asignar un valor a la vaariable "sueldo".
    set setSueldo(sueldo) {
        this.sueldo = sueldo;
    }

    // Método toString() para mostrar la información de del Empleado, hace polimorfismo con el de
    // la clase padre y uso el contenido de la clase padre con super.toString(). 
    toString() {
        return `${super.toString()}\nId Empleado: ${this.idEmpleado}\nSueldo: ${this.sueldo}`;
    }
}