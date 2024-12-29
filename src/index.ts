import express from 'express';
import mongoose from 'mongoose';
import Joke from './models/joke';

const app = express();
const port = 3000;

//mongoose.connect('mongodb://127.0.0.1:27017/TEP_project')
//  .then(() => console.log('Conectado a MongoDB'))
//  .catch((err: unknown) => console.error(err));

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
    res.status(400).json({ message: "Error al crear el chiste" });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export default app;

