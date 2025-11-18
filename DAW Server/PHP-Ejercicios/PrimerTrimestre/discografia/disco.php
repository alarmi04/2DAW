<?php

try {
    $dwes = new PDO("mysql:host=localhost;dbname=discografia", 'discografia', 'discografia');
    $cod_disco = $_GET['codigo'];
    $consulta = $dwes->prepare('SELECT * FROM cancion WHERE album = ?');
    $consulta->bindParam(1, $cod_disco);
    $consulta->execute();

    echo '<a href="./cancionnueva.php?codigo=' . $cod_disco . '">' . 'Añadir canciones' . '</a>';
    echo '<br><br>';
    echo '<a href="./borraralbum.php?codigo=' . $cod_disco . '">' . 'Borrar album y sus canciones' . '</a>';
    echo '<br><br>';

    echo '<table style="border: 2px solid black">';
    echo '<tr>';
    echo '<th>Nombre</th>';
    echo '<th>Posición</th>';
    echo '<th>Duracion</th>';
    echo '<th>Genero</th>';
    echo '</tr>';
    while ($resultado = $consulta->fetch()) {
        echo '<tr">';
        echo '<td style="border:2px solid black">' . $resultado['titulo'];
        echo '<td style="border:2px solid black">' . $resultado['posicion'];
        echo '<td style="border:2px solid black">' . $resultado['duracion'];
        echo '<td style="border:2px solid black">' . $resultado['genero'];
        echo '</tr>';
    }
    echo '</table>';

} catch (PDOException $e) {
    echo $e->getMessage();
}



?>