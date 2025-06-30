const request = require('supertest');
const app = require('../server');
const pool = require('../src/config/database');

describe('Property Routes', () => {
  beforeAll(async () => {
    await pool.query('DELETE FROM properties');
    await pool.query('INSERT INTO users (name, phone_number, intent, verified) VALUES (?, ?, ?, ?)', 
      ['Test User', '+919876543211', 'seller', 1]);
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should create a property', async () => {
    const token = require('jsonwebtoken').sign(
      { user_id: 1, intent: 'seller' },
      process.env.JWT_SECRET
    );
    const res = await request(app)
      .post('/api/properties')
      .set('Authorization', `Bearer ${token}`)
      .send({
        type: 'open_plot',
        size: 1000,
        location_description: 'Near MIDC',
        city: 'Nagpur',
        area: 'MIDC',
        images: ['https://s3.amazonaws.com/image.jpg'],
        contact_number: '+919876543211',
        price: 500000,
        status: 'sell'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('property_id');
  });
});