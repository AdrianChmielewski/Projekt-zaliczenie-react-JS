import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import App from './App';

test('renders app and checks for NavBar content', () => {
  render(
    <Router>
      <UserProvider>
        <App />
      </UserProvider>
    </Router>
  );

  expect(screen.getByText(/strona główna/i)).toBeInTheDocument();
  expect(screen.getByText(/zaloguj/i)).toBeInTheDocument();
  expect(screen.getByText(/zarejestruj/i)).toBeInTheDocument();
});
