import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';
import Home from '../src/components/Home';

test('renders Home component', () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </AuthProvider>
  );
  expect(screen.getByText(/Find a home you'll love/i)).toBeInTheDocument();
});