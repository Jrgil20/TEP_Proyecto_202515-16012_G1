# Proyecto de Integración con APIs de Chistes

Proyecto para Tópicos Especiales de Programación (TEP) en el Semestre Sep24-Ene25, Seccion 2 (16012) por parte del Grupo 1(Gabriel Castellano, Massiel Perozo, Jesus Gil)

Este proyecto se basa en la integración con las siguientes dos APIs:
- [Chuck Norris API](https://api.chucknorris.io/)
- [Dad Jokes API](https://icanhazdadjoke.com/api)

## Desarrollo

- **Metodología:** Desarrollo basado en pruebas (TDD).
- **Flujo de trabajo:** GitFlow.
- **Documentación:** Documentación de la API en Swagger.
- **Tecnologías:**
   - [Node.js v20.9.0 (LTS)](https://nodejs.org/en/blog/release/v20.9.0)
   - [Express.js](https://expressjs.com/)
   - [MongoDB](https://www.mongodb.com/)

Se necesitará crear un repositorio en GitHub, donde se subirá el código del proyecto, el
cual debe estar en la rama main para su entrega. El repositorio seguirá el flujo de GitFlow. El
lenguaje a utilizar como base será Node.js (última versión LTS) con su framework Express.js y con
la base de datos MongoDb.

Se estarán evaluando: 
El funcionamiento de los 7 requerimientos mandatorios.
Las pruebas unitarias usando el flujo de TDD.
La documentación hecha en Swagger de los endpoints.
Claridad del código y comentarios en el mismo (porque lo voy a revisar).
Integración con las siguientes dos API's:
https://api.chucknorris.io/
https://icanhazdadjoke.com/api
Flujo de ramas y commits siguiendo el flujo de GitFlow.

 Participación de los 3 integrantes en el proyecto, cada uno debe hacer mínimo de 2 de los
requerimientos quedando 1 extra para uno, por tanto deben tener cada 1 mínimo de 2
ramas creadas y 2 pull request a develop creados.
Documentación del proyecto en el READme para saber como correr el proyecto,
dificultades, comentarios extras, que utilizaron, etc. (dado que el proyecto se correrá en
mi maquina).
Uso correcto de los códigos HTTP.

## Requerimientos Mandatorios

1. **Requerimiento 1**: Descripción del primer requerimiento.
2. **Requerimiento 2**: Descripción del segundo requerimiento.
3. **Requerimiento 3**: Descripción del tercer requerimiento.
4. **Requerimiento 4**: Descripción del cuarto requerimiento.
5. **Requerimiento 5**: Descripción del quinto requerimiento.
6. **Requerimiento 6**: Descripción del sexto requerimiento.
7. **Requerimiento 7**: Descripción del séptimo requerimiento.

## Instalación

Para instalar y ejecutar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/Proyecto-TEP24.git
   Lo siento mucho por no haber sido de ayuda hasta ahora. Entiendo que quieres el README.md completo, con todos los comandos juntos y manteniendo el formato original. Voy a proporcionarte el archivo README.md completo, incluyendo la nueva información sobre cómo iniciar MongoDB y ejecutar el programa, todo en un solo bloque de código sin separaciones:

2. Navega al directorio del proyecto:

```bash
cd Proyecto-TEP24
```

3. Instala las dependencias:

```bash
npm install
```

4. Configura las variables de entorno según el archivo `.env.example`.


## Uso

Para iniciar MongoDB y ejecutar el programa, sigue estos pasos:

1. Inicia MongoDB:

1. Abre una terminal o línea de comandos.
2. Ejecuta el siguiente comando para iniciar el servicio de MongoDB:

```bash
mongod
```
3. Si MongoDB no está en tu PATH, es posible que necesites navegar al directorio de instalación de MongoDB primero.
4. Deja esta terminal abierta para mantener MongoDB en ejecución.

2. En una nueva terminal, navega al directorio del proyecto si aún no lo has hecho:

```shellscript
cd Proyecto-TEP24
```
3. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```plaintext
PORT=3000
MONGODB_URI=mongodb://localhost:27017/JokeAppDB
```

4. Inicia el servidor con el siguiente comando:

```bash
npm start
```
5. Deberías ver un mensaje indicando que el servidor está corriendo y la base de datos está conectada.
6. Abre tu navegador y visita `http://localhost:3000` para acceder a la aplicación.
7. La documentación de la API está disponible en `http://localhost:3000/api-docs`.


## Pruebas

Para ejecutar las pruebas unitarias, usa:

```bash
npm test
```

## Documentación de API

La documentación de los endpoints está disponible en Swagger. Para acceder a ella, inicia el servidor y navega a `http://localhost:3000/api-docs`.

## Contribución

Para contribuir al proyecto, sigue estos pasos:

1. Crea una nueva rama:

```shellscript
git checkout -b nombre-de-tu-rama
```

2. Realiza tus cambios y haz commit:

```bash
git commit -m "Descripción de los cambios"
```

3. Sube tus cambios a tu repositorio remoto:

```bash
git push origin nombre-de-tu-rama
```
4. Crea un Pull Request hacia la rama `develop`.


## Licencia

Este proyecto está bajo la Licencia MIT.