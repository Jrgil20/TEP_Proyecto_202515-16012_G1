import express from 'express';
import mongoose from 'mongoose';
import Joke from './models/joke';

const app = express();
const port = process.env.PORT || 3000;

// Función para conectar a MongoDB
const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
    process.exit(1);
  }
};

// Conectar a MongoDB solo si no estamos en modo de prueba
if (process.env.NODE_ENV !== 'test') {
  connectDB('mongodb://127.0.0.1:27017/TEP_project');
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/api/jokes', async (req, res) => {
  try {
    const { text, author, rating, category } = req.body;
    if (!text || !rating || !category) {
      return res.status(400).json({ message: "Campos requeridos faltantes" });
    }
    const joke = new Joke({ text, author, rating, category });
    await joke.save();
    res.status(201).json({ id: joke._id, text: joke.text });
  } catch (error) {
    console.error('Error al crear el chiste:', error);
    res.status(400).json({ message: "Error al crear el chiste", error: (error as Error).message });
  }
});

app.put('/api/jokes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Chiste no encontrado" });
    }

    const { text, author, rating, category } = req.body;
    const joke = await Joke.findByIdAndUpdate(
      id,
      { text, author, rating, category },
      { new: true, runValidators: true }
    );
    
    if (!joke) {
      return res.status(404).json({ message: "Chiste no encontrado" });
    }
    
    res.json(joke);
  } catch (error) {
    console.error('Error al actualizar el chiste:', error);
    res.status(400).json({ message: "Error al actualizar el chiste", error: (error as Error).message });
  }
});

app.delete('/api/jokes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Chiste no encontrado" });
    }

    const joke = await Joke.findByIdAndDelete(id);
    if (!joke) {
      return res.status(404).json({ message: "Chiste no encontrado" });
    }
    res.json({ message: "Chiste eliminado" });
  } catch (error) {
    console.error('Error al eliminar el chiste:', error);
    res.status(500).json({ message: "Error al eliminar el chiste", error: (error as Error).message });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export default app;