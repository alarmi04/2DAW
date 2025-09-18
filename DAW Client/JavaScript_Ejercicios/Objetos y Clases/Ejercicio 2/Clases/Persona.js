// Exporto la clase Persona para que pueda ser usada por más ficheros. (Clase padre).
export class Persona {
  // Hago el contador estatico para que se sume cada vez que se cree una instancia del objeto,
  // si no fuese estatico, se sumaria solo al crear el objeto y al siguiente objeto volveria a 0.
  static contadorPersonas = 0;

  // Hago el constructor para asociar los atributos.
  constructor(idPersona, nombre, apellido, edad) {
    this.idPersona = parseInt(idPersona);
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = parseInt(edad);

    // Sumo 1 al contador y como es estatico se usa la clase y no la instancia.
    Persona.contadorPersonas++;
  }

  // Getter del idPersona, devuelve el valor del id.
  get getIdPersona() {
    return this.idPersona;
  }

  // Getter del nombre, devuelve el valor de la variable "nombre".
  get getNombre() {
    return this.nombre;
  }

  // Setter de la variable "nombre", le asigno un valor a la variable.
  set setNombre(nom) {
    this.nombre = nom;
  }

  // Getter del apellido, devuelvo el valor del getter.
  get getApellido() {
    return this.apellido;
  }

  // Setter del apellido, asigno un valor a la variable.
  set setApellido(ape) {
    this.apellido = ape;
  }

  // Getter de la edad, devuelvo el valor de la variable "edad".
  get getEdad() {
    return edad;
  }

  // Setter de la variable edad, asigna un valor a la variable "edad".
  set setEdad(ed) {
    this.edad = ed;
  }

  // Método toString() para devolver los datos de la Persona.
  toString() {
    return `\nId Persona: ${this.idPersona}\nNombre: ${this.nombre}\nApellido/s: ${this.apellido}\nEdad: ${this.edad}`;
  }
}
