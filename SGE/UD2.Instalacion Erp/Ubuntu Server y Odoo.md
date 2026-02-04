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
- Correo electrónico. (apptorrent@theinkgarage.com)
- Contraseña. (ara180604)
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
1. Entrar en la rama con: `git switch sistemas_gestion_empresarial`
2. Mover los volumenes a la carpeta del repositorio.
3. Hacer un `git add *` con los volumenes y realizar un commit y un push.
4. Tambien necesita un backup.tar que hemos creado con `tar -cvf nombre_archivo.tar carpeta_o_archivo`, pero a la hora de commitear este fichero da un error de espacio, es mayor de 100 Mb.

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


## Nuevo correo asociado

Para asignar a Odoo otro correo lo que vamos a hacer es lo siguiente:
1. Conectarnos a la máquina por ssh, `ssh vboxuser@ip`.
2. Activar los contenedores estando en el directorio del "docker-compose.yml" con `docker compose up -d` -d para dejarlo en segundo plano y poder usar la terminal.
3. Accedo a Odoo desde el navegador poniendo la IP:8069
4. Una vez en Odoo.
5. Accedemos a ajustes y cambiamos el correo de la empresa y del usuario administrador a "apptorrent@odooserra.work.gd"
6. Creamos un correo saliente y uno entrante.


## Asignar prefijos.

Para asignar los prefijos a los presupuesto, facturas... Accederemos al modo desarrollador que esta al final del todo en ajustes.
1. Una vez activado, arriba en el menú nos saldrá el apartado de técnico.
2. Accedemos a Técnico.
3. Y vamos al apartado de secuencias.
4. Buscamos las necesarias en este caso Purchase.order porque las facturas no dejaba.
5. Cambiamos el prefijo por "PED-%(y)s-".


# Segundo Trimestre

## 1. Plantillas de correo

Para crear una plantilla de correo realizaremos los siguientes pasos:

1. Activar el modo desarrollador
2. Acceder a **Técnico** → **Correo electrónico** → **Plantillas de correo electrónico**
3. Crear una nueva plantilla:
   - **Aplica a:** Orden de ventas
   - **Asunto:** Pedido de venta

### Personalizar el asunto

Para personalizar el asunto hay que hacerlo en contenido, y hay que ponerlo igual pero con dos llaves `{{ }}`, es decir, `{{ object.name }}`. Además ponemos `[CUSTOM]` delante del asunto para distinguir con más facilidad la plantilla.

### Personalizar el contenido

En el mensaje, entramos en el antepenúltimo `#` (Marcador de posición dinámico):

- **Cliente:** `object.partner_id.name`
- **Condición de pago:** `object.payment_term_id.name` (para esto hay que ponerle condición de pago al pedido)
- **Nombre del pedido:** `object.name`

---

## 2. Automatización de los correos

Para poder automatizar que se envíe por ejemplo un correo de confirmación al crear un pedido hay que hacer lo siguiente:

### Crear la acción del servidor

1. Activar el modo desarrollador
2. Acceder a **Técnico** → **Acciones** → **Acciones del servidor** → **Nuevo**
3. Configurar la acción:
   - **Nombre:** `[CUSTOM] Enviar correo electrónico automáticamente en venta`
   - **Tipo:** Enviar correo electrónico
   - **Modelo:** Orden de venta
   - **Plantilla de correo electrónico:** `[CUSTOM] Confirmación pedido de venta automático`
   - **Enviar correo electrónico como:** Mensaje (para que se muestre en el historial de la derecha)

### Instalar el módulo de Reglas de automatización

Ir a **Aplicaciones** y activar **Reglas de automatización**.

### Crear la regla de automatización

Una vez instalado el módulo:

1. Acceder a **Técnico** → **Automatización** → **Reglas de automatización** → **Nuevo**
2. Configurar la regla:
   - **Nombre:** `[CUSTOM] Envío mail venta automática`
   - **Modelo:** Orden de venta
   - **Activar:** El estado establecido como → Orden de venta
   - **Agregar acción:**
     - **Tipo:** Ejecutar acciones existentes
     - **Detalles de la acción:** Agregar → `[CUSTOM] Confirmación pedido de venta automático`

### Comprobar el funcionamiento

Para comprobar que funciona correctamente:

1. Ir a **Ventas** → **Nuevo**
2. Crear un pedido de venta
3. Debería aparecer el correo en el historial de la derecha

![alt text](image-1.png)

---

## 3. Configuración de otra plantilla de correo (Cancelación)

### Crear la plantilla

1. Activar el modo desarrollador
2. Acceder a **Técnico** → **Correo electrónico** → **Plantillas de correo electrónico** → **Nuevo**
3. Configurar la plantilla:
   - **Nombre:** `[CUSTOM] Cancelación de pedido`
   - **Aplica a:** Orden de venta
   - **Asunto:** `Su pedido {{ object.name }} ha sido cancelado.`
   - **Contenido:**

   ![alt text](image-2.png)

