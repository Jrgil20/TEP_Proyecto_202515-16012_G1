// This file contains unit tests for the joke controller
// It addresses the requirement for unit testing using TDD

import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Joke API', () => {
  // Test for Requirement 1
  it('should get a Chuck Norris joke', async () => {
    const res = await request(app).get('/api/jokes/Chuck');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('joke');
  });

  // Test for Requirement 1
  it('should get a Dad joke', async () => {
    const res = await request(app).get('/api/jokes/Dad');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('joke');
  });

});

