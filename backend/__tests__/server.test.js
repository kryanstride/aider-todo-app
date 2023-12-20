const request = require('supertest');
const app = require('../server');

describe('API tests', () => {
  test('GET /todos', async () => {
    const response = await request(app).get('/todos');
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  test('POST /todos', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ text: 'Test Todo' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
  });
});
