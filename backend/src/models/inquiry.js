const pool = require('../config/database');

const inquiryModel = {
  async createInquiry({ user_id, name, contact, details }) {
    const [result] = await pool.query(
      'INSERT INTO inquiries (user_id, name, contact, details) VALUES (?, ?, ?, ?)',
      [user_id, name, contact, details]
    );

    const [rows] = await pool.query('SELECT * FROM inquiries WHERE inquiry_id = ?', [result.insertId]);
    return rows[0];
  }
};

module.exports = inquiryModel;