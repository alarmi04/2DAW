<?php
// Agrego la cabecera con "include_once" para que se cargue solo una vez.
include_once "./cabecera.inc.php";

// Muestro en el HTML los datos recibidos del formulario.
echo "<h2>Datos de contacto</h2>";
echo "Nombre: " . $_POST['nombre'] . "<br>Apellidos: " . $_POST['apellidos'];

// Valido el "email".
if (!filter_var($_POST['correo'], FILTER_VALIDATE_EMAIL)) {
    echo "<br>Formato de correo no válido.";
} else {
    echo "<br>Email: " . $_POST['correo'];
}
;

// Sigo mostrando información.
echo "<br>Fecha: " . $_POST['fecha'];
echo "<br>Consulta: " . $_POST['consulta'];

// Agrego el footer.
include_once "./footer.inc.php";
?>