import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const OtpVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useContext(AuthContext);
  
  // Store formData in state to prevent loss on refresh
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone_number: string;
    intent: string;
  } | null>(null);

  useEffect(() => {
    if (location.state) {
      setFormData(location.state as any);
    } else {
      navigate('/register');
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData) {
      setError('Registration data missing');
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/verify-otp`, {
        email: formData.email,
        otp,
      });
      
      // Assuming the response contains a token
      const token = res.data.token;
      
      // Call login with the received token
      login(token);
      
      setSuccess('Registration successful!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError((err as any).response?.data?.error || 'Invalid OTP');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-red-800">Verify OTP</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded shadow-lg">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="btn-primary w-full py-3 rounded text-lg">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;