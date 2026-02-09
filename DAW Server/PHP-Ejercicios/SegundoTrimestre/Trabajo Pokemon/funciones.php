<?php

function obtenerTipos()
{
    $tipos = [];
    $url = 'https://pokeapi.co/api/v2/type/';
    $json_data = file_get_contents($url);
    $obj = json_decode($json_data, true);
    foreach ($obj['results'] as $tipo) {
        $tipos[] = $tipo['name'];
    }
    return $tipos;
}

function selectDeTipos()
{
    $tipos = obtenerTipos();
    echo '<select name="tipos" id="tipos">';
    echo '<option selected value="selecciona" disabled>--Selecciona--</option>';
    foreach ($tipos as $tipo) {
        echo '<option value="' . $tipo . '">' . ucfirst($tipo) . '</option>';
    }
    echo '</select>';
}

function obtenerRegiones()
{
    $regiones = [];
    $url = "https://pokeapi.co/api/v2/region/";
    $json_data = file_get_contents($url);
    $obj = json_decode($json_data, true);
    foreach ($obj['results'] as $region) {
        $regiones[] = $region['name'];
    }
    return $regiones;
}

function mostrarRegiones()
{
    $regiones = obtenerRegiones();
    echo '<ul>';
    foreach ($regiones as $region) {
        echo '<li><a href="index.php?region=' . $region . '">' . $region . '</a></li>';
    }
    echo '<li><a href="./busqueda.php">Búsqueda</a></li>';
    echo '</ul>';
}

function selectDeRegiones()
{
    $regiones = obtenerRegiones();
    echo '<select name="regiones" id="regiones">';
    echo '<option selected value="selecciona" disabled>--Selecciona--</option>';
    foreach ($regiones as $region) {
        echo '<option value="' . $region . '">' . ucfirst($region) . '</option>';
    }
    echo '</select>';
}

function mostrarPokemonsPorRegion()
{
    if (!isset($_GET['region'])) {
        return;
    }

    $regionName = $_GET['region'];
    $url = 'https://pokeapi.co/api/v2/region/' . $regionName;
    $json_data = file_get_contents($url);
    $regionData = json_decode($json_data, true);
    $pokemonsUnicos = [];

    foreach ($regionData['pokedexes'] as $pokedex) {
        $pokedexUrl = $pokedex['url'];
        $json_data = file_get_contents($pokedexUrl);
        $pokedexData = json_decode($json_data, true);

        foreach ($pokedexData['pokemon_entries'] as $pokemon) {
            $nombrePokemon = $pokemon['pokemon_species']['name'];
            if (!isset($pokemonsUnicos[$nombrePokemon])) {
                $pokemonsUnicos[$nombrePokemon] = $pokemon;
            }
        }
    }

    if (empty($pokemonsUnicos)) {
        echo '<p>No hay pokémons en la región ' . ucfirst($regionName) . '</p>';
        return;
    }

    echo '<table>';
    echo '<thead><tr><th colspan="6">' . strtoupper($regionName) . '</th></tr></thead>';
    echo '<tbody><tr>';
    $count = 0;
    foreach ($pokemonsUnicos as $pokemon) {
        echo '<td><a href="index.php?pokemon=' . $pokemon['pokemon_species']['name'] . '">' . ucfirst($pokemon['pokemon_species']['name']) . '</a></td>';
        $count++;
        if ($count % 6 == 0) {
            echo '</tr><tr>';
        }
    }
    echo '</tr></tbody></table>';
}

function mostrarDatosPokemon($nombrePokemon = null)
{
    if ($nombrePokemon === null) {
        if (isset($_GET['pokemon'])) {
            $nombrePokemon = $_GET['pokemon'];
        } else {
            return;
        }
    }

    $url = "https://pokeapi.co/api/v2/pokemon/" . strtolower($nombrePokemon) . "/";
    $json_data = file_get_contents($url);
    $obj = json_decode($json_data, true);

    echo '<div class="pokemonCard">';
    echo '<h2>' . ucfirst($obj['name']) . '</h2>';
    echo '<img class="foto_pokemon" src="' . $obj['sprites']['other']['showdown']['front_default'] . '">';
    echo '<div class="pokemon-info">';

    echo '<div class="estadisticas-section">';
    echo '<h3>ESTADÍSTICAS</h3>';
    foreach ($obj['stats'] as $stat) {
        $nombreStat = ucfirst(str_replace('-', ' ', $stat['stat']['name']));
        $valorStat = $stat['base_stat'];
        $porcentaje = min(($valorStat / 255) * 100, 100);
        echo '<div class="stat-item">';
        echo '<div class="stat-label">' . $nombreStat . '</div>';
        echo '<div class="stat-bar-container">';
        echo '<div class="stat-bar" style="width: ' . $porcentaje . '%"></div>';
        echo '<span class="stat-value">' . $valorStat . '</span>';
        echo '</div></div>';
    }
    echo '</div>';

    echo '<div class="habilidades-section">';
    echo '<h3>HABILIDADES</h3>';
    foreach ($obj['abilities'] as $habilidad) {
        echo '<p>' . ucfirst($habilidad['ability']['name']) . '</p>';
    }
    echo '</div>';

    echo '<div class="movimientos-section">';
    echo '<h3>MOVIMIENTOS</h3>';
    echo '<div>';
    $cont = 0;
    foreach ($obj['moves'] as $move) {
        if ($cont === 5)
            break;
        $obj2 = json_decode(file_get_contents($move['move']['url']), true);
        echo '<p><strong>' . ucfirst($move['move']['name']) . '</strong><br>Precisión: ' . $obj2['accuracy'] . '</p>';
        $cont++;
    }
    echo '</div></div>';

    echo '<div class="tipos-section">';
    echo '<h3>TIPOS</h3>';
    foreach ($obj['types'] as $type) {
        echo '<p>' . $type['type']['name'] . '</p>';
    }
    echo '</div>';

    echo '</div></div>';
}

