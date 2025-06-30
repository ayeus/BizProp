import React from 'react';
import InquiryForm from '../components/InquiryForm';

const Consulting: React.FC = () => {
  return (
    <div>
      <div className="bg-red-100 p-8 rounded-lg mb-8 text-center">
        <h1 className="text-3xl font-bold text-red-800">Consulting Services</h1>
        <p className="text-lg text-gray-600">Get expert advice for your business property needs.</p>
      </div>
      <InquiryForm />
    </div>
  );
};

export default Consulting;