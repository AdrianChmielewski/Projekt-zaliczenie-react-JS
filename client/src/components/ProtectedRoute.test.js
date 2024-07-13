import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import ProtectedRoute from './ProtectedRoute';

jest.mock('../contexts/UserContext', () => ({
  ...jest.requireActual('../contexts/UserContext'),
  useUserContext: () => ({
    user: null, // Symulacja braku zalogowanego użytkownika
  }),
}));

test('redirects to home page if user is not logged in', () => {
  const { container } = render(
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/protected" element={<ProtectedRoute />} />
        </Routes>
      </UserProvider>
    </Router>
  );

  expect(container.innerHTML).toContain('Home Page');
});
