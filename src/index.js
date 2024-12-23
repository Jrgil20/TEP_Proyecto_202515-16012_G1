const express = require('express');
const mongoose = require('mongoose');
const jokesRouter = require('./routes/jokes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/jokes', jokesRouter);

mongoose.connect('mongodb://mongo:27017/tdd-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});