import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import MovieDetails from './MovieDetails';
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

test('renders MovieDetails with movie title', async () => {
  fetchMovieDetails.mockResolvedValue({ ...movie, imdbRating: '9.3' });

  await act(async () => {
    render(
      <Router>
        <UserProvider>
          <MovieDetails movie={movie} isHomePage />
        </UserProvider>
      </Router>
    );
  });

  await screen.findByText(/the shawshank redemption/i);
  expect(screen.getByText(/9.3/i)).toBeInTheDocument();
});

test('adds movie to favorites when user is logged in', async () => {
  fetchMovieDetails.mockResolvedValue({ ...movie, imdbRating: '9.3' });
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
          <MovieDetails movie={movie} isHomePage />
        </UserProvider>
      </Router>
    );
  });

  fireEvent.click(screen.getByText(/dodaj do ulubionych/i));
  expect(mockAddFavorite).toHaveBeenCalledWith(movie);
});
