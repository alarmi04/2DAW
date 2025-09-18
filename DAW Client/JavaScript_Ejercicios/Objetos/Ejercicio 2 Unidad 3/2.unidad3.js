import { Cliente } from "./Clases/Cliente.js";
import { Empleado } from "./Clases/Empleado.js";
import { Persona } from "./Clases/Persona.js";

const p1 = new Persona(1, "Alberto", "Aracil Millan", 21);
const p2 = new Persona(2, "Elizabeth", "López Perucho", 21);

const e1 = new Empleado(3, "Vicente", "Giner Zamorano", 21, 1, 1400);
const e2 = new Empleado(4, "Javier", "Gascó Gomez", 21, 2, 1600);

const c1 = new Cliente(5, "Alejandro", "Aracil Millan", 18, 1, "2025-09-18");
const c2 = new Cliente(6, "Mercedes", "Millan Sancho", 54, 2, "2024-02-14");

console.log(
  p1.toString() +
    p2.toString() +
    e1.toString() +
    e2.toString() +
    c1.toString() +
    c2.toString()
);