### Crear la automatización

1. Acceder a **Técnico** → **Automatización** → **Reglas de automatización** → **Nuevo**
2. Configurar la regla:
   - **Nombre:** `[CUSTOM] Envío de cancelación de pedido automático`
   - **Modelo:** Orden de venta
   - **Activar:** Estado establecido como → Cancelado
   - **Agregar una acción:**
     - **Tipo:** Enviar correo electrónico
     - **Plantilla de correo electrónico:** `[CUSTOM] Cancelación de pedido`
     - **Enviar correo electrónico como:** Mensaje

### Comprobar el funcionamiento

1. Acceder a **Ventas** en el menú lateral
2. Seleccionar una orden de venta y cancelarla
3. Se mostrará a la derecha (en el chat) el correo enviado

---

## 4. Configuración de una plantilla de correo para oportunidades de Venta (crm.lead)

### Requisitos previos

Antes de comenzar, asegurarse de que tenemos instalado en **Aplicaciones** el módulo **CRM**. Si no está instalado, instalarlo.

### Crear la plantilla

1. Activar modo desarrollador
2. Acceder a **Técnico** → **Correo electrónico** → **Plantillas de correo electrónico** → **Nuevo**
3. Configurar la plantilla:
   - **Nombre:** `[CUSTOM] Aviso: Oportunidad > 20.000€`
   - **Aplica a:** Lead/Oportunidad (crm.lead)
   - **Asunto:** `Nueva Oportunidad Superior a 20.000€`
   - **Contenido:**
```html
<p>Buenas <strong>Equipo de ventas,</strong></p>
<p>Se ha encontrado una nueva oportunidad con un valor superior a 20.000€</p>
<p><strong>Oportunidad: </strong>${object.name}</p>
<p><strong>Cliente: </strong>${object.partner_id.name}</p>
<p><strong>Importe: </strong>${object.expected_revenue}€</p>
<p>Saludos.</p>
```

### Crear la automatización

1. Acceder a **Técnico** → **Automatización** → **Reglas de automatización** → **Nuevo**
2. Configurar la regla:
   - **Nombre:** `[CUSTOM] Envío aviso oportunidad de venta > 20.000`
   - **Modelo:** Lead/Oportunidad
   - **Activar:** La etapa está establecida como → Calificado
   - **Antes de actualizar el dominio:** `[('expected_revenue', '>', 20000)]` (Ingreso esperado > 20.000)
   - **Agregar una acción:**
     - **Tipo:** Enviar correo electrónico
     - **Plantilla de correo electrónico:** `[CUSTOM] Aviso: Oportunidad > 20.000€`
     - **Enviar correo electrónico como:** Mensaje

---

## 5. Asignar un sitio web a Odoo

Para asignar un sitio web a Odoo:

1. Acceder a **Aplicaciones**
2. Buscar **Sitio web**
3. Instalar el módulo
4. Acceder desde el menú lateral al **Sitio web**
5. Escoger la plantilla y el tema sobre el que trabajar

Una vez hecho esto, habrá que publicar los productos que tenemos para vender y crearles una categoría.

---

## 6. Crear una categoría

1. Acceder al **Sitio web**
2. En el menú superior → **Comercio electrónico** → **Categorías de comercio electrónico**
3. Clicar en **Nuevo** y seleccionar una categoría padre si la tiene

---

## 7. Publicar el producto

1. Acceder a **Inventario**
2. En el menú superior → **Productos**
3. Entrar al producto
4. Ir al apartado de **Ventas**
5. **Está publicado** → True

---

## 8. Personalizar Sitio Web

Para personalizar el sitio web:

1. Acceder al sitio web
2. Arriba a la izquierda observarás un botón de **Edición**
3. Una vez en el apartado de edición, podrás modificar todas las secciones del sitio web

### Acciones de edición

- **Modificar un texto:** Clicar encima para modificar el contenido del párrafo (se mostrará a la derecha una barra lateral con todos los atributos/propiedades del párrafo)

- **Modificar un botón:** Clicar encima para modificar el texto, y en "editar enlace" para asignarle un nuevo hipervínculo

- **Modificar una imagen:** Clicar encima de una imagen y en la barra lateral escoger la opción de **Reemplazar** en la cual escogeremos la imagen correcta (la imagen se adaptará a las propiedades/atributos ya puestos por el tema escogido)

- **Eliminar una sección:** Clicar encima de la sección que queramos eliminar (los temas suelen poner secciones que luego no necesitamos o cambiamos completamente)
  1. Una vez seleccionado aparecerá una barra con varios botones
  2. Uno de ellos será el de la papelera, clicar en él

