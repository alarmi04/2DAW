// Declaro los arrys y pido al usuario que introduzca una palabra.
let palabrasArr = [];
let palabra = prompt("Introduce una palabra: ");
let palabrasAeliminar = [];

// Bucle que mientras no se cancela o no haya palabra siga preguntando.
while (palabra !== "" && palabra !== null) {
  // Añado la palabra al array.
  palabrasArr.push(palabra);

  // Recorro la palabra para ver si algun caracter es un numero o si la palabra contiene
  // algun espacio en blanco despues de eliminar los laterales.
  for (let i = 0; i < palabra.length; i++) {
    if (!isNaN(parseFloat(palabra[i])) || palabra.trim().includes(" ")) {
      palabrasAeliminar.push(palabra);
      break;
    }
  }

  // Vuelvo a preguntar la palabra.
  palabra = prompt("Introduce una palabra: ");
}

// Recorro las palabras a eliminar y las elimino del array principal.
for (let p of palabrasAeliminar) {
  palabrasArr.splice(palabrasArr.indexOf(p), 1);
}

// Ordena de Z a A las palabras del array.
palabrasArr.sort((a, b) => b.localeCompare(a));

// Muestro palabra a palabra.
for (let palabra of palabrasArr) {
  console.log(`El elemento ${palabrasArr.indexOf(palabra)} es: ${palabra}`);
}
