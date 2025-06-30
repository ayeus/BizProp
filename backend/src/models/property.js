const pool = require('../config/database');

const propertyModel = {
  async createProperty({ user_id, type, size, location_description, city, area, images, contact_number, price, status }) {
    const imagesStr = images ? images.join(',') : null;
    const [result] = await pool.query(
      `INSERT INTO properties 
       (user_id, type, size, location_description, city, area, images, contact_number, price, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, type, size, location_description, city, area, imagesStr, contact_number, price, status]
    );

    const [rows] = await pool.query('SELECT * FROM properties WHERE property_id = ?', [result.insertId]);
    return rows[0];
  },

  async getProperties({ city, type }) {
    let query = 'SELECT * FROM properties WHERE 1=1';
    const params = [];
    if (city) {
      query += ' AND city = ?';
      params.push(city);
    }
    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    const [rows] = await pool.query(query, params);
    return rows.map(row => ({
      ...row,
      images: row.images ? row.images.split(',') : []
    }));
  }
};

module.exports = propertyModel;