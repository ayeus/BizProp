import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PropertyList from '../pages/PropertyList';

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [city, setCity] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/properties`, {
          params: { city, type },
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProperties(res.data);
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };
    fetchProperties();
  }, [city, type, user, navigate]);

  if (!user) return null;

  return (
    <div>
      <div className="bg-red-100 p-8 rounded-lg mb-8 text-center">
        <h1 className="text-3xl font-bold text-red-800">My Dashboard</h1>
        <p className="text-lg text-gray-600">Manage your properties and listings.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Filter by city (e.g., Nagpur)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded w-full md:w-1/3"
        >
          <option value="">All Types</option>
          <option value="open_plot">Open Plot</option>
          <option value="constructed_shed">Constructed Shed</option>
          <option value="ready_to_operate">Ready to Operate</option>
        </select>
        <div className="w-full md:w-1/3"></div>
      </div>
      <PropertyList properties={properties} />
      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/post-property')}
          className="btn-secondary px-6 py-3 rounded text-lg"
        >
          Post New Property
        </button>
      </div>
    </div>
  );
};

export default Dashboard;