<?php
require_once "./header.inc.php";

$dwes = new PDO("mysql:host=localhost;dbname=discografia", 'discografia', 'discografia');
$generos = ['Acustica', 'BSO', 'Blues', 'Folk', 'Jazz', 'New age', 'Pop', 'Rock', 'Electronica'];

echo '<h1>Búsqueda de canciones</h1>';

echo '<form action="#" method="post">';
echo '<label for="textoBuscar">Texto a buscar: </label>';
echo '<input type="text" id ="textoBuscar" name="textoBuscar">';
echo '<br><br><laber for="dondeBuscar">Buscar en: </label>';
echo '<input type="radio" name="dondeBuscar" value="cancion" id="cancion">';
echo '<label for="cancion">Títulos de cancion</label>';
echo '<input type="radio" name="dondeBuscar" value="album" id="album">';
echo '<label for="album">Nombres de álbum</label>';
echo '<input type="radio" name="dondeBuscar" value="ambos" id="ambos">';
echo '<label for="ambos">Ambos</label>';
echo '<br><br><label for="genero">Género musical: </label>';
echo '<select name="genero" id="genero">';
foreach ($generos as $value) {
    echo '<option value="' . $value . '">' . $value . '</option>';
}
echo '</select>';
echo '<br><br><button type="submit">Buscar</button>';
echo '</form>';


if ($_SERVER['REQUEST_METHOD'] === "POST" && isset($_POST['textoBuscar']) && isset($_POST['dondeBuscar']) && isset($_POST['genero'])) {
    $textoBuscar = $_POST['textoBuscar'];
    $busquedas = isset($_COOKIE['busqueda']) ? json_decode($_COOKIE['busqueda']) : [];
    array_unshift($busquedas, $textoBuscar);
    $busquedas = array_splice($busquedas, 0, 4);
    setcookie('busqueda', json_encode($busquedas), time() + 3600);
    $dondeBuscar = $_POST['dondeBuscar'];
    $genero = $_POST['genero'];
    try {
        switch ($dondeBuscar) {
            case "cancion":
                $consulta = $dwes->prepare('SELECT titulo FROM cancion WHERE titulo LIKE ? AND genero = ?');
                $textoBuscar = "%" . $textoBuscar . "%";
                $consulta->bindParam(1, $textoBuscar);
                $consulta->bindParam(2, $genero);
                $consulta->execute();
                echo '<br><h3>Lista de canciones: </h3>';

                while ($resultado = $consulta->fetch()) {
                    echo '<p>' . $resultado['titulo'] . '</p>';
                }
                break;
            case "album":
                $consulta = $dwes->prepare('SELECT titulo, codigo FROM album WHERE titulo LIKE ? AND genero = ?');
                $textoBuscar = "%" . $textoBuscar . "%";
                $consulta->bindParam(1, $textoBuscar);
                $consulta->bindParam(2, $genero);
                $consulta->execute();
                echo '<br><h3>Lista de canciones: </h3>';
                while ($resultado = $consulta->fetch()) {
                    $consulta2 = $dwes->prepare('SELECT titulo FROM cancion WHERE album = ?');
                    $consulta2->bindParam(1, $resultado['codigo']);
                    $consulta2->execute();
                    while ($resultado2 = $consulta2->fetch()) {
                        echo '<p>' . $resultado2['titulo'] . '</p>';
                    }
                }
                break;
            case "ambos":
                $consulta = $dwes->prepare(
                    'SELECT cancion.titulo AS cancion_titulo FROM cancion LEFT JOIN album ON cancion.album = album.codigo WHERE cancion.titulo LIKE ? OR album.titulo LIKE ? AND genero = ?'
                );
                $textoBuscarParam = "%" . $textoBuscar . "%";
                $consulta->bindParam(1, $textoBuscarParam);
                $consulta->bindParam(2, $textoBuscarParam);
                $consulta->bindParam(3, $genero);
                $consulta->execute();

                echo '<br><h3>Lista de canciones: </h3>';
                while ($resultado = $consulta->fetch()) {
                    echo '<p>' . $resultado['cancion_titulo'] . '</p>';
                }
                break;
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

if (isset($busquedas)) {
    echo "<h3>Últimas búsquedas:</h3>";
    foreach ($busquedas as $busqueda) {
        echo "<li>" . htmlspecialchars($busqueda) . "</li>";
    }
}

?>