import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/index';
import Joke from '../src/models/joke';
import request from 'supertest';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
}, 10000); // Aumentamos el tiempo de espera a 10 segundos

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
}, 10000); // Aumentamos el tiempo de espera a 10 segundos

beforeEach(async () => {
  await Joke.deleteMany({});
});

describe('GET /', () => {
  it('should return Hello, world!', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, world!');
  });
});

describe('POST /api/jokes', () => {
  it('should create a new joke', async () => {
    const response = await request(app)
      .post('/api/jokes')
      .send({
        text: 'Test joke',
        author: 'Tester',
        rating: 5,
        category: 'Test'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.text).toBe('Test joke');
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/jokes')
      .send({
        author: 'Tester'
      });
    expect(response.status).toBe(400);
  });
});

describe('PUT /api/jokes/:id', () => {
  it('should update an existing joke', async () => {
    const joke = new Joke({
      text: 'Original joke',
      author: 'Original Author',
      rating: 3,
      category: 'Original Category'
    });
    await joke.save();

    const response = await request(app)
      .put(`/api/jokes/${joke._id}`)
      .send({
        text: 'Updated joke',
        author: 'Updated Author',
        rating: 4,
        category: 'Updated Category'
      });

    expect(response.status).toBe(200);
    expect(response.body.text).toBe('Updated joke');
  });

  it('should return 404 if joke not found', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .put(`/api/jokes/${nonExistentId}`)
      .send({
        text: 'Updated joke',
        author: 'Updated Author',
        rating: 4,
        category: 'Updated Category'
      });

    expect(response.status).toBe(404);
  });

  it('should return 404 if id is invalid', async () => {
    const response = await request(app)
      .put('/api/jokes/invalidid')
      .send({
        text: 'Updated joke',
        author: 'Updated Author',
        rating: 4,
        category: 'Updated Category'
      });

    expect(response.status).toBe(404);
  });
});