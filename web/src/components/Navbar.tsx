import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <Link to="/" className="text-2xl font-bold">BizProp</Link>
        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/buy" className="hover:text-gray-200">Buy</Link>
          <Link to="/rent" className="hover:text-gray-200">Rent</Link>
          <Link to="/sell" className="hover:text-gray-200">Sell</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
              <button onClick={handleLogout} className="btn-primary px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-primary px-4 py-2 rounded">Login</Link>
              <Link to="/register" className="btn-secondary px-4 py-2 rounded">Register</Link>
            </>
          )}
          <Link to="/post-property" className="btn-secondary px-4 py-2 rounded">Post Property</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;