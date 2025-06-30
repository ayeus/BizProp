import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/properties`);
        const prop = res.data.find((p: any) => p.property_id === parseInt(id || '0'));
        if (prop) {
          setProperty(prop);
        } else {
          setError('Property not found');
        }
      } catch (err) {
        setError('Failed to fetch property');
      }
    };
    fetchProperty();
  }, [id]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!property) return <p className="text-gray-600 text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-red-800">
        {property.type.replace('_', ' ').toUpperCase()} in {property.city}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0]}
              alt={property.type}
              className="w-full h-64 object-cover rounded"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded">
              <span>No Image</span>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <p><strong>Size:</strong> {property.size} sq.ft</p>
          <p><strong>Price:</strong> ₹{property.price.toLocaleString()}</p>
          <p><strong>Status:</strong> {property.status.toUpperCase()}</p>
          <p><strong>Location:</strong> {property.location_description}</p>
          <p><strong>City:</strong> {property.city}</p>
          {property.area && <p><strong>Area:</strong> {property.area}</p>}
          <p><strong>Contact:</strong> {property.contact_number}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;