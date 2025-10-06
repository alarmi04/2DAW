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
- Julia García López

### Compras:
- Juan Torres Ruiz

### Almacén:
- Tatiana Martínez Sanz

### Administración:
- Vicent Giménez Vidal