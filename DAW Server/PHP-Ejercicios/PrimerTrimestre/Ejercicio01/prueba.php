<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Primera prueba php</title>
</head>

<body>
    <?php
    $nombre = "Alberto Aracil Millan";
    $edad = 21;
    $cantidad = 3;
    $precio = 1.6;
    echo "<h1>$edad</h1>";
    ?>
    <?php
    include("archivo.php");
    include_once("otro.php");
    require("prueba.inc.php");
    require_once("inventado.php");
    ?>
</body>

</html>