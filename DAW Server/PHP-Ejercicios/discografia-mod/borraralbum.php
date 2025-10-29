<?php
require_once './verificarsesion.php';

require_once "./header.inc.php";

$dwes = new PDO("mysql:host=localhost;dbname=discografia", 'discografia', 'discografia');
$cod_album = $_GET['codigo'];

$dwes->beginTransaction();
try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($cod_album)) {
        $consultaCanciones = $dwes->prepare('DELETE FROM cancion WHERE album = ?');
        $resultadoCanciones = $consultaCanciones->execute([$cod_album]);

        $consultaAlbum = $dwes->prepare('DELETE FROM album WHERE codigo = ?');
        $resultadoAlbum = $consultaAlbum->execute([$cod_album]);
        $dwes->commit();
        if ($resultadoCanciones && $resultadoAlbum) {
            header('Location: ./main.php?mensaje=' . urlencode("Album: ".$cod_album." eliminado correctamente"));
            exit;
        } else {
            $dwes->rollBack();
        }
    }

} catch (Exception $e) {
    $dwes->rollBack();
    echo $e->getMessage();
    header('Location: ./disco.php?codigo=' . $cod_album . '');
    exit;
}

?>