const nombre = prompt ("Introduce tu nombre: ");
const salarioActual = prompt ("Introduce tu salario actual: ");
const edad = prompt ("Introduce tu edad: ");
const numeroHijos = prompt ("Introduce el número de hijos/as que tienes: ");
let salarioFinal;

switch (true) {
  case salarioActual < 1000 && edad < 30:
    numeroHijos >= 1
      ? (salarioFinal = 1200)
      : (salarioFinal = salarioActual + salarioActual * 0.05);
    break;
  case edad > 30 && edad < 45:
    salarioActual < 1250 && numeroHijos > 1
      ? (salarioFinal = salarioActual + salarioActual * 0.1)
      : salarioActual < 1250 && numeroHijos >= 3
      ? (salarioFinal = salarioActual + salarioActual * 0.15)
      : (salarioFinal = salarioActual);
    break;
  case edad > 45:
    salarioActual < 2000
      ? (salarioFinal = salarioActual + salarioActual * 0.15)
      : (salarioFinal = salarioActual);
    break;
  default:
    salarioFinal = salarioActual;
}

alert(`${nombre} tiene un sueldo de: ${salarioActual}, y acaba teniendo un sueldo de: ${salarioFinal}`)