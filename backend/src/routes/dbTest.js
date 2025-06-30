// routes/dbTest.js
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({ 
      status: 'Database connected',
      result: rows[0].solution 
    });
  } catch (err) {
    console.error('Database test failed:', err);
    res.status(500).json({ 
      status: 'Database connection failed',
      error: err.message 
    });
  }
});

module.exports = router;