import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer p-6 mt-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
        <div>
          <h3 className="text-lg font-bold">BizProp</h3>
          <p>Connecting you to the best business properties.</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Links</h3>
          <ul>
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/consulting" className="hover:text-blue-400">Consulting</Link></li>
            <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Contact</h3>
          <p>Email: support@bizprop.com</p>
          <p>Phone: +91 12345 67890</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;