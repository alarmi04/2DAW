const array20 = [];

for (let i = 0; i < 20; i++) {
  array20.push(Math.round(Math.random() * 10 + 1));
}

console.log("Array inicial: " + array20.join(","));

function parImpar(arr) {
  let par = [];
  let impar = [];

  arr.forEach((num) => {
    if (num % 2 == 0) {
      par.push(num);
    } else {
      impar.push(num);
    }
  });

  return [par, impar];
}

function tamanyoParImpar(arr) {
  let mitad = 0;
  if (arr.length % 2 == 0) {
    mitad = arr.length / 2;
    arr.splice(mitad - 1, 2);
  } else {
    mitad = Math.round(arr.length / 2);
    arr.splice(mitad - 1, 1);
  }
  return arr;
}

function sumarTodosLosElementos(arr) {
  total = 0;
  arr.forEach((num) => {
    total += num;
  });
  arr.push(total);
  return arr;
}

function mediaDeSusElementos(arr) {
  let ultimo = arr[arr.length - 1];
  let media = 0;
  arr.splice(arr.length - 1, 1);
  arr.forEach((num) => {
    media += num;
  });
  media = Math.round(media / arr.length);
  arr.unshift(media);
  arr.push(ultimo);
  return arr;
}

function multiplicarCadaElemento(arr) {
  let media = arr[0];
  let arrMul = [];
  arr.forEach((num) => {
    arrMul.push(num * media);
  });

  return arrMul;
}

function ordenadoSinRepetir(arr) {
  return [...new Set(arr)];
}

const arrPar = parImpar(array20)[0];
const arrImpar = parImpar(array20)[1];

console.log("Array par: " + arrPar.join(","));
console.log("Arrap impar: " + arrImpar.join(","));
arrPar.pop();
arrPar.shift();
console.log("Array par sin PRIMERO y ULTIMO: " + arrPar.join(","));
const arrImparSinElementosCentrales = tamanyoParImpar(arrImpar);
console.log(
  "Array impar sin elementos CENTRALES: " +
    arrImparSinElementosCentrales.join(",")
);
console.log(
  "Array PAR con la suma de sus elementos al final: " +
    sumarTodosLosElementos(arrPar).join(",")
);
console.log(
  "Array IMPAR con la suma de sus elementos al final: " +
    sumarTodosLosElementos(arrImparSinElementosCentrales).join(",")
);
const mediaPar = mediaDeSusElementos(arrPar);
console.log(
  "Array PAR con la media de sus elementos al principio: " + mediaPar.join(",")
);
const mediaImpar = mediaDeSusElementos(arrImpar);
console.log(
  "Array IMPAR con la media de sus elementos al principio: " +
    mediaImpar.join(",")
);

const multiplicarPar = multiplicarCadaElemento(mediaPar);
console.log(
  "Array PAR con cada elemento multiplicado por la media: " +
    multiplicarPar.join(",")
);

const multiplicarImpar = multiplicarCadaElemento(mediaImpar);
console.log(
  "Array IMPAR con cada elemento multiplicado por la media: " +
    multiplicarImpar.join(",")
);

const arrayFinal = [...multiplicarPar, ...multiplicarImpar];
const arrayFinalOrdenado = arrayFinal.sort((a, b) => a - b);
console.log("Array FINAL ordenado: " + arrayFinalOrdenado.join(","));
console.log(
  "Array FINAL ordenado SIN REPETIR: " +
    ordenadoSinRepetir(arrayFinalOrdenado).join(",")
);
