<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./examen.css?v=1">
    <title>Búsqueda de Pokemon:</title>
    <?php
    include_once('./funciones.php');
    ?>
</head>

<body>
    <?php
    include_once('header.inc.php');
    ?>

    <nav>
        <?php
        mostrarRegiones();
        ?>
    </nav>

    <div id="iniciales" style="display:flex;flex-direction:row;gap:300px;">
        <div style="display:flex;flex-direction:column;">
            <form action="busqueda.php" method="GET">
                <h1>Búsqueda de Pókemon</h1>

                <label for="pokemon">Nombre: </label>
                <input type="text" name="pokemon" id="pokemon"><br><br>

                <label for="regiones">Región: </label>
                <?php selectDeRegiones(); ?>
                <br><br>

                <label for="tipos">Tipo: </label>
                <?php selectDeTipos(); ?>
                <br><br>

                <input type="submit" value="Buscar">
            </form>
        </div>
        <div>
            <?php
            // Lógica de búsqueda combinada
            if (isset($_GET['regiones']) && $_GET['regiones'] != 'selecciona') {
                busquedaPokemonsRegion();
            } elseif (isset($_GET['tipos']) && $_GET['tipos'] != 'selecciona') {
                busquedaPokemonsTipos();
            } elseif (isset($_GET['pokemon']) && !empty($_GET['pokemon'])) {
                busquedaPokemonPorNombre();
            }
            ?>
        </div>
    </div>

    <?php
    include_once('./footer.inc.php');
    ?>

</body>

</html>