# Proyecto de Integración con APIs de Chistes

Proyecto para Tópicos Especiales de Programación (TEP) en el Semestre Sep24-Ene25, Seccion 2 (16012) por parte del Grupo 1(Gabriel Castellano, Massiel Perozo, Jesus Gil)

Este proyecto se basa en la integración con las siguientes dos APIs:
- [Chuck Norris API](https://api.chucknorris.io/)
- [Dad Jokes API](https://icanhazdadjoke.com/api)

## Requerimientos

### 1. Obtener un chiste
**Endpoint:** `GET /joke/:type`

Obtiene un chiste basado en el tipo especificado en el parámetro de la URL.

- **Parámetros:**
    - `type` (string): Puede ser "Chuck", "Dad" o "Propio".
        - "Chuck": Obtiene un chiste de la API de Chuck Norris.
        - "Dad": Obtiene un chiste de la API de Dad Jokes.
        - "Propio": Obtiene un chiste de la base de datos interna. Si no hay chistes, retorna el mensaje "Aun no hay chistes, cree uno!".
        - Cualquier otro valor retorna un error.

### 2. Crear un chiste
**Endpoint:** `POST /joke`

Guarda un chiste en la base de datos.

- **Cuerpo de la solicitud:**
    - `texto` (string, requerido): Texto del chiste.
    - `autor` (string, opcional): Nombre de quien escribió el chiste. Si no se proporciona, se asigna "Se perdió en el Ávila como Led".
    - `puntaje` (number, requerido): Puntaje del 1 al 10 para saber qué tan bueno es el chiste.
    - `categoria` (string, requerido): Categoría del chiste. Valores permitidos: "Dad joke", "Humor Negro", "Chistoso", "Malo".

- **Respuesta:**
    - Retorna el ID del chiste creado.

### 3. Actualizar un chiste
**Endpoint:** `PUT /joke/:id`

Actualiza los campos de un chiste existente basado en su ID.

- **Parámetros:**
    - `id` (string): ID del chiste a actualizar.

- **Cuerpo de la solicitud:**
    - Cualquier campo mencionado en el endpoint de creación de chistes, excepto el ID.

### 4. Eliminar un chiste
**Endpoint:** `DELETE /joke/:id`

Elimina un chiste basado en su ID.

- **Parámetros:**
    - `id` (string): ID del chiste a eliminar.

### 5. Obtener un chiste por ID
**Endpoint:** `GET /joke/:id`

Obtiene un chiste basado en su ID.

- **Parámetros:**
    - `id` (string): ID del chiste a obtener.

- **Respuesta:**
    - Si el chiste no existe, retorna un error.

### 6. Obtener cantidad de chistes por categoría
**Endpoint:** `GET /jokes/count/:categoria`

Obtiene la cantidad de chistes en la base de datos por categoría.

- **Parámetros:**
    - `categoria` (string): Categoría de los chistes a contar.

- **Respuesta:**
    - Si no existen chistes en la categoría especificada, retorna un mensaje de error.

### 7. Obtener chistes por puntaje
**Endpoint:** `GET /jokes/score/:puntaje`

Obtiene todos los chistes en la base de datos con un puntaje específico.

- **Parámetros:**
    - `puntaje` (number): Puntaje de los chistes a obtener.

- **Respuesta:**
    - Si no existen chistes con el puntaje especificado, retorna un mensaje de error.

## Desarrollo

- **Metodología:** Desarrollo basado en pruebas (TDD).
- **Flujo de trabajo:** GitFlow.
- **Documentación:** Documentación de la API en Swagger.
- **Tecnologías:**
    - [Node.js v20.9.0 (LTS)](https://nodejs.org/en/blog/release/v20.9.0)
    - [Express.js](https://expressjs.com/)
    - [MongoDB](https://www.mongodb.com/)