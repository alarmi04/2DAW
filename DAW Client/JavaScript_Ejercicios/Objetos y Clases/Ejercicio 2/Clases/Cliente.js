// Importo la clase persona ya que es una herencia y Cliente depende de Persona.
import { Persona } from './Persona.js';

// Exporto la clase para asi poder usarla en otros ficheros, el extends hace que sea herencia de "Persona"
export class Cliente extends Persona {

    // Hago el contador estatico para que se sume cada vez que se cree una instancia del objeto,
    // si no fuese estatico, se sumaria solo al crear el objeto y al siguiente objeto volveria a 0.
    static contadorClientes = 0;
    
    // Hago el constructor para asociar los atributos.
    constructor(idPersona, nombre, apellido, edad, idCliente, fechaRegistro) {
    
        // Con super() estoy diciendo que esos atributos vienen de la clase padre.
        super(idPersona, nombre, apellido, edad);
        this.idCliente = parseInt(idCliente);
        this.fechaRegistro = new Date(fechaRegistro).toLocaleDateString();
    
        // Sumo 1 al contador y como es estatico se usa la clase y no la instancia.
        Cliente.contadorClientes++;
    }

    // Getter del  idCliente, devuelve el id.
    get getIdCliente() {
        return this.idCliente;
    }

    // Getter de la fecha de registro, devuelve la fecha.
    get getFechaRegistro() {
        return this.fechaRegistro;
    }

    // Setter de la fecha de registro, asigna a la variable el valor del parametro.
    set setFechaRegistro(fecha) {
        this.fechaRegistro = fecha;
    }

    // Método toString() para mostrar la información de del Cliente, hace polimorfismo con el de
    // la clase padre y uso el contenido de la clase padre con super.toString().
    toString() {
        return `${super.toString()}\nId Cliente: ${this.idCliente}\nFecha de registro: ${this.fechaRegistro}`
    }
}