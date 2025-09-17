// Defino el objeto literal intervaloNumeros, añadiendo las propiedades "numeroMin" y "numeroMax"
// junto a un get y un set.
const intervaloNumeros = {
  // Le pido al usuario que introduzca los datos para hacer el intervalo.
  numeroMin: parseInt(prompt("Introduce un número: ")),
  numeroMax: parseInt(prompt("Introduce un número mayor que el anterior: ")),

  // Hago un getter para devolver los numeros comprendidos entre el "numeroMin" y "numeroMax".
  get numeroComprendidos() {
    let arrNumeros = [];
    let numMinGet = this.numeroMin;
    while (numMinGet <= this.numeroMax) {
      arrNumeros.push(numMinGet);
      numMinGet++;
    }
    return arrNumeros;
  },

  // Hago setter para asignarle nuevamente a las propiedades "numeroMin" y "numeroMax"
  // sus nuevos valores dados por el array aleatorio.
  set modProp(numerosAleatorios) {
    let guardarMin = Infinity;
    let guardarMax = -Infinity;
    for (let i = 0; i < numerosAleatorios.length; i++) {
      if (numerosAleatorios[i] > guardarMax) guardarMax = numerosAleatorios[i];
      if (numerosAleatorios[i] <= guardarMin) guardarMin = numerosAleatorios[i];
    }
    this.numeroMin = guardarMin;
    this.numeroMax = guardarMax;
  },
};

// Escribo en el html la información a mostrar.
document.writeln(
  "<h1>El array según su intervalo es: " +
    intervaloNumeros.numeroComprendidos.join(",") +
    "</h1>"
);
document.writeln(
  "<h2>El valor mínimo del array es: " + intervaloNumeros.numeroMin
);
document.writeln(
  "<h2>El valor máximo del array es: " + intervaloNumeros.numeroMax
);

// Declaro el array y le asigno los valores aleatorios.
let randomArr = [];
for (let i = 0; i < 5; i++) {
  randomArr.push(parseInt(Math.random() * 100 + 1));
}

// Vuelvo a mostrar la información necesaria para mostrar el array aleatorio.
document.writeln(
  "<h1>El array con números aleatorios es: " + randomArr.join(",")
);
intervaloNumeros.modProp = randomArr;
document.writeln(
  "<h2>El valor mínimo del nuevo array es: " + intervaloNumeros.numeroMin
);
document.writeln(
  "<h2>El valor máximo del nuevo array es: " + intervaloNumeros.numeroMax
);
