import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CommercialForm: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: 'shop',
    size: '',
    location_description: '',
    city: '',
    contact_number: '',
    price: '',
    images: [] as string[],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImageFiles(Array.from(e.target.files));
  };

  const uploadImages = async (): Promise<string[]> => {
    const imageUrls: string[] = [];
    for (const file of imageFiles) {
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result?.toString().split(',')[1]);
        reader.readAsDataURL(file);
      });

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/properties/upload-image`,
        { file: base64, filename: `${Date.now()}-${file.name}` },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      imageUrls.push(res.data.url);
    }
    return imageUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const images = await uploadImages();
      const payload = { ...formData, images, user_id: user.user_id };
      await axios.post(`${process.env.REACT_APP_API_URL}/commercial`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSuccess('Commercial place posted successfully!');
      setFormData({
        type: 'shop',
        size: '',
        location_description: '',
        city: '',
        contact_number: '',
        price: '',
        images: [],
      });
      setImageFiles([]);
    } catch (err) {
      setError((err as any).response?.data?.error || 'Failed to post commercial place');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-red-800">Post a Commercial Place</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Type</label>
          <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="shop">Shop</option>
            <option value="bank">Bank</option>
            <option value="atm">ATM</option>
            <option value="eatery">Eatery</option>
            <option value="medical">Medical</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Size (sq.ft)</label>
          <input
            type="number"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Location Description</label>
          <textarea
            name="location_description"
            value={formData.location_description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Contact Number</label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="btn-primary w-full py-3 rounded text-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommercialForm;