<?php

// Creo una clase para una excepcion.
class excepcionPersonalizada extends Exception
{
    // Creo una funcion para mostrar el mensaje de error.
    public function errorMensaje()
    {
        $errorMsg = 'No puede dividirse por 0.';
        return $errorMsg;
    }
}

// Creo una funcion a la cual se le pasan dos parametros a dividir, y depende de 
// si son numericos o no lanza una excepcion y si el divisor es 0 tambien pero la creada en la clase.
function divide($num1, $num2)
{
    if (is_numeric($num1) && is_numeric($num2)) {
        if ($num1 !== 0 && $num2 !== 0) {
            return $num1 / $num2;
        } else {
            throw new excepcionPersonalizada();

        }
    } else {
        throw new Exception("Los datos han de ser numericos.");
    }
}

// En el try catch llamo a la función pasandole las dos variables a evaluar.
try {
    $num1 = 45;
    $num2 = 3;
    echo 'La division de ' . $num1 . " / " . $num2 . " = " . divide($num1, $num2);
} catch (excepcionPersonalizada $e) {
    echo $e->errorMensaje();
}
?>