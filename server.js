const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

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

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Visita http://localhost:${PORT} para acceder a la aplicación`);
});