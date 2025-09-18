export class Persona {
  static contadorPersonas = 0;
  constructor(idPersona, nombre, apellido, edad) {
    this.idPersona = parseInt(idPersona);
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = parseInt(edad);
    Persona.contadorPersonas++;
  }

  get getIdPersona() {
    return this.idPersona;
  }

  get getNombre() {
    return this.nombre;
  }

  set setNombre(nom) {
    this.nombre = nom;
  }

  get getApellido() {
    return this.apellido;
  }

  set setApellido(ape) {
    this.apellido = ape;
  }

  get getEdad() {
    return edad;
  }

  set setEdad(ed) {
    this.edad = ed;
  }

  toString() {
    return `\nId Persona: ${this.idPersona}\nNombre: ${this.nombre}\nApellido/s: ${this.apellido}\nEdad: ${this.edad}`;
  }
}
