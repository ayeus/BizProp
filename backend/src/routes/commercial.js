const express = require('express');
const router = express.Router();
const commercialModel = require('../models/commercial');
const validator = require('../utils/validator');
const auth = require('../middleware/auth');

// Create commercial place
router.post('/', auth, async (req, res, next) => {
  try {
    const { error } = validator.commercialSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const commercial = await commercialModel.createCommercial({
      ...req.body,
      user_id: req.user.user_id
    });
    res.json(commercial);
  } catch (err) {
    next(err);
  }
});

// Get commercial places
router.get('/', async (req, res, next) => {
  try {
    const { city, type } = req.query;
    const commercials = await commercialModel.getCommercials({ city, type });
    res.json(commercials);
  } catch (err) {
    next(err);
  }
});

module.exports = router;