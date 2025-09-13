function esPrimo(num) {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
}

function cualesSonPrimos(num) {
    let acu = 0;
    for (let i = 0; i <= num; i++) {
        if (esPrimo(i)) {
            console.log(`El número ${i} es primo.`);
            acu++;
        }
    }
    console.log(`Entre el número 1 y ${num} hay ${acu} números primos.`);
}


let opcion = parseInt(prompt(
  "Elige una de estas dos opciones; Indica 1 ó 2\n1.¿Tu número es primo?\n2.Primos hasta tu número"
));

let num = parseInt(prompt("Introduce un número: "));
switch (opcion) {
  case 1:
    esPrimo(num) ? alert(`El número ${num} es primo`) : alert(`El número ${num} no es primo`);
    break;
  case 2:
    cualesSonPrimos(num);
    break;
  default:
    alert("Número introducido erróneo (1 ó 2).");
    break;
}
