import mongoose, { Document, Schema } from 'mongoose';

export interface IJoke extends Document {
  text: string;
  author: string;
  rating: number;
  category: 'Dad joke' | 'Humor Negro' | 'Chistoso' | 'Malo';
}

const JokeSchema: Schema = new Schema({
  text: { type: String, required: true },
  author: { type: String, default: 'Se perdió en el Ávila como Led' },
  rating: { type: Number, required: true, min: 1, max: 10 },
  category: { type: String, required: true, enum: ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo'] },
});

export default mongoose.model<IJoke>('Joke', JokeSchema);

