import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import HomePage from './HomePage';

jest.mock('../components/SearchBar', () => () => <div>SearchBar Mock</div>);

test('renders HomePage with search bar', () => {
  render(
    <Router>
      <UserProvider>
        <HomePage />
      </UserProvider>
    </Router>
  );

  expect(screen.getByText(/searchbar mock/i)).toBeInTheDocument();
});
