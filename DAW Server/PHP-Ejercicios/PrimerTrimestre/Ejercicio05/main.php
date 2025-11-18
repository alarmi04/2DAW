<?php
// LLamo una sola vez a todas las clases creadas.
require_once "CintaVideo.php";
require_once 'Soporte.php';
require_once 'Dvd.php';
require_once 'Juego.php';

// Creo un objeto de la clase Soporte, al cual le paso los parametros necesarios para instanciarlo.
$soporte1 = new Soporte("Tenet", 22, 3);
// Muestro el título, el precio sin IVA y con IVA, y muestro un resumen creado en la clase soporte.
echo "<strong>" . $soporte1->titulo . "</strong>";
echo "<br>Precio: " . $soporte1->precio . " euros";
echo "<br>Precio IVA incluido: " . $soporte1->getPrecioConIVA() . " euros";
$soporte1->muestraResumen();

// Creo un objeto de la clase CintaVideo, esta clase hereda de la clase Soporte, entonces 
// hay q pasarle los atributos del padre y del hijo.
// Muestro la información de CintaVideo.
$miCinta = new CintaVideo("Los cazafantasmas", 23, 3.5, 107);
echo "<br><strong>" . $miCinta->titulo . "</strong>";
echo "<br>Precio: " . $miCinta->precio . " euros";
echo "<br>Precio IVA incluido: " . $miCinta->getPrecioConIva() . " euros";
$miCinta->muestraResumen();

// Creo un objeto de la clase Dvd, esta clase hace lo mismo que la anterior, es decir, hereda de 
// Soporte.
// Muestro su información.
$miDvd = new Dvd("Origen", 24, 15, "es,en,fr", "16:9");
echo "<br><strong>" . $miDvd->titulo . "</strong>";
echo "<br>Precio: " . $miDvd->precio . " euros";
echo "<br>Precio IVA incluido: " . $miDvd->getPrecioConIva() . " euros";
$miDvd->muestraResumen();

// Creo un objeto de la clase Juego, al igual que las anteriores, hereda de Soporte.
// Muestro su información.
$miJuego = new Juego("The Last of Us Part II", 26, 49.99, "PS4", 1, 1);
echo "<br><strong>" . $miJuego->titulo . "</strong>";
echo "<br>Precio: " . $miJuego->precio . " euros";
echo "<br>Precio IVA incluido: " . $miJuego->getPrecioConIva() . " euros";
$miJuego->muestraResumen();

?>