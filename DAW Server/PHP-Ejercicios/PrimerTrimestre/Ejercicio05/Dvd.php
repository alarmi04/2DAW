<?php
// LLamo una sola vez a la clase Soporte.
require_once './Soporte.php';

// Creo la clase Dvd que hereda de Soporte.
class Dvd extends Soporte
{
    // Creo sus atributos/propiedades propias de esta clase.
    public $idiomas;
    private $formatPantalla;

    // Creo un constructor para asignar los valores del padre al padre y del hijo al hijo.
    public function __construct($titulo, $precio, $numero, $idiomas, $formatPantalla)
    {
        parent::__construct($titulo, $precio, $numero);
        $this->idiomas = $idiomas;
        $this->formatPantalla = $formatPantalla;
    }

    // Muestro el resumen, es decir, su información
    public function muestraResumen()
    {
        echo '<br>Película en DVD:<br>' . $this->titulo . '<br>' . $this->precio . ' € (IVA no incluido)<br>Idiomas:' . $this->idiomas . '<br>Formato pantalla:' . $this->formatPantalla;
    }

}


?>