let numero;
const numeroAadivinar = Math.random() * 11;
let contador = 0;
do {
  numero = parseInt(
    prompt("¿En qué número entero del 1 al 10 estoy pensando?")
  );
  numero != numeroAadivinar ? contador++ : null;

 /* switch (true) {
    case: 
  }*/
} while (numero != numeroAadivinar);
