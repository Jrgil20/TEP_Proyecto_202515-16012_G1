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

## Requerimientos


### 1. Obtener un chiste (Jesus Gil)
**Endpoint:** `GET /joke/:type`

Obtiene un chiste basado en el tipo especificado en el parámetro de la URL.

- **Parámetros:**
    - `type` (string): Puede ser "Chuck", "Dad" o "Propio".
        - "Chuck": Obtiene un chiste de la API de Chuck Norris.
        - "Dad": Obtiene un chiste de la API de Dad Jokes.
        - "Propio": Obtiene un chiste de la base de datos interna. Si no hay chistes, retorna el mensaje "Aun no hay chistes, cree uno!".
        - Cualquier otro valor retorna un error.

### 2. Crear un chiste (Massiel Perozo)
**Endpoint:** `POST /joke`

Guarda un chiste en la base de datos.

- **Cuerpo de la solicitud:**
    - `texto` (string, requerido): Texto del chiste.
    - `autor` (string, opcional): Nombre de quien escribió el chiste. Si no se proporciona, se asigna "Se perdió en el Ávila como Led".
    - `puntaje` (number, requerido): Puntaje del 1 al 10 para saber qué tan bueno es el chiste.
    - `categoria` (string, requerido): Categoría del chiste. Valores permitidos: "Dad joke", "Humor Negro", "Chistoso", "Malo".

- **Respuesta:**
    - Retorna el ID del chiste creado.

### 3. Actualizar un chiste (Massiel perozo)
**Endpoint:** `PUT /joke/:id`

Actualiza los campos de un chiste existente basado en su ID.

- **Parámetros:**
    - `id` (string): ID del chiste a actualizar.

- **Cuerpo de la solicitud:**
    - Cualquier campo mencionado en el endpoint de creación de chistes, excepto el ID.

### 4. Eliminar un chiste (Massiel Perozo)
**Endpoint:** `DELETE /joke/:id`

Elimina un chiste basado en su ID.

- **Parámetros:**
    - `id` (string): ID del chiste a eliminar.

### 5. Obtener un chiste por ID (gabriel Castellano)
**Endpoint:** `GET /joke/:id`

Obtiene un chiste basado en su ID.

- **Parámetros:**
    - `id` (string): ID del chiste a obtener.

- **Respuesta:**
    - Si el chiste no existe, retorna un error.

### 6. Obtener cantidad de chistes por categoría (gabriel Castellano)
**Endpoint:** `GET /jokes/count/:categoria`

Obtiene la cantidad de chistes en la base de datos por categoría.

- **Parámetros:**
    - `categoria` (string): Categoría de los chistes a contar.

- **Respuesta:**
    - Si no existen chistes en la categoría especificada, retorna un mensaje de error.

### 7. Obtener chistes por puntaje (Jesus Gil)
**Endpoint:** `GET /jokes/score/:puntaje`

Obtiene todos los chistes en la base de datos con un puntaje específico.

- **Parámetros:**
    - `puntaje` (number): Puntaje de los chistes a obtener.

- **Respuesta:**
    - Si no existen chistes con el puntaje especificado, retorna un mensaje de error.

## Configuración para Ejecutar el Proyecto

Si no tienes instalado Node ni MongoDB localmente, puedes dirigirte a:

[https://github.com/Jrgil20/mongodb-codespaces](https://github.com/Jrgil20/mongodb-codespaces)

1. Clona o haz un fork del repositorio, o crea un codespace como invitado.
2. Una vez en el codespace, trae el otro repositorio:

    ```bash
    git clone https://github.com/Jrgil20/TEP_Proyecto_202515-16012_G1.git
    ```

3. Accede a la carpeta:

    ```bash
    cd TEP_Proyecto_202515-16012_G1
    ```

4. Crea el archivo `.env` con:

    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/JokeAppDB
    # o la conexión que prefieras
    ```

5. Configura la conexión desde la extensión de MongoDB.
 MONGODB_URI=mongodb://localhost:27017/JokeAppDB

6. Instala las dependencias:

    ```bash
    npm install && npm install axios
    ```

7. Para probar tu configuración:

    ```bash
    npm test
    ```

8. Para ejecutar el servidor:

    ```bash
    node server
    ```

Con estas instrucciones, tendrás un entorno remoto o local configurado para desarrollar y probar el proyecto.

## Instalación

Para instalar y ejecutar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/Proyecto-TEP24.git
   ```

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
