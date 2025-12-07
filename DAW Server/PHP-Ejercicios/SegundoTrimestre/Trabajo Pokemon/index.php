<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Pokemon</title>
	<link rel="stylesheet" type="text/css" href="examen.css">
	<?php
	include_once('funciones.php');
	?>
</head>

<body>

	<?php
	include_once('./header.inc.php');
	?>

	<div></div>

	<nav>
		<?php
		mostrarRegiones();
		?>
	</nav>

	<div id="iniciales">
		<?php
		if (isset($_GET['pokemon'])) {
			// Mostrar solo el Pokémon seleccionado
		
			mostrarDatosPokemon();

		} elseif (isset($_GET['region'])) {
			// Mostrar lista de Pokémon por región
			mostrarPokemonsPorRegion();
		} else {
			include_once("infoPokemon.php");
		}
		?>
	</div>


	<div class="abajo"></div>

	<?php
	include_once('./footer.inc.php');
	?>

</body>

</html>