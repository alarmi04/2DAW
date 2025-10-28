<?php

session_start();

$dwes = new PDO("mysql:host=localhost;dbname=discografia", 'discografia', 'discografia');
$dwes->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    if ($_SERVER['REQUEST_METHOD'] === "POST" && isset($_POST['usuario']) && isset($_POST['clave']) && isset($_POST['claveRepetida'])) {
        $usuario = $_POST['usuario'];
        $clave = $_POST['clave'];
        $claveRepetida = $_POST['claveRepetida'];

        if ($clave !== $claveRepetida) {
            throw new Exception('Las contraseñas no coinciden');
        }

        $consulta = $dwes->prepare('SELECT * FROM tabla_usuarios WHERE usuario = ?');
        $consulta->execute([$usuario]);

        if ($consulta->fetch()) {
            $_SESSION['error'] = "Este usuario ya existe.";
            header("Location: registro.php");
            exit;
        }

        $dwes->beginTransaction();
        $claveHash = password_hash($clave, PASSWORD_DEFAULT);
        $insert = $dwes->prepare('INSERT INTO tabla_usuarios (usuario, password) VALUES (?,?)');
        $insert->execute([$usuario, $claveHash]);
        $dwes->commit();

        header("Location: ./main.php");
        exit();
    }
} catch (PDOException $e) {
    $dwes->rollBack();
} catch (Exception $e) {
    $dwes->rollBack();
}

echo '<!DOCTYPE html>';
echo '<html lang="es">';
echo '<head>';
echo '<meta charset="UTF-8">';
echo '<title>Registro</title>';
echo '</head>';
echo '<body>';
echo '<h1>Registro:</h1>';

if (isset($_SESSION['error'])) {
    echo '<p style="color: red;">' . htmlspecialchars($_SESSION['error']) . '</p>';
    unset($_SESSION['error']);
}

echo '<form action="#" method="POST">';
echo '<label for="usuario">Usuario: </label>';
echo '<input type="text" name="usuario" id="usuario" required><br><br>';
echo '<label for="clave">Clave: </label>';
echo '<input type="password" name="clave" id="clave" required><br><br>';
echo '<label for="claveRepetida">Confirma la clave: </label>';
echo '<input type="password" name="claveRepetida" id="claveRepetida" required><br><br>';
echo '<input type="submit" value="Registrar">';
echo '<br><br>';
echo '<a href="./login.php">Inicia sesión</a>';
echo '</form>';
echo '</body>';
echo '</html>';

?>