### Desarrollar un módulo

Vamos a crear un módulo para una tienda de videojuegos, para ello accederemos al contenedor ejecutando el siguiente comando:

- `docker exec -it "nombre_contenedor" bash`

Una vez dentro procedemos a seguir los siguientes pasos:

---

## 1. Crear la estructura del módulo

Ejecutar `odoo scaffold videojuegos /mnt/extra-addons`

---

## 2. Configurar el __manifest__.py

Abrir el módulo con Visual Studio Code y modificar el `__manifest__.py`:

1. `'name': "Videojuegos"`
2. `'summary': "Módulo para una tienda de videojuegos"`
3. Descomentamos la siguiente línea: `'security/ir.model.access.csv'`

---

## 3. Crear los modelos

Accedemos a la carpeta `models/` y modificamos `models.py`:

Descomentamos las siguientes líneas:
- `from odoo import models, fields, api`
- El bloque de la clase

Una vez descomentado, lo modificamos para que quede así:
```python
from odoo import models, fields, api


class Videojuegos(models.Model):
    _name = 'videojuegos.videojuegos'
    _description = 'Tienda de videojuegos'

    name = fields.Char(string='Nombre')
    
    consola = fields.Selection([
        ('consola_PS5', 'PS5'),
        ('consola_Xbox', 'Xbox'),
        ('consola_Switch', 'Switch'),
        ('consola_PC', 'PC')
    ], string="Consola")
    
    precioBase = fields.Float(string='Precio Base')
    unidades = fields.Integer(string='Unidades')
    
    estado = fields.Selection([
        ('estado_Nuevo', 'Nuevo'),
        ('estado_Segunda', 'Segunda mano')
    ], string="Estado del videojuego")
    
    descuento = fields.Boolean(string='Tiene descuento')
    
    # Relación Many2one con el modelo Género
    genero_id = fields.Many2one(
        'videojuegos.genero',
        string='Género'
    )
    
    # Campo calculado
    valor_stock = fields.Float(
        string='Valor del stock',
        compute='_compute_valor_stock'
    )

    @api.depends('precioBase', 'unidades')
    def _compute_valor_stock(self):
        for record in self:
            record.valor_stock = record.precioBase * record.unidades


class Genero(models.Model):
    _name = 'videojuegos.genero'
    _description = 'Géneros de videojuegos'

    name = fields.Char(string='Nombre')
    descripcion = fields.Text(string='Descripción')
    
    # Relación One2many (un género tiene muchos videojuegos)
    videojuego_ids = fields.One2many(
        'videojuegos.videojuegos',
        'genero_id',
        string='Videojuegos'
    )
```

### Explicación de las relaciones entre modelos

- **Many2one**: Muchos videojuegos pertenecen a un género. Se pone en el modelo "hijo" (Videojuegos).
- **One2many**: Un género tiene muchos videojuegos. Se pone en el modelo "padre" (Género). Necesita el campo Many2one del otro modelo para funcionar.

---

## 4. Configurar la seguridad

Accedemos a la carpeta `security/` y modificamos el archivo `ir.model.access.csv`:
```csv
id,name,model_id:id,group_id:id,perm_read,perm_write,perm_create,perm_unlink
access_videojuegos_videojuegos,videojuegos.videojuegos,model_videojuegos_videojuegos,base.group_user,1,1,1,1
access_videojuegos_genero,videojuegos.genero,model_videojuegos_genero,base.group_user,1,1,1,1
```

### Explicación

- Por cada modelo que creemos, debemos añadir una línea en este archivo.
- El `model_id:id` se forma así: `model_` + nombre del modelo cambiando los puntos por guiones bajos.
  - Ejemplo: `videojuegos.videojuegos` → `model_videojuegos_videojuegos`
  - Ejemplo: `videojuegos.genero` → `model_videojuegos_genero`
- Los permisos (1=sí, 0=no): lectura, escritura, creación, eliminación.

---

## 5. Crear las vistas

Accedemos a la carpeta `views/` y modificamos `views.xml`.

### Estructura genérica de una vista

Todas las vistas siguen esta estructura básica:
```xml
<record model="ir.ui.view" id="identificador_unico">
    <field name="name">nombre.del.modelo.tipo_vista</field>
    <field name="model">nombre.del.modelo</field>
    <field name="arch" type="xml">
        <!-- Aquí va el contenido de la vista -->
    </field>
</record>
```

### Vista Formulario (form)

Sirve para ver y editar un registro individual.
```xml
<form string="Título del formulario">
    <sheet>
        <group>
            <field name="campo1"/>
            <field name="campo2"/>
        </group>
    </sheet>
</form>
```

### Vista Lista (tree)

Sirve para mostrar varios registros en formato tabla.
```xml
<tree string="Título de la lista">
    <field name="campo1"/>
    <field name="campo2"/>
    <field name="campo3"/>
</tree>
```

