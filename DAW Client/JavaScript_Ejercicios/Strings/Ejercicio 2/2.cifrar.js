// Declaro las variables para introducir el texto a cifrar y el desplazamiento.
let textoAcifrar = prompt("Introduce el texto a cifrar: ");
let desplazamiento = parseInt(prompt("Introduce un número entero: "));

// Hago un bucle para seguir preguntando mientras el valor introducido al desplazamiento sea incorrecto.
while (isNaN(desplazamiento)) {
    alert("Tiene que se un número entero.")
    desplazamiento = parseInt(prompt("Introduce un número entero: "));
}

// Declaro dos arrays para añadir los valores sacadosde las posiciones.
posiciones = [];
nuevosCaracteres = [];

// Recorro el string de texto a cifrar para añadir al array "posiciones" 
// el unicode + el desplazamiento de la letra correspondiente.
for (let i = 0; i < textoAcifrar.length; i++) {
    posiciones.push(textoAcifrar.charCodeAt(i) + desplazamiento);
}

// Recorro el array con las posiciones para añadir al array "nuevosCaracteres" el caracter que devuelva 
// Unicode sobre la posicion actual.
for (let i = 0; i< posiciones.length; i++) {
    nuevosCaracteres.push(String.fromCharCode(posiciones[i]));
}

// Defino la constante del texto cifrado a la que le sumo los arrays creados.
const textoCifrado = nuevosCaracteres.join("") + posiciones.join("");

// Genero una alerta mostrando el texto a cifrar y el cifrado.
alert(`Tu texto inicial es ${textoAcifrar} el cual cifrado es: ${textoCifrado}`);