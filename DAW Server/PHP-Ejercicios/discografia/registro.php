<?php

session_start();
$dwes = new PDO("mysql:host=localhost;dbname=discografia", 'discografia', 'discografia');
$dwes->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    if ($_SERVER['REQUEST_METHOD'] === "POST" && isset($_POST['usuario']) && isset($_POST['clave']) && isset($_POST['claveRepetida']) && isset($_FILES['archivo']) && $_FILES['archivo']['error'] === UPLOAD_ERR_OK) {
        $usuario = $_POST['usuario'];
        $clave = $_POST['clave'];
        $claveRepetida = $_POST['claveRepetida'];
        $foto = $_FILES['archivo'];

        if ($clave !== $claveRepetida) {
            $_SESSION['error'] = "Las contraseñas no coinciden.";
            header("Location: registro.php");
            exit;
        }

        $consulta = $dwes->prepare('SELECT * FROM tabla_usuarios WHERE usuario = ?');
        $consulta->execute([$usuario]);

        if ($consulta->fetch()) {
            $_SESSION['error'] = "Este usuario ya existe.";
            header("Location: registro.php");
            exit;
        }

        $finfo = new finfo(FILEINFO_MIME_TYPE);
        if (
            false === $ext = array_search(
                $finfo->file($_FILES['archivo']['tmp_name']),
                array(
                    'jpg' => 'image/jpeg',
                    'png' => 'image/png',
                ),
                true
            )
        ) {
            $_SESSION['error'] = "Formato de fichero no valido";
            header("Location: registro.php");
            exit;
        }
        $tamanyo = getimagesize($_FILES['archivo']['tmp_name']);
        $ancho = $tamanyo[0];
        $alto = $tamanyo[1];
        if ($ancho > 360 || $alto > 480) {
            $_SESSION['error'] = "No es un tamaño válido, tamaño máximo permitido 360x480px.";
            header("Location: registro.php");
            exit;
        } else {

            $uploads_dir = 'img/users/';
            $tmp_name = $_FILES["archivo"]["tmp_name"];

            $info = getimagesize($tmp_name);

            if ($info === false) {
                $_SESSION['error'] = "El archivo no es una imagen válida";
                header("Location: registro.php");
                exit;
            }

            if ($info['mime'] == 'image/jpeg') {
                $imagenOriginal = imagecreatefromjpeg($tmp_name);
                $extension = 'jpg';
            } elseif ($info['mime'] == 'image/png') {
                $imagenOriginal = imagecreatefrompng($tmp_name);
                $extension = 'png';
            }

            $imagenRedimensionada = imagescale($imagenOriginal, 360, 480);
            $imagenRedimensionada72 = imagescale($imagenOriginal, 72, 96);


            $nombreArchivo = $usuario . 'Big.' . $extension;
            $rutaDestino = $uploads_dir . $nombreArchivo;
            $nombreArchivo72 = $usuario . 'Small.' . $extension;
            $rutaDestino72 = $uploads_dir . $nombreArchivo72;

            if ($extension == 'jpg') {
                $resultado = imagejpeg($imagenRedimensionada, $rutaDestino);
                $resultado72 = imagejpeg($imagenRedimensionada72, $rutaDestino72);
            } else {
                $resultado = imagepng($imagenRedimensionada, $rutaDestino);
                $resultado72 = imagepng($imagenRedimensionada72, $rutaDestino72);
            }

            if (!$resultado || !file_exists($rutaDestino) || !$resultado72 || !file_exists($rutaDestino72)) {
                $_SESSION['error'] = "Error al guardar la foto.";
                header("Location: registro.php");
                exit;
            }

            imagedestroy($imagenOriginal);
            imagedestroy($imagenRedimensionada);
            imagedestroy($imagenRedimensionada72);

            // Guardar ruta para BD
            $nombreFotoParaBD = $rutaDestino;
        }






        $dwes->beginTransaction();
        $claveHash = password_hash($clave, PASSWORD_DEFAULT);
        $insert = $dwes->prepare('INSERT INTO tabla_usuarios (usuario, password, foto) VALUES (?,?,?)');
        $insert->execute([$usuario, $claveHash, $nombreFotoParaBD]);
        $dwes->commit();

        header("Location: ./main.php");
        exit();
    }
} catch (PDOException $e) {
    if ($dwes->inTransaction()) {
        $dwes->rollBack();
    }
} catch (Exception $e) {
    if ($dwes->inTransaction()) {
        $dwes->rollBack();
    }

    if (isset($rutaDestino) && file_exists($rutaDestino)) {
        unlink($rutaDestino);
    }
    if (isset($rutaDestino72) && file_exists($rutaDestino72)) {
        unlink($rutaDestino72);
    }
}

echo '<h1>Registro:</h1>';

if (isset($_SESSION['error'])) {
    echo '<p style="color: red;">' . htmlspecialchars($_SESSION['error']) . '</p>';
    unset($_SESSION['error']);
}

echo '<form action="#" method="POST" enctype="multipart/form-data">';
echo '<label for="usuario">Usuario: </label>';
echo '<input type="text" name="usuario" id="usuario" required><br><br>';
echo '<label for="clave">Clave: </label>';
echo '<input type="password" name="clave" id="clave" required><br><br>';
echo '<label for="claveRepetida">Confirma la clave: </label>';
echo '<input type="password" name="claveRepetida" id="claveRepetida" required><br><br>';
echo '<label for="archivo">Foto de perfil: </label>';
echo '<input type="file" name="archivo" id="archivo"><br><br>';
echo '<input type="submit" value="Registrar">';
echo '<br><br>';
echo '<a href="./login.php">Inicia sesión</a>';
echo '</form>';
echo '</body>';
echo '</html>';

?>