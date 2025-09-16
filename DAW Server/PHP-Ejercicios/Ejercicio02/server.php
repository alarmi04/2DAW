<?php
// Pongo el header.
include_once "../Ejercicio01/cabecera.inc.php";

// Creo la tabla.
echo "<table style='border: 2px solid black;'>";
// Creo un foreach para recorrer el diccionario "$_SERVER" 
// y crear las respectivas filas y columnas.
foreach ($_SERVER as $key => $value) {
    echo "<tr>";
    echo "<td style='border: 2px solid black; font-weight: bold'>" . $key . "</td>";
    echo "<td style='border: 2px solid black;'>" . $value . "</td>";
    echo "</tr>";
}
echo "</table>";

// Pongo el footer.
include_once "./footer.inc.php";
?>