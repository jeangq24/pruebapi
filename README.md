<h1 style=" text-align: center">Prueba Tecnica Back-end Jr <span style="color: red" >PI Interactiva</span></h1>
<div style="display:flex;justify-content:center;">
<img src="./assets/logo.jpg"/>
</div>
<hr>
<p style="">Solucionado por <a href="https://www.linkedin.com/in/jeangq24/"><span style="font-weight:bold;top:100px">Jean S Garzon</span></a></p>
<h2 style="color:cyan">Requisitos: </h2>
<ul>
<li>Node JS</li>
<li>npm</li>
<li>Postgresql (base de datos 'pruebatecnica')</li>
</ul>

<h2 style="color:cyan">Configurando el ambiente de ejecucion:</h2>

<ul>
<li> En una terminal de comandos ubiquese en el direcotio raiz del proyecto, ejecute el comando 'npm install' para instalar las dependecias necesarias.</li>
<li>En el mismo directorio raiz cree un nuevo archivo (solo si no exite) como el nombre '.env', dentro de este escriba las variables de entorno necesarias: 
<ul>
<li>DB_USER=postgres.</li>
<li>DB_PASSWOR=postgres.</li>
<li>DB_HOST=localhost:5432/pruebatecnica.</li>
<li>SECRET_KEY=secret1024secret.</li>
*Puede modificar las variables de entorno de acuerdo a la configuracion establecida en el PC donde se ejecuta*
</ul>
</li>
<li>escriba el comando 'npm start' para iniciar el servidor (el servidor se ejecutara en el puerto 3001).</li>
</ul>

<h2 style="color:cyan">Endpoints y funcionamineto</h2>
<p>Para realizar las peticiones a los diferentes Endpoints deberemos suministrar un Bearer Token, los unicos edpoints que no reciben el token seran: http://localhost:3001/registrar y http://localhost:3001/iniciarSesion, estos seran por donde se deba iniciar: 

<ul>
<li>
    <span style="color:cyan">http://localhost:3001/registrar: </span>
    peticion de tipo POST, se debera enviar por body un json/objeto con las propiedades {nombre,apellido,edad,usuario,correo,contraseña}.
</li>

<li>
    <span style="color:cyan">http://localhost:3001/iniciarSesion: </span>
     peticion de tipo POST, se debera enviar por body un json/objeto con las propiedades {usuario,contraseña}, el servidor respondera con un token el cual se necesitara para las demas peticiones.
</li>

<li>
    <span style="color:cyan">http://localhost:3001/crearTarea: </span>
    peticion de tipo POST, se debera enviar por body un json/objeto con las propiedades {titulo, descripcion, prioridad} (prioridad solo resivira 3 valores: 'baja', 'medio' y 'alto'). Ademas incluir el token que se suministro al iniciar sesion.
</li>

<li>
    <span style="color:cyan">http://localhost:3001/tarea/todas: </span>
     perticion de tipo GET, ademas incluir el token que se suministro al iniciar sesion. Se devolveran todas la tareas registradas.
</li>

<li>
    <span style="color:cyan">http://localhost:3001/tarea/todas?prioridad=('baja', 'media', 'alta')</span>:
    peticion de tipo GET, ademas incluir el token que se suministro al iniciar sesion. Se devolveran las tareas filtradas por prioridad.
</li>

<li>
    <span style="color:cyan">http://localhost:3001/tarea/detalle: </span>
    peticion de tipo GET, ademas incluir el token que se suministro al iniciar sesion. Se devolvera la tarea segun el "id" que se envie por body
</li>

<li>
    <span style="color:cyan">http://localhost:3001/tarea/eliminar: </span>
    peticion de tipo DELETE, ademas incluir el token que se suministro al iniciar sesion. Se eliminara la tarea segun el "id" que se envie por body.
</li>

<li>
    <span style="color:cyan">http://localhost:3001/tarea/editar: </span>
    peticion de tipo PUT, ademas incluir el token que se suministro al iniciar sesion. se debera enviar por body un json/objeto con las propiedades (todas menos el 'id' es opcional) {id,titulo,descripcion,prioridad} Se editara la tarea segun el "id" que se envie por body.
</li>
</ul>