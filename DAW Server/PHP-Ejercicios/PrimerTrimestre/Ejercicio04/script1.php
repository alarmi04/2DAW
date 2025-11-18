<?php
// Hago una funcion para la suma de dos parametros.
function suma($num1, $num2)
{
    // Si los numeros son numericos se suman, sino se lanza la excepcion.
    if (is_numeric($num1) && is_numeric($num2)) {
        return $num1 + $num2;
    } else {
        throw new Exception("El valor tiene que ser numerico");
    }
}


// Se hace un try catch para ver si falla la funcion y lalnzar la excepcion.
try {
    echo 'La suma de 13 + 43 = ' . suma("ola", 43);
} catch (Exception $e) {
    echo $e->getMessage();
}


?>