### Acción (act_window)

Conecta las vistas con los menús. Define qué modelo se muestra y qué vistas están disponibles.
```xml
<record model="ir.actions.act_window" id="identificador_accion">
    <field name="name">Nombre que aparece en la ventana</field>
    <field name="res_model">nombre.del.modelo</field>
    <field name="view_mode">tree,form</field>
</record>
```

### Menús (menuitem)

Crean la navegación en Odoo.
```xml
<!-- Menú raíz (aparece en la barra lateral) -->
<menuitem id="id_menu_raiz" name="Nombre del Menú"/>

<!-- Submenú (hijo del menú raíz) -->
<menuitem id="id_submenu" name="Nombre Submenú" parent="id_menu_raiz"/>

<!-- Opción final (conecta con una acción) -->
<menuitem id="id_opcion" name="Nombre Opción" 
          parent="id_submenu" action="identificador_accion"/>
```

---

### Archivo views.xml completo
```xml
<odoo>
    <data>
        <!-- ========== VISTAS DE VIDEOJUEGOS ========== -->
        
        <!-- Vista Formulario -->
        <record model="ir.ui.view" id="videojuegos_form_view">
            <field name="name">videojuegos.videojuegos.form</field>
            <field name="model">videojuegos.videojuegos</field>
            <field name="arch" type="xml">
                <form string="Videojuego">
                    <sheet>
                        <group>
                            <group string="Información básica">
                                <field name="name"/>
                                <field name="genero_id"/>
                                <field name="consola"/>
                                <field name="estado"/>
                            </group>
                            <group string="Datos económicos">
                                <field name="precioBase"/>
                                <field name="unidades"/>
                                <field name="descuento"/>
                                <field name="valor_stock"/>
                            </group>
                        </group>
                    </sheet>
                </form>
            </field>
        </record>

        <!-- Vista Lista -->
        <record model="ir.ui.view" id="videojuegos_tree_view">
            <field name="name">videojuegos.videojuegos.tree</field>
            <field name="model">videojuegos.videojuegos</field>
            <field name="arch" type="xml">
                <tree string="Videojuegos">
                    <field name="name"/>
                    <field name="genero_id"/>
                    <field name="consola"/>
                    <field name="precioBase"/>
                    <field name="unidades"/>
                    <field name="valor_stock"/>
                </tree>
            </field>
        </record>

        <!-- Acción -->
        <record model="ir.actions.act_window" id="videojuegos_action">
            <field name="name">Videojuegos</field>
            <field name="res_model">videojuegos.videojuegos</field>
            <field name="view_mode">tree,form</field>
        </record>

        <!-- ========== VISTAS DE GÉNEROS ========== -->
        
        <!-- Vista Formulario -->
        <record model="ir.ui.view" id="genero_form_view">
            <field name="name">videojuegos.genero.form</field>
            <field name="model">videojuegos.genero</field>
            <field name="arch" type="xml">
                <form string="Género">
                    <sheet>
                        <group>
                            <field name="name"/>
                            <field name="descripcion"/>
                        </group>
                        <notebook>
                            <page string="Videojuegos de este género">
                                <field name="videojuego_ids"/>
                            </page>
                        </notebook>
                    </sheet>
                </form>
            </field>
        </record>

        <!-- Vista Lista -->
        <record model="ir.ui.view" id="genero_tree_view">
            <field name="name">videojuegos.genero.tree</field>
            <field name="model">videojuegos.genero</field>
            <field name="arch" type="xml">
                <tree string="Géneros">
                    <field name="name"/>
                    <field name="descripcion"/>
                </tree>
            </field>
        </record>

        <!-- Acción -->
        <record model="ir.actions.act_window" id="genero_action">
            <field name="name">Géneros</field>
            <field name="res_model">videojuegos.genero</field>
            <field name="view_mode">tree,form</field>
        </record>

        <!-- ========== MENÚS ========== -->
        
        <menuitem id="videojuegos_menu_root" name="Tienda Videojuegos"/>
        
        <menuitem id="videojuegos_menu_main" name="Catálogo" 
                  parent="videojuegos_menu_root"/>
        
        <menuitem id="videojuegos_menu_videojuegos" name="Videojuegos" 
                  parent="videojuegos_menu_main" action="videojuegos_action"/>
                  
        <menuitem id="videojuegos_menu_generos" name="Géneros" 
                  parent="videojuegos_menu_main" action="genero_action"/>
    </data>
</odoo>
```

## 7. Instalar el módulo

1. Reiniciar el contenedor: `docker restart "nombre_contenedor"`
2. Acceder a Odoo desde el navegador
3. Ir a **Aplicaciones** → **Actualizar lista de aplicaciones**
4. Buscar "Videojuegos" e instalar