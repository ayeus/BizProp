import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import PropertyForm from './components/PropertyForm';
import CommercialForm from './components/CommercialForm';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import OtpVerification from './components/OtpVerification';
import Consulting from './pages/Consulting';
import PropertyDetails from './pages/PropertyDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post-property" element={<PropertyForm />} />
              <Route path="/post-commercial" element={<CommercialForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/otp-verification" element={<OtpVerification />} />
              <Route path="/consulting" element={<Consulting />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;