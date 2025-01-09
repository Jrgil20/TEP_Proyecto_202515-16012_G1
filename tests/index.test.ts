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
}, 60000); // Aumentamos el tiempo de espera a 60 segundos

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
}, 60000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
}, 10000);

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

describe('GET /joke/:type', () => {
  it('should get a Chuck Norris joke', async () => {
    const response = await request(app).get('/joke/Chuck');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('joke');
  });

  it('should get a Dad joke', async () => {
    const response = await request(app).get('/joke/Dad');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('joke');
  });

  it('should get a Propio joke or a default message', async () => {
    // You may need to create a "Propio" joke in your DB before this test
    const response = await request(app).get('/joke/Propio');
    expect(response.status).toBe(200);
    // Either it has a joke property or the default message
    expect(response.body.joke || response.body.message).toBeTruthy();
  });

  it('should return an error for invalid joke type', async () => {
    const response = await request(app).get('/joke/InvalidType');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello, world!');
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

describe('DELETE /api/jokes/:id', () => {
  it('should delete an existing joke', async () => {
    const joke = new Joke({
      text: 'Joke to be deleted',
      author: 'Soon to be gone',
      rating: 3,
      category: 'Malo'
    });
    await joke.save();

    const response = await request(app)
      .delete(`/api/jokes/${joke._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Chiste eliminado");

    const deletedJoke = await Joke.findById(joke._id);
    expect(deletedJoke).toBeNull();
  });

  it('should return 404 if joke not found', async () => {
    const response = await request(app)
      .delete('/api/jokes/nonexistentid');

    expect(response.status).toBe(404);
  });
});

/* TEST REQUERIMIENTO 5 GET JOKE BY ID */

describe('GET /api/jokes/:id', () => {
  it('should return a joke by its ID', async () => {
    const joke = new Joke({
      text: 'Joke to be fetched',
      author: 'Author',
      rating: 4,
      category: 'Category'
    });
    await joke.save();

    console.log("Joke ID:", joke._id); // Log para depuración

    const response = await request(app).get(`/api/jokes/${joke._id}`);
    console.log("Response body:", response.body); // Log para depuración
    expect(response.status).toBe(200);
    expect(response.body.text).toBe('Joke to be fetched');
  });

  it('should return 404 if joke not found', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    console.log("Non-existent ID:", nonExistentId); // Log para depuración

    const response = await request(app).get(`/api/jokes/${nonExistentId}`);
    console.log("Response status:", response.status); // Log para depuración
    expect(response.status).toBe(404);
  });

  it('should return 400 if id is invalid', async () => {
    const response = await request(app).get('/api/jokes/invalidid');
    console.log("Response status:", response.status); // Log para depuración
    expect(response.status).toBe(400);
  });
});

describe('GET /api/jokes/category/:category', () => {
  it('should return the count of jokes in a given category', async () => {
    const joke1 = new Joke({
      text: 'Joke 1',
      author: 'Author 1',
      rating: 4,
      category: 'Category1'
    });
    const joke2 = new Joke({
      text: 'Joke 2',
      author: 'Author 2',
      rating: 5,
      category: 'Category1'
    });
    await joke1.save();
    await joke2.save();

    const response = await request(app).get('/api/jokes/category/Category1');
    expect(response.status).toBe(200);
    expect(response.body.count).toBe(2);
  });

  it('should return 404 if no jokes are found in the given category', async () => {
    const response = await request(app).get('/api/jokes/category/NonExistentCategory');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No jokes found in this category');
  });
});
