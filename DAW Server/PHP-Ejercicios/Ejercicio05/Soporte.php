<?php
// Creo la clase padre.
class Soporte {
    // Creo sus atributos. public puede acceder cualquier clase incluyendo las hijas.
    // Protected solo la misma clase y las hijas.
    // Private solo para la misma clase.
    public $titulo;
    protected $numero;
    private $precio;
    // Hago una constante para el valor del IVA.
    private const VAT = 0.21;

    // Hago un constructor a la clase para asignar los valores a sus variables, mediante la instancia.
    public function __construct($titulo, $numero, $precio) {
        $this->titulo = $titulo;
        $this->precio = $precio;
        $this->numero = $numero;
    }

    // Hago un método mágico de setter, para poder asignar a cualquier atributo su valor,
    // con este método también se puede acceder en las clases hijas a los demás atributos sin
    // necesidad de poner setPrecio() ya que el método mágico lo detecta solo, es decir,
    // puedes usar $this->propiedad.
    public function __set($propiedad, $valor){
        $this->$propiedad = $valor;
    }

    // Al igual que el setter es un método mágico, pero para obtener la información.
    public function __get($propiedad) {
        return $this->$propiedad;
    }

    // Defino un getter para devolver el precio con IVA, al hacer una constante automáticamente
    // estas diciendo que es estático el atributo en este caso, por lo que se le llama con self::VAT.
    // Estático quiere decir que no necesita de una instancia para ser llamado o usado, es decir,
    // va con la clase y no la instancia.
    public function getPrecioConIva() {
        return round($this->precio + $this->precio * self::VAT,2);
    }

    // Función para mostrar en pantalla el resumen.
    public function muestraResumen(){
        echo '<br>'.$this->titulo. '<br>'. $this->precio. ' € (IVA no incluido)';
    }
}
?>