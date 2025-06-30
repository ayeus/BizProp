const pool = require('../config/database');

const commercialModel = {
  async createCommercial({ user_id, type, size, location_description, city, images, contact_number, price }) {
    const imagesStr = images ? images.join(',') : null;
    const [result] = await pool.query(
      `INSERT INTO commercial_places 
       (user_id, type, size, location_description, city, images, contact_number, price) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, type, size, location_description, city, imagesStr, contact_number, price]
    );

    const [rows] = await pool.query('SELECT * FROM commercial_places WHERE place_id = ?', [result.insertId]);
    return rows[0];
  },

  async getCommercials({ city, type }) {
    let query = 'SELECT * FROM commercial_places WHERE 1=1';
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

module.exports = commercialModel;