<?php
// Creo la conexión a la base de datos.
$dwes = new mysqli('localhost', 'root', '', 'tienda');
// Condición que dice que si el número de errores es distinto de null, es decir, hay 1 o más,
// se informa del error.
if ($dwes->connect_errno != null) {
    echo 'Error conectando a la base de datos';
    echo $dwes->connect_error;
    exit();
}

$codProducto = $_GET['cod'];

/*$resultado = $dwes->query("SELECT SUM(unidades) AS total_unidades FROM stock WHERE producto='$codProducto'");
while ($unidades = $resultado->fetch_array()) {
    echo '<h1>' . $codProducto . '</h1>';
    echo 'Las unidades totales de este producto son: ' . $unidades[0] . " unidades.<br>";
}*/


// Desactivo el autocommit para que la consulta no e ejecute directamente.
$dwes->autocommit(false);
// Envuelvo el código en un try catch para que si salta un error haga rollback.
try {
    // Hago una condición para validar las unidades.
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['unidades'])) {
        // Recorro el array asociativo de las unidades[i].
        foreach ($_POST['unidades'] as $tienda => $unidades_act) {
            // Preparo la consulta, que se actualicen las unidades.
            $actualizar_stock = $dwes->prepare('UPDATE stock SET unidades=? WHERE producto=? AND tienda=?');
            // Digo los parametros a poner en la consulta.
            $actualizar_stock->bind_param("isi", $unidades_act, $codProducto, $tienda);
            // Ejecuto la consulta.
            $actualizar_stock->execute();
        }
        // Hago commit de la consulta, para que haga efecto.
        $dwes->commit();
    }
} catch (Exception $e) {
    // Rollback para que si sala el error vuevla al estado anterior.
    $dwes->rollback();
    print_r($e);
}
// Vuelvo a activar el autocommit.
$dwes->autocommit(true);

// Hago la conssulta preparada para mostrar la información.
$consulta_stock = $dwes->stmt_init();
$consulta_stock->prepare('SELECT tienda, unidades FROM stock WHERE producto=?');
$consulta_stock->bind_param("s", $codProducto);
$consulta_stock->execute();
$consulta_stock->bind_result($tienda, $unidades);
// Muestro el código del producto actual.
echo '<h1>' . $codProducto . '</h1>';
// HAgo el formulario para actualizar las unidades de cada tienda.
echo '<form action="#" method="POST">';
while ($consulta_stock->fetch()) {
    // Al poner unidades[tienda] haces que la información que se mande sea un array asociativo, un array normal seria unidades[].
    echo 'Tienda ' . $tienda . ' tiene: ' .
        '<input type="text" name="unidades[' . $tienda . ']" value="' . $unidades . '"> unidades.<br>';

}
// HAgo un boton para mandar los datos.
echo '<br><input type="submit" value="Actualizar"></input>';
echo '</form>';

?>