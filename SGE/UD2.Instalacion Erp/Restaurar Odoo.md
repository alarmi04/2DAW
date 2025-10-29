## Restaurar Odoo
Comienzo copiando el docker-compose.yml en la carpeta del repositorio, una vez copiado hago `git pull` y despues de hacer el pull hago un `git push` y subo el docker-compose.

Como mi ruta de carpetas en el GitHub es diferente que la que tiene el docker-compose debere cambiarla al descargarlo en otra maquina.

Vuelvo a subir los volumenes de la misma forma que el compose, y el tar lo subo a google drive.
Para subir los volumenes lo hago desde git:
    1. Copio los volumenes a la carpeta del repositorio clonado.
    2. `git add *`
    3. `git commit -m "Mensaje"`
    4. `git push` Aqui me pedirá las credenciales de GitHub.

Para subir el tar a drive:
    1. `rclone copy -P /home/vboxuser/2DAW/2DAW/SGE/backup.tar gdrive:/Backups`

Una vez subido todo, se realizaran los siguientes pasos:
    1. Descargar docker en la nueva maquina.
    2. Clonar el repositorio.
    3. Descargar el tar de drive, al tener interfaz gráfica es más fácil.
    4. Copiar el tar al directorio de volumesOdoo.
    5. Descomprimo el tar.
    6. Vamos al directorio donde este el docker-compose.yml
    7. Hacemos `docker compose up` si ponemos al final -d no se paran los contenedores.

Para parar los contenedores con `docker compose down`