# Instalación de Ubuntu Server y Odoo.
Voy a empezar instalando Ubuntu Server:
1. Descargar ISO.
2. Instalar la ISO en Virtual Box.
3. He usado una nueva función para instalar la ISO en Virtual Box, que poniendo el nombre del host, usuario (vboxuser), contraseña (changeme), rellenando los GB de RAM (4), la capacidad del disco (25 dinamica) y un núcleo de CPU, te genera la instalación automaticamente.
4. Ahora arrancamos la maquina virtual.
5. Una vez arrancada llega el primer problema, los locales no están en español, para eso usaremos el comando 'dpkg-reconfigure locales' e instalamos “es_ES. UTF-8”.
6. A continuación para cambiar la distribución del teclado a español, usamos el comando "dpkg-reconfigure keyboard-configuration", escojo el teclado "Generic 105-key pc" una vez escogido ponemos que la distribucion es "Spanish" y omitimos los atajos de teclado.

## Instalacion de Odoo en Docker.
Para poner en marcha el repositorio, lo primero que haremos será actualizar nuestro índice de
paquetes y tras ello, instalar los paquetes necesarios para que se puedan utilizar repositorios con HTTPS, para ello empezaremos usando:

`sudo apt-get update`
`sudo apt-get install ca-certificates curl`

Ahora que ya hemos finalizado este paso, pasaremos al siguiente el cual es descargar la clave GPG
del repositorio de Docker CE, porque desde el repositorio oficial de ubuntu no es recomendable, para ello hay q ejecutar lo siguiente:

`sudo install -m 0755 -d /etc/apt/keyrings`
`sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o
/etc/apt/keyrings/docker.asc`
`sudo chmod a+r /etc/apt/keyrings/docker.asc`

Ahora usaremos el siguiente comando para ver la distribución que tenemos:
`lsb_release -cb`
Esto devuelve "noble" por lo que significa que estamos en "Ubuntu Noble 24.04 (LTS)".

Como estoy teniendo el problema de copiar los comanso a mano, instalo un "ssh server" con:
`apt install openssh-server`
Para poder conectar la maquina virtual con mi maquina física.

Al conectar la maquina virtual con la maquina física con:
`ssh vboxuser@172.20.10.3` desde la maquina física, me da error ya que tengo conectada la maquina virtual a internet por NAT.
Para solucionarlo voy crear una regla en el reenvio de puertos.
Despues de realizar esto, me conecto a la maquina virtual desde el CMD usando el siguiente comando:
`ssh usuario@localhost -p 2222` indicando el puerto que he establecido en la regla de reenvio de puertos.

Ahora con NAT me da problemas para hacer los pasos de instalacion en este caso este:
`echo \ 
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] 
https://download.docker.com/linux/ubuntu \ 
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \ 
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null 
sudo apt-get update `
Para evitar los problemas he decidido volver a intentar usar adaptador puente pero esta vez usando mis datos móviles y ha funcionado, es decir, el problema era del wifi del colegio ya que con el wifi del colegio no me generaba una IP.

Una vez este instalado docker y Odoo procedo a iniciar los contenedores de "odoo-db" y "odoo-web" para poder acceder a Odoo desde el navegador usando el puerto "8069" y usando la ip de la máquina en este caso "172.20.10.3".

Una vez accedido desde el navegador a Odoo nos pedira una serie de datos, en correo electónico ibamos a usar "Ethereal email" pero debido a un mal uso de usuario lo han capado por lo que el profesor nos va a proporcionar una cuenta de gmail.

Al acceder a Odoo desde el navegador nos pide que introduzcamos los cmapos siguientes:
- Nombre de la Base de datos.
- Correo electrónico.
- Contraseña.
- Número de télefono.
- Ubicación.

Ahora que hemos rellenado los datos y hemos accedido a Odoo, procedemos a instalar el apartado de ventas, inventario, stock disallow negative.

Una vez instaladas las aplicaciones, accedemos a ajustes, usuarios y empresas y creamos los siguientes usuarios y empleados:

## Responsables:

### En ventas:
- Julia García López: 
    - Correo: juliagarcialopez@gmail.com

### Compras:
- Juan Torres Ruiz:
    - Correo: juantorresruiz@gmail.com

### Almacén:
- Tatiana Martínez Sanz:
    - Correo: tatianamartinezsanz@gmail.com

### Administración:
- Vicent Giménez Vidal:
    - Correo: vicentgimenezvidal@gmail.com

### Gerente:
- Manuel García Belmonte:
    - Correo: manuel@theinkgarage.com

## Comprobación del correo
Ahora procedemos a hacer la comprobación de que nuestro correo funciona en está página:
- https://webmail.theinkgarage.com/cpsess2590805471/3rdparty/roundcube/?_task=mail&_mbox=INBOX

Básicamente para ver los correos que llegan, etc.
Para ello usamos las siguientes credneciales:
- Correo: apptorrent@theinkgarage.com
- Clave: PerenxisaAPP.

Una vez ya comprobado el correo y agregado las aplicaciones necesarias a Odoo, habrá que comenzar a tratar con proveedores, generar pedidos, generar productos, etc.

## Proveedores
Para dar de alta a un proveedor accederemos a "Pedidos -> Proveedores -> Nuevo" y aqui introducimos el nombre de la empresa, en este caso "PatoComponentes" y su correo "psvsolis@gmaill.com" y le damos a guardar.

El proveedor nos envia un pedido con los articulos a añadir en nuestro Odoo.

## Compartir los volúmenes
Ahora para que el profesor se pueda descargar nuestro Odoo con la configuración, clonamos el repositorio en una carpeta en la maquina virtual usando:
`git clone https://github.com/alarmi04/2DAW.git`
Una vez creado procedemos con los siguienes pasos:
1. Crear una rama local desde la rama del gitHub usando: `git checkout -b sistemas_gestion_empresarial origin/sistemas_gestion_empresarial`
2. Entrar en la rama con: `git switch sistemas_gestion_empresarial`
3. Hacer un `git add *` con los volumenes y realizar un commit y un push.
4. Tambien necesita un backup.tar que hemos creado, pero a la hora de commitear este fichero da un error de espacio, es mayor de 100 Mb.

Para solucionar ese problema em instalo en el CMD rclone, y lo configuro con los siguientes pasos:

Para instalar rclone: `sudo apt update sudo apt install rclone -y`
Para entrar en la configuracion: `rclone config`, una vez entrado seguiremos los pasos siguientes:
1. Escribe n para crear una nueva configuración.
2. Ponle un nombre (por ejemplo, gdrive).
3. Selecciona el número correspondiente a Google Drive.
4. Cuando te pida el client_id y client_secret, puedes dejarlos vacíos (usa los predeterminados).
5. En scope, elige 1 (acceso completo).
6. Cuando pregunte si quieres configuración avanzada, di no.
7. Cuando pregunte si quieres usar auto-config, si estás en un servidor sin interfaz gráfica, di no.
    - Te mostrará una URL.
    - Copia esa URL, pégala en tu navegador local, autoriza tu cuenta de Google, y pega el código que te da en el servidor.
8. Confirma y guarda la configuración.

Y subo el archivo usando este comando:
`rclone copy -P /home/vboxuser/2DAW/2DAW/SGE/backup.tar gdrive:/Backups`

## Productos

Ahora despues de iniciar los contenedores en Odoo, procedemos a acceder a la seccion de Inventario/Productos y creamos los productos, los cuales hemos recibido a traves del correo como un pedido:
![alt text](image.png)