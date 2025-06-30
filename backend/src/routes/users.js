const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const nodemailerService = require('../services/nodemailer');
const validator = require('../utils/validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Register user and send OTP via email
// In your users.js route
router.post('/register', async (req, res, next) => {
    console.log('Register endpoint hit', req.body); // Log incoming request
    try {
      const { error } = validator.userSchema.validate(req.body);
      if (error) {
        console.log('Validation error:', error.details);
        return res.status(400).json({ error: error.details[0].message });
      }
  
      console.log('Validation passed');
      const { name, email, phone_number, intent } = req.body;
      
      console.log('Attempting to send OTP to:', email);
      const otp = await nodemailerService.sendOTP(email, name);
      console.log('OTP generated:', otp);
      
      console.log('Creating user in database');
      await userModel.createUser({ name, email, phone_number, intent, otp });
      console.log('User created successfully');
      
      res.json({ message: 'OTP sent to your email' });
    } catch (err) {
      console.error('COMPLETE ERROR OBJECT:', err);
      console.error('ERROR STACK:', err.stack);
      res.status(500).json({ error: 'Failed to process registration' });
    }
  });
  
  // Verify OTP
  router.post('/verify-otp', async (req, res, next) => {
    try {
      const { error } = validator.otpSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
  
      const { email, otp } = req.body;
      const user = await userModel.verifyOTP(email, otp);
      
      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
      }
  
      const token = jwt.sign(
        { user_id: user.user_id, intent: user.intent },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      res.json({ 
        token,
        user: {
          name: user.name,
          email: user.email,
          intent: user.intent
        }
      });
    } catch (err) {
      console.error('OTP verification error:', err);
      res.status(500).json({ error: 'Failed to verify OTP' });
    }
  });
  
  module.exports = router;