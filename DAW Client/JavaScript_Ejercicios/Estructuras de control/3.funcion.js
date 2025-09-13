// Es una función que tiene que recibe dos parámetros uno con el número a multiplicar,
// y el otro las veces que ese número se tiene que multiplicar.
function doble(num, numDoble) {
  // Creo la variable "frase" a la cual le añado la frase inicial la cual muestra el numero y las veces
  // que se multiplica.
  let frase = `El número es: ${num} y se hallará el doble ${numDoble} veces:`;
  // Bucle for para recorrer en número de veces a multiplicar.
  for (let i = 0; i < numDoble; i++) {
    // Añado a la variable creada antes los resultados de las multiplicaciones.
    frase += "\n" + num * (i + 1);
  }
  return frase;
}

// Defino las constantes para pasarlas por parámetros a la función.
const num = prompt("Introduce un numero: ");
const numDoble = prompt("Introduce el doble: ", 3);
// Muestro el resultado de la función.
alert(doble(num, numDoble));
