<?php
session_start();

try {
    $dwes = new PDO('mysql:host=localhost;dbname=discografia', 'discografia', 'discografia');
    if ($_SERVER['REQUEST_METHOD'] === "POST" && isset($_POST['usuario']) && isset($_POST['clave'])) {
        $usuario = $_POST['usuario'];
        $clave = $_POST['clave'];

        $consulta = $dwes->prepare('SELECT * FROM tabla_usuarios WHERE usuario = ?');
        $consulta->bindParam(1, $usuario);
        $consulta->execute();
        if ($resultado = $consulta->fetch()) {
            if (password_verify($clave, $resultado['password'])) {
                $_SESSION['usuario'] = $resultado['usuario'];
                header("Location: main.php");
                exit();
            } else {
                $_SESSION['error'] = "La clave no es correcta.";
            }

        } else {
            $_SESSION['error'] = "El usuario no existe.";
        }
    }

} catch (PDOException $e) {
    echo $e->getMessage();

}



echo '<h1>Inicio de sesion:</h1>';

if (isset($_SESSION['error'])) {
    echo '<p style="color: red;">' . htmlspecialchars($_SESSION['error']) . '</p>';
    unset($_SESSION['error']);
}

echo '<form action="#" method="POST">';
echo '<label for="usuario">Usuario: </label>';
echo '<input type="text" name="usuario" id="usuario"><br><br>';
echo '<label for="clave">Clave: </label>';
echo '<input type="password" name="clave" id="clave"><br><br>';
echo '<input type="submit" value="Inicia">';
echo '<br><br>';



?>