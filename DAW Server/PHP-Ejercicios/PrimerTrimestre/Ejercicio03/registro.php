<?php
// Creo las variables siguientes.
$exito = true; // Para manejar la vista del formulario.
$errores = []; // Para almacenar los errores a mostrar.
$mensajeExito = ""; // Para mostrar el mensaje de exito y manejar el formulario;

// Hago un condicional usando la varibale global $_SERVER para que si el REQUEST METHOD es en POST
// como e hace el formulario, asigne los valores del formulario a las variables.
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $nomUsu = $_POST['nomUsuario'];
    $clave1 = $_POST['clave'];
    $clave2 = $_POST['clavex2'];
    $correo = $_POST['correo'];
    $fechaNac = $_POST['fechaNacimiento'];
    
    // Como es un radio button, se puede enviar sin clicar pero no lo recoge como un string vacio.
    // Entonces hay que hacer una comprobacion de si la variables existe y si no existe se declara a vacia.
    isset($_POST['generos']) ? $generos = $_POST['generos'] : $generos = "";

    // Como es un checkbox, he puesto que los datos se guarden en un array, entonces es mas o menos parecido al anterior.
    isset($_POST['terminos']) ? $terminos = $_POST['terminos'] : $terminos = [];

    // Realizo las validaciones de los distintos campos del formulario.
    if (empty($nombre))
        $errores[] = "El nombre esta vacio";
    if (empty($apellidos))
        $errores[] = "El/los apellido/s esta/n vacio/s";
    if (empty($nomUsu))
        $errores[] = "El nombre de usuario esta vacio";
    if (empty($clave1))
        $errores[] = "La primera clave esta vacia";
    if (empty($clave2))
        $errores[] = "La segunda clave esta vacia";
    if (empty($correo))
        $errores[] = "El correo esta vacio";
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL))
        $errores[] = "Formato de correo no válido";
    if (empty($fechaNac))
        $errores[] = "Fecha de nacimiento no introducida";
    if (empty($generos))
        $errores[] = "Generos vacios";
    if (empty($terminos))
        $errores[] = "Los terminos estan vacios";
    if ($clave1 !== $clave2)
        $errores[] = "La contraseña es distinta.";
    if (!empty($errores))
        $exito = false;

    // Si no hay errores se le asigna el mensaje de exito a la variable para manejar el formulario.
    if ($exito) {
        $mensajeExito = "Registro completado con exito";
    }
}



?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
</head>

<body>
    <?php
    // Agrego la cabecera con "include_once" para que se cargue solo una vez.
    include_once "./cabecera.inc.php";

    // Si la vairbale "exito" es true es que no ha habido errores de validacion y hay q mostrar el mensaje
    // Pero como el ennunciado dice que solo se muestre el mensaje sin el fomrulario, hago otro condicional
    // para comprobar si la variable del mensaje esta vacia.
    if ($exito) {
        if (!empty($mensajeExito)) {
            echo '<p>' . $mensajeExito . '</p>';
        } else {

            ?>
            <!-- Hago el formulario con HTML -->
            <form action="#" method="post">
                <fieldset style="width: fit-content;">
                    <legend style="font-weight: bold;">Datos de registro:</legend>
                    <label for="nombre">Nombre: </label>
                    <input type="text" name="nombre" />
                    <br>
                    <label for="apellidos">Apellidos: </label>
                    <input type="text" name="apellidos" />
                    <br>
                    <label for="nomUsuario">Nombre de usuario: </label>
                    <input type="text" name="nomUsuario">
                    <br>
                    <label for="clave">Contraseña: </label>
                    <input type="password" name="clave">
                    <br>
                    <label for="clavex2">Repite contraseña: </label>
                    <input type="password" name="clavex2">
                    <br>
                    <label for="correo">Email: </label>
                    <input type="email" name="correo">
                    <br>
                    <label for="fechaNacimiento">Fecha de nacimiento: </label>
                    <input type="date" name="fechaNacimiento">
                    <br>
                    <fieldset>
                        <legend style="font-weight: bold;">Generos: </legend>
                        <input type="radio" name="generos" value="Masculino">
                        <input type="radio" name="generos" value="Femenino">
                    </fieldset>
                    <fieldset>
                        <legend style="font-weight: bold;">Terminos y condiciones:</legend>
                        <label>
                            Acepto las condiciones
                            <input type="checkbox" name="terminos[]" value="condiciones">
                        </label>
                        <br>
                        <label>
                            Acepto el envio de publicidad
                            <input type="checkbox" name="terminos[]" value="publicidad">
                        </label>
                    </fieldset>
                    <input type="submit">
                </fieldset>
            </form>

            <?php
        }
    }
    // Recorro el array de errores mostrandolos uno a uno.
    foreach ($errores as $value) {
        echo '<p>' . $value . '</p>';
    }
    // Agrego el footer.
    include_once "./footer.inc.php";
    ?>
</body>

</html>