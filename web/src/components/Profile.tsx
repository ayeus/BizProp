import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/register');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">User Profile</h2>
      <div className="space-y-4">
        <p><strong>User ID:</strong> {user.user_id}</p>
        <p><strong>Intent:</strong> {user.intent.charAt(0).toUpperCase() + user.intent.slice(1)}</p>
      </div>
    </div>
  );
}

export default Profile;