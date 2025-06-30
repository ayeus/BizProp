const express = require('express');
const router = express.Router();
const propertyModel = require('../models/property');
const validator = require('../utils/validator');
const auth = require('../middleware/auth');
const s3 = require('../config/aws');

// Upload image to S3
router.post('/upload-image', auth, async (req, res, next) => {
  try {
    const { file, filename } = req.body;
    if (!file || !filename) return res.status(400).json({ error: 'File and filename required' });

    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: filename,
      Body: Buffer.from(file, 'base64'),
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    };

    const data = await s3.upload(params).promise();
    res.json({ url: data.Location });
  } catch (err) {
    next(err);
  }
});

// Create property
router.post('/', auth, async (req, res, next) => {
  try {
    const { error } = validator.propertySchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const property = await propertyModel.createProperty({
      ...req.body,
      user_id: req.user.user_id
    });
    res.json(property);
  } catch (err) {
    next(err);
  }
});

// Get properties
router.get('/', async (req, res, next) => {
  try {
    const { city, type } = req.query;
    const properties = await propertyModel.getProperties({ city, type });
    res.json(properties);
  } catch (err) {
    next(err);
  }
});

module.exports = router;