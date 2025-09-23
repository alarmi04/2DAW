let fecha1 = prompt("Introduce una fecha (dia/mes/año): ");
let fecha2 = Date(prompt("Introduce otra fecha: "));

let fechaDesmontada = fecha1.split("/");
fechaReal1 = new Date(fechaDesmontada[1],fechaDesmontada[0],fechaDesmontada[2])
console.log(fechaDesmontada);
console.log(fecha1);