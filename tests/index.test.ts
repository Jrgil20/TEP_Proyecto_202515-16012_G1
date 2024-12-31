import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/index';
import Joke from '../src/models/joke';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('GET /', () => {
  it('should return Hello, world!', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello, world!');
    expect(response.status).toBe(200);
  });
});

describe('POST /api/jokes', () => {
  it('should create a new joke', async () => {
    const response = await request(app)
      .post('/api/jokes')
      .send({
        text: 'Why did the scarecrow win an award? He was outstanding in his field.',
        author: 'Anonymous',
        rating: 8,
        category: 'Dad joke'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.text).toBe('Why did the scarecrow win an award? He was outstanding in his field.');
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/jokes')
      .send({
        author: 'Anonymous',
        rating: 8
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});

describe('PUT /api/jokes/:id', () => {
  it('should update an existing joke', async () => {
    const joke = new Joke({
      text: 'Original joke',
      author: 'Original Author',
      rating: 5,
      category: 'Dad joke'
    });
    await joke.save();

    const response = await request(app)
      .put(`/api/jokes/${joke._id}`)
      .send({
        text: 'Updated joke',
        author: 'Updated Author',
        rating: 8,
        category: 'Humor Negro'
      });

    expect(response.status).toBe(200);
    expect(response.body.text).toBe('Updated joke');
    expect(response.body.author).toBe('Updated Author');

    const updatedJoke = await Joke.findById(joke._id);
    expect(updatedJoke?.text).toBe('Updated joke');
    expect(updatedJoke?.author).toBe('Updated Author');
  });

  it('should return 404 if joke not found', async () => {
    const response = await request(app)
      .put('/api/jokes/nonexistentid')
      .send({
        text: 'Updated joke',
        rating: 8,
        category: 'Humor Negro'
      });

    expect(response.status).toBe(404);
  });
});

