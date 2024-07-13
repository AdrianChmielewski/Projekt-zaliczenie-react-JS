import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import FavoritesPage from './FavoritesPage';

// Mock UserContext
jest.mock('../contexts/UserContext', () => ({
  ...jest.requireActual('../contexts/UserContext'),
  useUserContext: () => ({
    favorites: [
      {
        imdbID: 'tt0111161',
        Title: 'The Shawshank Redemption',
        Year: '1994',
        Poster: 'https://example.com/poster.jpg',
      },
    ],
  }),
}));

test('renders FavoritesPage with favorite movies', () => {
  render(
    <Router>
      <UserProvider>
        <FavoritesPage />
      </UserProvider>
    </Router>
  );

  expect(screen.getByText(/the shawshank redemption/i)).toBeInTheDocument();
});
