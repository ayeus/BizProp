const request = require('supertest');
const app = require('../server');
const pool = require('../src/config/database');

describe('User Routes', () => {
  beforeAll(async () => {
    await pool.query('DELETE FROM users');
    await pool.query('DELETE FROM otps');
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should register a user and send OTP via email', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        phone_number: '+919876543210',
        intent: 'buyer'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('OTP sent to your email');
  });

  it('should fail registration with invalid email', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Jane Doe',
        email: 'invalid-email',
        phone_number: '+919876543211',
        intent: 'seller'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/email must be a valid email/);
  });
});