<?php
// Creo la conexión a la base de datos.
$dwes = new mysqli('localhost', 'root', '', 'tienda');
// Condición que dice que si el número de errores es distinto de null, es decir, hay 1 o más,
// se informa del error.
if ($dwes->connect_errno != null) {
    echo 'Error conectando a la base de datos';
    echo $dwes->connect_error;
    exit();
}
/*
$consulta = $dwes->stmt_init();
$consulta->prepare('SELECT cod, nombre_corto, descripcion FROM producto');
$consulta->execute();  
$consulta->bind_result($cod,$nombre_corto, $descripcion); 
echo '<table style="border: 2px solid black">';
while ($consulta->fetch()) {
    echo '<tr>';
    echo '<td style="border: 2px solid black"><a href="./stock.php?cod='.$cod.'">' . $nombre_corto . '</a></td>';
    echo '<td style="border: 2px solid black">' . $descripcion . '</td>';
    echo '</tr>';
}
echo '</table>';
*/

// Hago una consulta para mostrar todos los productos.
$resultado = $dwes->query('SELECT cod, nombre_corto, descripcion FROM producto');
// Creo una tabla para mostrar los datos en una tabla.
echo '<table style="border: 2px solid black">';
// Mientras la consulta devuelva filas se seguiran analizando cada fila.
while ($producto = $resultado->fetch_array()) {
    echo '<tr>';
    // Cono ? cod mando la variable que quiera por la URL.
    echo '<td style="border: 2px solid black"><a href="./stock.php?cod=' . $producto[0] . '">' . $producto[1] . '</a></td>';
    echo '<td style="border: 2px solid black">' . $producto[2] . '</td>';
    echo '</tr>';
}
echo '</table>';
?>