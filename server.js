const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));

// Configuracion de opciones de Swagger UI para mayor interactividad
const options = {
  explorer: true,
  swaggerOptions: {
    docExpansion: 'list',
    filter: true,
    showRequestHeaders: true,
    supportedSubmitMethods: ['get', 'post', 'put', 'delete'],
    validatorUrl: null,
  }
};

//Servir la documentacion de swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/JokeAppDB');

// Definición del modelo de Joke
const Joke = mongoose.model('Joke', {
    text: String,
    author: String,
    rating: Number,
    category: String
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas

///Requerimiento 2
app.post('/api/jokes', async (req, res) => {
    try {
        const joke = new Joke(req.body);
        await joke.save();
        res.status(201).json({ id: joke._id });
    } catch (error) {
        res.status(400).json({ message: "Error al crear el chiste" });
    }
});

///Requerimiento 3
app.put('/api/jokes/:id', async (req, res) => {
    try {
        const joke = await Joke.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!joke) {
            return res.status(404).json({ message: "Chiste no encontrado" });
        }
        res.json(joke);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el chiste" });
    }
});

//Requerimiento 4 
app.delete('/api/jokes/:id', async (req, res) => {
    try {
        const joke = await Joke.findByIdAndDelete(req.params.id);
        if (!joke) {
            return res.status(404).json({ message: "Chiste no encontrado" });
        }
        res.json({ message: "Chiste eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el chiste" });
    }
});

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Visita http://localhost:${PORT} para acceder a la aplicación`);
});