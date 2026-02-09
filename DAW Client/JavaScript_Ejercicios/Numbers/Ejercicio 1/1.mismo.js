// Defino el número  multiplicar pidiendoselo al usuario.
const numero = parseFloat(prompt("Introduce un número: "));

if (numero <= 1 && numero >= -1) {
  alert("El número no puede estar entre -1 y 1.");
} else {
  // Defino las variables necesarias para la operación en este caso, "intentos" y "resultado"
  // A resultado le asigno el número para asi poder multiplicarlo.
  let intentos = 0;
  let resultado = numero;
  // Hago un bucle para multiplicar el numero por si mismo hasta llegar a Infinity y lo voy almacenando en la variable "resultado"
  // voy sumando los intentos y hago un console.log con los datos de la operación
  do {
    resultado *= numero;
    intentos++;
    console.log(`${numero} x ${resultado / numero} = ${resultado}`);
  } while (resultado !== Infinity);
  // Console.log indicando los intentos hasta llegar al Infinity ya sea positivo o negativo.
  console.log(`Se ha hecho en ${intentos} intentos.`);
}
