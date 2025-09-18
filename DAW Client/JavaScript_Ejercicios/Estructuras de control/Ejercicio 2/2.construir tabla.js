// Defino las variables para las filas y columnas.
const filas = prompt("Introduce el número de filas:");
const columnas = prompt("Introduce el número de columnas:");

// Recorro las filas y dentro de cada fila recorro sus columnas, para crear las celdas y filas.
for (let i = 0; i < filas; i++) {
    // Hago un querySelector al id de la tabla y le añado una fila con id para poder añadir las celdas,
    //  ya que sin id las celdas se añaden como si fuesen más filas.
    document.querySelector("#tabla").innerHTML += "<tr id=fila"+i+">";
    for (let j = 0;j < columnas; j++) {
        // Añado las celdas/columnas al id de la fila que se esta recorriendo en ese momento.
        document.querySelector("#fila"+i).innerHTML += "<td>Alberto Aracil Millan</td>";
    }
    document.querySelector("#tabla").innerHTML += "</tr>";
}