const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const nodemailerService = {
    async sendOTP(email, name) {
      try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const mailOptions = {
          from: `"BizProp" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'BizProp OTP Verification',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #d9230f;">BizProp OTP Verification</h2>
              <p>Dear ${name},</p>
              <p>Your verification code is:</p>
              <h3 style="background: #f5f5f5; padding: 10px; display: inline-block;">
                ${otp}
              </h3>
              <p>This code will expire in 5 minutes.</p>
              <p>If you didn't request this, please ignore this email.</p>
            </div>
          `
        };
  
        await transporter.sendMail(mailOptions);
        return otp;
      } catch (error) {
        console.error('Email sending failed:', error);
        throw new Error('Failed to send OTP email');
      }
    }
  };

  module.exports = nodemailerService;