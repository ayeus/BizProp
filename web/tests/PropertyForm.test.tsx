import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';
import PropertyForm from '../src/components/PropertyForm';

test('renders PropertyForm when authenticated', () => {
  jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('mock-token');
  render(
    <AuthProvider>
      <BrowserRouter>
        <PropertyForm />
      </BrowserRouter>
    </AuthProvider>
  );
  expect(screen.getByText(/Post a Property/i)).toBeInTheDocument();
});