// filepath: /e:/Dev/TEP_Proyecto_202515-16012_G1-1/src/server.ts
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import jokeRoutes from './routes/jokeRoutes';
import connectDB from './db';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Routes
app.use('/api', jokeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;