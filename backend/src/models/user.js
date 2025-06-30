const pool = require('../config/database');

const userModel = {
  async createUser({ name, email, phone_number, intent, otp }) {
    const expires_at = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
    const [result] = await pool.query(
      `INSERT INTO users (name, email, phone_number, intent) 
       VALUES (?, ?, ?, ?) 
       ON DUPLICATE KEY UPDATE name = ?, phone_number = ?, intent = ?`,
      [name, email, phone_number, intent, name, phone_number, intent]
    );

    await pool.query(
      'INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)',
      [email, otp, expires_at]
    );

    return { user_id: result.insertId || (await this.findUser(email)).user_id };
  },

  async verifyOTP(email, otp) {
    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
  
    try {
      // Check OTP validity
      const [otpRows] = await connection.query(
        'SELECT * FROM otps WHERE email = ? AND otp = ? AND expires_at > NOW() FOR UPDATE',
        [email, otp]
      );
  
      if (otpRows.length === 0) {
        await connection.rollback();
        return null;
      }
  
      // Mark user as verified
      await connection.query(
        'UPDATE users SET verified = TRUE WHERE email = ?',
        [email]
      );
  
      // Delete all OTPs for this email
      await connection.query(
        'DELETE FROM otps WHERE email = ?',
        [email]
      );
  
      // Get user data
      const [userRows] = await connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
      );
  
      await connection.commit();
      return userRows[0];
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
};

module.exports = userModel;