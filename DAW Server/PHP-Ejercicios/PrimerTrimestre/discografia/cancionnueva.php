<?php

$dwes = new PDO("mysql:host=localhost;dbname=discografia", 'discografia', 'discografia');
$cod_album = $_GET['codigo'];
$generos = ['Acustica', 'BSO', 'Blues', 'Folk', 'Jazz', 'New age', 'Pop', 'Rock', 'Electronica'];

$dwes->beginTransaction();
try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['titulo']) && isset($_POST['posicion']) && isset($_POST['duracion']) && isset($_POST['genero'])) {
        $consulta = $dwes->prepare('INSERT INTO cancion (titulo, album, posicion, duracion, genero) VALUES (?,?,?,?,?) ');
        $resultado = $consulta->execute([$_POST['titulo'], $cod_album, $_POST['posicion'], $_POST['duracion'], $_POST['genero']]);
        if ($resultado) {
            $dwes->commit();
            header('Location: ' . $_SERVER['PHP_SELF'] . '?codigo=' . $cod_album . '&mensaje=' . urlencode('Canción:' . $_POST['titulo'] . ' agregada correctamente'));
            exit;
        }
    }

} catch (PDOException $e) {
    $dwes->rollBack();
    echo $e->getMessage();
}



try {
    $consulta = $dwes->prepare('SELECT codigo,titulo FROM album WHERE codigo = ?');
    $consulta->bindParam(1, $cod_album);
    $consulta->execute();
    while ($resultado = $consulta->fetch()) {
        echo '<h1>' . $resultado['titulo'] . '</h1>';
    }

    if (isset($_GET['mensaje'])) {
        $mensaje = htmlspecialchars($_GET['mensaje']);
        echo "<script>alert('$mensaje');</script>";
    }

    echo '<form action="#" method="post">';
    echo '<label for="titulo">Titulo:</label>';
    echo '<input type="text" name="titulo"></input><br>';
    echo '<label for="posicion">Posicion:</label>';
    echo '<input type="number" name="posicion"></input><br>';
    echo '<label for="duracion">Duracion:</label>';
    echo '<input type="text" name="duracion"></input><br>';
    echo '<label for="genero">Genero:</label>';
    echo '<select name="genero">';
    foreach ($generos as $value) {
        echo '<option value="' . $value . '">' . $value . '</option>';
    }
    echo '</select>';
    echo '<br><button type="submit">Agregar</button>';
    echo '</form>';
} catch (PDOException $e) {
    echo $e->getMessage();
}

?>