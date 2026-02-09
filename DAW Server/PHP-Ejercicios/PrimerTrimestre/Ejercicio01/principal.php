<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Principal HTML</title>
  </head>
  <body>
    <?php include "./cabecera.inc.php"; ?>
    <section>
      <article>
        <img
          src="./Imagenes/Golden.jpeg"
          alt="En teoria es una foto mia."
          style="width: 100px"
        />
        <p>
          Me llamo Alberto Aracil Millán y en 2022 empece el grado superior de
          Desarrollo de Aplicaciones Multiplataforma en Florida Universitaria,
          al acabar las prácticas comence un curso universitario en la UOC
          "Universidad Oberta de Catalunya" el cuál sigo cursando a día de hoy,
          y quiero acabar estudiando Desarrollo de Aplicaciones Web.
        </p>
      </article>
    </section>
    <section>
      <form action="#" method="post">
        <fieldset style="width: fit-content">
          <legend>Datos de contacto</legend>
          <label for="nombre">Nombre</label>
          <input type="text" id="nombre" />
          <br />
          <label for="apellidos">Apellidos</label>
          <input type="text" id="apellidos" />
          <br />
          <label for="correo">Email</label>
          <input type="email" id="correo" />
          <br />
          <hr>
          <label for="consulta">Consulta</label><br>
          <textarea name="consulta" id="consulta"></textarea><br>
          <input type="submit" name="enviar"><input type="reset" name="borrar">
        </fieldset>
      </form>
    </section>
    <nav>
      <a href="./tecnologias.php">tecnologias</a>
      <br />
      <a href="./rrss.php">rrss</a>
      <br />
      <a href="mailto:albertoaracilmillan@gmail.com">Escribeme un correo</a>
    </nav>
  </body>
</html>
