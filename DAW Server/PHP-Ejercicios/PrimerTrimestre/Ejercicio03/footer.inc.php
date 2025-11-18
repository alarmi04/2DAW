<footer>
    <p>Alberto Aracil Millan</p>
    <?php
    // Establezco la zona horaria.
    date_default_timezone_set("Europe/Madrid");
    $hoy = getdate();
    // Footer con array multidimensional.
    $fechas = [
        [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ],
        [
            "Domingo",
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sabado",
        ]
    ];
    // Asigno a las variables el dia traduciso, el mes traducido, el día del mes y el año actual.
    $diaEnEsp = $fechas[1][$hoy["wday"]];
    $mesEnEsp = $fechas[0][$hoy["mon"] - 1];
    $numeroDia = $hoy["mday"];
    $anyoActual = $hoy["year"];
    // Asigno a la variable fecha el string a mostrar.
    $fecha = $diaEnEsp . ", " . $numeroDia . " de " . $mesEnEsp . " de " . $anyoActual;
    echo '<p>' . $fecha . '</p>'
        ?>
</footer>