import React from 'react';
import { Link } from 'react-router-dom';

interface Property {
  property_id: number;
  type: string;
  size: number;
  city: string;
  price: number;
  status: string;
  images: string[];
}

const PropertyList: React.FC<{ properties: Property[] }> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.length === 0 ? (
        <p className="text-gray-600 text-center col-span-3">No properties found.</p>
      ) : (
        properties.map((prop) => (
          <Link to={`/property/${prop.property_id}`} key={prop.property_id}>
            <div className="card bg-white rounded-lg shadow-md overflow-hidden">
              {prop.images && prop.images.length > 0 ? (
                <img
                  src={prop.images[0]}
                  alt={prop.type}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span>No Image</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-red-800">
                  {prop.type.replace('_', ' ').toUpperCase()} in {prop.city}
                </h3>
                <p className="text-gray-600">Size: {prop.size} sq.ft</p>
                <p className="text-gray-600">Price: ₹{prop.price.toLocaleString()}</p>
                <p className="text-gray-600 capitalize">Status: {prop.status}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default PropertyList;