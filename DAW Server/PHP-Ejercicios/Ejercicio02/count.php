<?php
// Pongo el header.
include_once "../Ejercicio01/cabecera.inc.php";

// Genero la lista de 30 números.
echo "<h2>Lista de 30 números</h2>";
for ($i = 1; $i <= 30; $i++) {
    echo $i . "<br>";
}
$factorial = 1;
echo "<br>" . "5! = ";
for ($i = 5; $i >= 1; $i--) {
    if ($i == 1) {
        echo $i;
        $factorial *= $i;
    } else {
        echo $i . " x ";
        $factorial *= $i;
    }

}
;
echo " = " . $factorial;

// Pongo el footer.
include_once "./footer.inc.php";
?>