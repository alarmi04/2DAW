let numero;
const numeroAadivinar = parseInt(Math.random() * 10) + 1;
let contador = 0;
let seguirJugando = false;
do {
  numero = parseInt(
    prompt("¿En qué número entero del 1 al 10 estoy pensando?")
  );
  numero != numeroAadivinar ? contador++ : null;

  switch (true) {
    case isNaN(numero) || numero < 1 || numero > 10:
      isNaN(numero)
        ? alert("El dato introducido no es un número o has cancelado.")
        : null;
      numero < 1 || numero > 10
        ? alert("El número introducido no entra en el rango.")
        : null;

      let respuesta = window.confirm("¿Quieres seguir jugando?");
      !respuesta ? (seguirJugando = true) : null;
      break;
    case numero >= 1 && numero <= 10 && numero != numeroAadivinar:
      if (numero > numeroAadivinar) {
        alert(`Mi numero es menor, ${contador} intentos.`);
      } else if (numero < numeroAadivinar) {
        alert(`Mi numero es mayor, llevas ${contador} intentos.`);
      }
      break;
    case numero == numeroAadivinar:
      alert(
        `Has adivinado el número, era ${numeroAadivinar} con un total de ${contador} intentos.\nEnhorabuena!!!!!`
      );
      window.confirm("¿Quieres seguir jugando?") ? seguirJugando = false : seguirJugando = true;
      break;
  }
} while (!seguirJugando);