function busquedaPokemonPorNombre()
{
    if (!isset($_GET['pokemon']) || empty($_GET['pokemon'])) {
        return;
    }

    $nombreBuscado = strtolower(trim($_GET['pokemon']));
    $url = 'https://pokeapi.co/api/v2/pokemon-species/' . $nombreBuscado;
    $json_data = file_get_contents($url);

    if ($json_data === false) {
        echo '<p>No se encontró: ' . htmlspecialchars($nombreBuscado) . '</p>';
        return;
    }

    $species = json_decode($json_data, true);
    echo '<h2>Resultados: "' . $nombreBuscado . '"</h2>';
    echo '<div style="display: flex; flex-wrap: wrap; gap: 20px;">';
    foreach ($species['varieties'] as $variety) {
        mostrarDatosPokemon($variety['pokemon']['name']);
    }
    echo '</div>';
}

function busquedaPokemonsRegion()
{
    if (!isset($_GET['regiones']) || $_GET['regiones'] == 'selecciona') {
        return;
    }

    $regionName = $_GET['regiones'];
    $url = 'https://pokeapi.co/api/v2/region/' . $regionName;
    $json_data = file_get_contents($url);
    $regionData = json_decode($json_data, true);
    $pokemonsUnicos = [];

    foreach ($regionData['pokedexes'] as $pokedex) {
        $json_data = file_get_contents($pokedex['url']);
        $pokedexData = json_decode($json_data, true);

        foreach ($pokedexData['pokemon_entries'] as $pokemon) {
            $nombrePokemon = $pokemon['pokemon_species']['name'];
            if (isset($_GET['pokemon']) && !empty($_GET['pokemon'])) {
                $nombreBuscado = strtolower(trim($_GET['pokemon']));
                if (strpos($nombrePokemon, $nombreBuscado) !== false) {
                    $pokemonsUnicos[$nombrePokemon] = true;
                }
            } else {
                $pokemonsUnicos[$nombrePokemon] = true;
            }
        }
    }

    if (empty($pokemonsUnicos)) {
        echo '<p>No se encontraron pokémons</p>';
        return;
    }

    if (isset($_GET['pokemon']) && !empty($_GET['pokemon'])) {
        echo '<h2>Pokémons con "' . $_GET['pokemon'] . '" en ' . strtoupper($regionName) . '</h2>';
    } else {
        echo '<h2>Pokémons de ' . strtoupper($regionName) . '</h2>';
    }

    $pokemonsUnicos = array_slice(array_keys($pokemonsUnicos), 0, 100);
    echo '<div style="display: flex; flex-wrap: wrap; gap: 20px;">';
    foreach ($pokemonsUnicos as $nombrePokemon) {
        $speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/' . $nombrePokemon;
        $speciesData = file_get_contents($speciesUrl);

        if ($speciesData !== false) {
            $species = json_decode($speciesData, true);
            foreach ($species['varieties'] as $variety) {
                $varietyName = $variety['pokemon']['name'];
                if ($varietyName === $nombrePokemon || strpos($varietyName, $regionName) !== false) {
                    mostrarDatosPokemon($varietyName);
                }
            }
        } else {
            mostrarDatosPokemon($nombrePokemon);
        }
    }
    echo '</div>';
}

function busquedaPokemonsTipos()
{
    if (!isset($_GET['tipos']) || $_GET['tipos'] == 'selecciona') {
        return;
    }

    $tipoSeleccionado = $_GET['tipos'];
    $url = 'https://pokeapi.co/api/v2/type/' . $tipoSeleccionado;
    $json_data = file_get_contents($url);
    $tipoData = json_decode($json_data, true);
    $pokemonsEncontrados = [];

    foreach ($tipoData['pokemon'] as $pokemon) {
        $nombrePokemon = $pokemon['pokemon']['name'];
        if (isset($_GET['pokemon']) && !empty($_GET['pokemon'])) {
            $nombreBuscado = strtolower(trim($_GET['pokemon']));
            if (strpos($nombrePokemon, $nombreBuscado) !== false) {
                $pokemonsEncontrados[] = $nombrePokemon;
            }
        } else {
            $pokemonsEncontrados[] = $nombrePokemon;
        }
    }

    if (empty($pokemonsEncontrados)) {
        echo '<p>No se encontraron pokémons</p>';
        return;
    }

    if (isset($_GET['pokemon']) && !empty($_GET['pokemon'])) {
        echo '<h2>Pokémons con "' . $_GET['pokemon'] . '" tipo ' . strtoupper($tipoSeleccionado) . '</h2>';
    } else {
        echo '<h2>Pokémons tipo ' . strtoupper($tipoSeleccionado) . '</h2>';
    }

    $pokemonsEncontrados = array_slice($pokemonsEncontrados, 0, 100);
    echo '<div style="display: flex; flex-wrap: wrap; gap: 20px;">';
    foreach ($pokemonsEncontrados as $pokemonNombre) {
        mostrarDatosPokemon($pokemonNombre);
    }
    echo '</div>';
}

?>