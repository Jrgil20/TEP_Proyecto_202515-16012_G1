// filepath: /e:/Dev/TEP_Proyecto_202515-16012_G1-1/tests/jokeController.test.ts
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/server';
import connectDB from '../src/db';

describe('Joke API', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should get a Chuck Norris joke', async () => {
    const res = await request(app).get('/api/jokes/Chuck');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('joke');
  });

  it('should get a Dad joke', async () => {
    const res = await request(app).get('/api/jokes/Dad');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('joke');
  });
});