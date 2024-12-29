import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { app, server } from '../src/index'; // Asegúrate de que este sea el archivo correcto

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
  
  // Cierra el servidor
  server.close();
});

describe('POST /api/jokes', () => {
  it('should create a new joke', async () => {
    const response = await request(app) // Usa la app aquí
      .post('/api/jokes')
      .send({ text: 'Why did the scarecrow win an award? He was outstanding in his field.' });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.text).toBe('Why did the scarecrow win an award? He was outstanding in his field.');
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/api/jokes')
      .send({}); // Enviar un objeto vacío para simular un error

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});