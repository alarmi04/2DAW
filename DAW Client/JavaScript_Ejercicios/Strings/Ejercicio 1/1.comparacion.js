// Creo la función flecha para comparar con un if ternario si las cadenas son iguales o no.
const arrowFunction = (primeraCadena, segundaCadena) =>
  primeraCadena === segundaCadena
    ? alert(`La cadena "${primeraCadena}" es igual a "${segundaCadena}"`)
    : alert(`La cadena "${primeraCadena}" es distinta a "${segundaCadena}"`);

// Declaro la variable para poder manejar el do while.
let seguirJugando = true;
do {

// Declaro las cadenas a comparar más tarde usando prompt y trim() para eliminar los espacios en blanco
// tanto delante como detrás.
let primeraCadena = prompt("Introduce una cadena: ").trim();
let segundaCadena = prompt("Introduce la segunda cadena: ").trim();

// Llamo a la función flecha.
arrowFunction(primeraCadena, segundaCadena);

// Uso un window.confirm para preguntar si quiero seguir jugado o no y con un if ternario ealuo la respuesta.
window.confirm("¿Quieres seguir jugando?") ? null : seguirJugando = false;
} while (seguirJugando);



