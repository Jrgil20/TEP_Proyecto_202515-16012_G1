import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

// Conexión a MongoDB (descomenta si es necesario)
// mongoose.connect('mongodb://127.0.0.1:27017/TEP_project')
//   .then(() => console.log('Conectado a MongoDB'))
//   .catch((err: unknown) => console.error(err));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Inicia el servidor y exporta la app
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Exporta la app y el servidor
export { app, server };