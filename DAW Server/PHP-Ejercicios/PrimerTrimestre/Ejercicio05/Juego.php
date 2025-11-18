<?php
// Llamo a la clase Soporte.
require_once './Soporte.php';

// Creo la clase heredando de Soporte.
class Juego extends Soporte
{
    // Creo los atributos personales de esta clase.
    public $consola;
    private $minNumJugadores;
    private $maxNumJugadores;

    // Creo el constrructor pasandole los atributos de la clase padre y los nuevos.
    public function __construct($titulo, $numero, $precio, $consola, $minNumJugadores, $maxNumJugadores)
    {
        // Asigno los atributos del padre al padre y del hijo al hijo.
        parent::__construct($titulo, $numero, $precio);
        $this->consola = $consola;
        $this->minNumJugadores = $minNumJugadores;
        $this->maxNumJugadores = $maxNumJugadores;
    }

    // Muestro los jugadores posibles devolviendo un string segun los jugadores que sean.
    // Uso los atributos "$numMinJugadores" y "$numMaxJugadores" para hacer las condiciones.
    public function muestraJugadoresPosibles()
    {
        if ($this->minNumJugadores === 1 && $this->maxNumJugadores === 1)
            return '<br>Para un jugador';
        if ($this->minNumJugadores === $this->maxNumJugadores)
            return '<br>Para ' . $this->maxNumJugadores . ' jugadores';
        if ($this->minNumJugadores !== $this->maxNumJugadores)
            return '<br>De ' . $this->minNumJugadores . ' a ' . $this->maxNumJugadores . ' jugadores';
    }

    // Muestor el resumem por pantalla.
    public function muestraResumen()
    {
        echo '<br>Juego para: ' . $this->consola . '<br>' . $this->titulo . '<br>' . $this->precio . ' € (IVA no incluido)' . $this->muestraJugadoresPosibles();
    }
}

?>