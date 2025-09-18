// Defino una función para analizar las cadenas a la cual le paso por parametro la cadena a analizar.
function analizarCadenas(cadena) {
  // Defino el array para añadir los caracteres sin repeticion y comprarar la cadena con esta.
  let cadenaSinRepeticion = [];
  // Defino la variable "repetido" para saber que caracter añadir al array.
  let repetido = false;
  // Hago un bucle para recorrer la cadena.
  for (let i = 0; i < cadena.length; i++) {
    repetido = false;
    // Hago un bucle para recorrer el array que esta vacio, al cual se le van a ir agregando
    // los caracteres repetidos.
    for (let j = 0; j < cadenaSinRepeticion.length; j++) {
      // Hago este condicional para comparar el caracter actual de la cadena con todos los caracteres
      // del array vacio, si esta repetido, es decir, ya esta en el array creado se pone la variable "repetido" a true.
      if (cadena[i] === cadenaSinRepeticion[j]) {
        repetido = true;
        break;
      }
    }
    // Si repetido es igual a false se añade el caracter porque quiere decir que no esta repetido.
    if (!repetido) {
      cadenaSinRepeticion.push(cadena[i]);
    }
  }
  // Devuelvo el array con los caracteres sin repetición.
  return cadenaSinRepeticion;
}

// Defino dos cadenas.
let cadena1 = prompt("Introduce una frase: ");
let cadena2 = prompt("Introduce otra frase: ");

// Comparo las cadenas para decidir cual se va a analizar.
if (cadena1.length > cadena2.length) {
  alert(`Vamos a analizar el texto "${cadena1}"`);
  alert(
    `Cadena "${cadena1}" sin repetición:\n${analizarCadenas(cadena1).join(",")}`
  );
} else {
  alert(`Vamos a analizar el texto "${cadena2}"`);
  alert(
    `Cadena "${cadena2}" sin repetición:\n${analizarCadenas(cadena2).join(",")}`
  );
}
