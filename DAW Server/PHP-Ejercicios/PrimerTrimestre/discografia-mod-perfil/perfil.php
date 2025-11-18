<?php

try {
    $dwes = new PDO("mysql:host=localhost;dbname=discografia", 'discografia', 'discografia');
    $idUsuario = $_GET['id'];
    $consulta = $dwes->prepare('SELECT * FROM tabla_usuarios WHERE id = ?');
    $consulta->bindParam(1, $idUsuario);
    $consulta->execute();
    if ($resultado = $consulta->fetch()) {
        echo '<h2>Información personal</h2>';
        echo '<h3>Usuario:</h3>' . $resultado['usuario'];
        echo '<br><img src="'.$resultado['foto'].'"></img>';
        echo '<br><br><a href="./main.php?id='.$idUsuario.'">Volver a main</a>';
    }
} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}

?>