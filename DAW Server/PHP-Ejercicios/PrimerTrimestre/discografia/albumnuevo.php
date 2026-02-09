<?php

$dwes = new PDO("mysql:host=localhost;dbname=discografia", 'discografia', 'discografia');
$formato = ['vinilo', 'cd', 'dvd', 'mp3'];

$dwes->beginTransaction();
try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['titulo']) && isset($_POST['discografica']) && isset($_POST['formato']) && isset($_POST['fechaLanzamiento']) && isset($_POST['fechaCompra']) && isset($_POST['precio'])) {
        $consulta = $dwes->prepare('INSERT INTO album (titulo, discografica, formato, fechaLanzamiento, fechaCompra, precio) VALUES (?,?,?,?,?,?) ');
        $resultado = $consulta->execute([$_POST['titulo'], $_POST['discografica'], $_POST['formato'], $_POST['fechaLanzamiento'], $_POST['fechaCompra'], $_POST['precio']]);
        if ($resultado) {
            $dwes->commit();
            header('Location: ./main.php?mensaje=' . urlencode('Album:' . $_POST['titulo'] . ' creado correctamente'));
            exit;
        }
    }

} catch (Exception $e) {
    $dwes->rollBack();
    echo $e->getMessage();
}


echo '<form action="#" method="post">';
echo '<label for="titulo">Titulo:</label>';
echo '<input type="text" name="titulo"></input><br>';
echo '<label for="discografia">Discografica:</label>';
echo '<input type="text" name="discografica"></input><br>';
echo '<label for="formato">Formato</label>';
echo '<select name="formato">';
foreach ($formato as $value) {
    echo '<option value="' . $value . '">' . $value . '</option>';
}
echo '</select>';
echo '<br><br><label for="fechaLanzamiento">Fecha de lanzamiento:</label>';
echo '<input type="date" name="fechaLanzamiento"></input><br>';
echo '<label for="fechaCompra">Fecha de compra:</label>';
echo '<input type="date" name="fechaCompra"></input><br>';
echo '<label for="precio">Precio:</label>';
echo '<input type="number" name="precio" step="0.01"></input><br>';
echo '<br><button type="submit">Agregar</button>';
echo '</form>';

?>