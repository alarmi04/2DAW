<?php
// Llamo a la clase Soporte.
require_once 'Soporte.php';

// Creo la clase CintaVideo que hereda de Soporte.
class CintaVideo extends Soporte
{
    // Creo su atributo propio.
    private $duracion;

    // Creo el constructor para asignar las variables tanto del padre como del hijo.
    public function __construct($titulo, $numero, $precio, $duracion) {
        parent::__construct($titulo, $numero, $precio);
        $this->duracion = $duracion;
    }

    // Función para mostrar un resumen sobre la clase.
    public function muestraResumen()
    {
        echo '<br>Película en VHS:<br>' . $this->titulo . '<br>' . $this->precio . ' € (IVA no incluido)<br>Duración: ' . $this->duracion . ' minutos.';
    }

}


?>