# Instalación de Ubuntu Server y Odoo.
Voy a empezar instalando Ubuntu Server:
1. Descargar ISO.
2. Instalar la ISO en Virtual Box.
3. He usado una nueva función para instalar la ISO en Virtual Box, que poniendo el nombre del host, usuario (vboxuser), contraseña (changeme), rellenando los GB de RAM (4), la capacidad del disco (25 dinamica) y un núcleo de CPU, te genera la instalación automaticamente.
4. Ahora arrancamos la maquina virtual.
5. Una vez arrancada llega el primer problema, los locales no están en español, para eso usaremos el comando 'dpkg-reconfigure locales' e instalamos “es_ES. UTF-8”.
