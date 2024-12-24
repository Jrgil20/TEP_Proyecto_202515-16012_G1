import express from 'express';

const app = express();
const port = 3000;
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/TEP_project')
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err: unknown) => console.error(err));


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});