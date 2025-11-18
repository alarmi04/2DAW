<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Principal HTML</title>
</head>

<body>
  <!-- Pongo el header con php usando "include_once" para que no e cargue más veces-->
  <?php include "./cabecera.inc.php"; ?>
  <!-- Hago un "section" para incluir todo lo relacionado con mi biografia-->
  <section>
    <article>
      <img src="../Ejercicio01/Imagenes/Golden.jpeg" alt="En teoria es una foto mia." style="width: 100px" />
      <p>
        Me llamo Alberto Aracil Millán y en 2022 empece el grado superior de
        Desarrollo de Aplicaciones Multiplataforma en Florida Universitaria,
        al acabar las prácticas comence un curso universitario en la UOC
        "Universidad Oberta de Catalunya" el cuál sigo cursando a día de hoy,
        y quiero acabar estudiando Desarrollo de Aplicaciones Web.
      </p>
    </article>
  </section>
  <!-- Hago un section para el formulario que manda la informacion con POST a "consulta.php" -->
  <section>
    <form action="./consulta.php" method="post">
      <fieldset style="width: fit-content">
        <legend>Datos de contacto</legend>
        <label for="nombre">Nombre</label>
        <input type="text" name="nombre" />
        <br />
        <label for="apellidos">Apellidos</label>
        <input type="text" name="apellidos" />
        <br />
        <label for="correo">Email</label>
        <input type="email" name="correo" />
        <br />
        <input type="checkbox" name="check" />
        <br>
        <label for="fecha">Fecha</label>
        <input type="date" name="fecha" />
        <hr>
        <label for="consulta">Consulta</label><br>
        <textarea name="consulta"></textarea><br>
        <input type="submit" name="enviar"><input type="reset" name="borrar">
      </fieldset>
    </form>
  </section>
  <!-- Hago un "navigator" para lo relacionado con la navegación entre pantallas-->
  <nav>
    <a href="./tecnologias.php">tecnologias</a>
    <br />
    <a href="./rrss.php">rrss</a>
    <br />
    <a href="mailto:albertoaracilmillan@gmail.com">Escribeme un correo</a>
  </nav>

  <!-- Agrego el footer con "include-once"-->
  <?php include_once "./footer.inc.php"; ?>
</body>

</html>