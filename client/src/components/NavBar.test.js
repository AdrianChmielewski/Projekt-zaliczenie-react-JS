import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import NavBar from './Navbar';

// Mock UserContext
const mockLogout = jest.fn();
jest.mock('../contexts/UserContext', () => ({
  ...jest.requireActual('../contexts/UserContext'),
  useUserContext: () => ({
    user: { username: 'testuser' },
    logout: mockLogout,
  }),
}));

test('renders NavBar with user info and logout button when logged in', () => {
  render(
    <Router>
      <UserProvider>
        <NavBar />
      </UserProvider>
    </Router>
  );

  expect(screen.getByText(/witaj, testuser/i)).toBeInTheDocument();
  expect(screen.getByText(/wyloguj/i)).toBeInTheDocument();
  
  fireEvent.click(screen.getByText(/wyloguj/i));
  expect(mockLogout).toHaveBeenCalled();
});
