<?php
require_once './verificarsesion.php';
require_once "./header.inc.php";
try {
    $idUsuario = $_GET['id'];
    $dwes = new PDO('mysql:host=localhost;dbname=discografia', 'discografia', 'discografia');
    $consulta = $dwes->prepare('SELECT codigo, titulo FROM album');
    $consulta->execute();

    if (isset($_GET['mensaje'])) {
        $mensaje = htmlspecialchars($_GET['mensaje']);
        echo "<script>alert('$mensaje');</script>";
    }

    echo '<h1>Discos:</h1>';
    echo '<table>';
    while (($resultado = $consulta->fetch()) != Null) {
        echo '<tr>';
        echo '<td><a href="./disco.php?codigo=' . $resultado['codigo'] . '">' . $resultado['titulo'];
        echo '</tr>';
    }
    echo '</table>';

    echo '<br><br><h2>Opciones:</h2><a href="./albumnuevo.php">Añade un album</a>';
    echo '<br><a href="./canciones.php">Busca canciones</a>';
    echo '<br><a href="./perfil.php?id=' . $idUsuario . '">Perfil</a>';
} catch (Exception $e) {
    echo $e->getMessage();
    header('Location: ./main.php');
    exit;
}

?>