import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import MoviePage from './MoviePage';
import { fetchMovieDetails } from '../utils/api';

// Mock fetchMovieDetails
jest.mock('../utils/api', () => ({
  fetchMovieDetails: jest.fn(),
}));

const movie = {
  imdbID: 'tt0111161',
  Title: 'The Shawshank Redemption',
  Year: '1994',
  Poster: 'https://example.com/poster.jpg',
};

test('renders MoviePage with movie details', async () => {
  fetchMovieDetails.mockResolvedValue(movie);

  await act(async () => {
    render(
      <Router>
        <UserProvider>
          <MoviePage />
        </UserProvider>
      </Router>
    );
  });

  expect(screen.getByText(/the shawshank redemption/i)).toBeInTheDocument();
});

test('adds movie to favorites when user is logged in', async () => {
  fetchMovieDetails.mockResolvedValue(movie);
  const mockAddFavorite = jest.fn();
  const mockUser = { username: 'testuser' };

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    user: mockUser,
    addFavorite: mockAddFavorite,
  }));

  await act(async () => {
    render(
      <Router>
        <UserProvider>
          <MoviePage />
        </UserProvider>
      </Router>
    );
  });

  fireEvent.click(screen.getByText(/dodaj do ulubionych/i));
  expect(mockAddFavorite).toHaveBeenCalledWith(movie);
});
