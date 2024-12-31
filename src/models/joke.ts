import mongoose from 'mongoose';

const jokeSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  rating: { type: Number, required: true, min: 1, max: 10 },
  category: { type: String, required: true }
});

const Joke = mongoose.model('Joke', jokeSchema);

export default Joke;

