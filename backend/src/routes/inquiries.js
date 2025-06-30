const express = require('express');
const router = express.Router();
const inquiryModel = require('../models/inquiry');
const validator = require('../utils/validator');
const auth = require('../middleware/auth');

// Create inquiry
router.post('/', auth, async (req, res, next) => {
  try {
    const { error } = validator.inquirySchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const inquiry = await inquiryModel.createInquiry({
      ...req.body,
      user_id: req.user.user_id
    });
    res.json(inquiry);
  } catch (err) {
    next(err);
  }
});

module.exports = router;