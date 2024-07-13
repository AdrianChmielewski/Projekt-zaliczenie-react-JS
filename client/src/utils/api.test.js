import { fetchMovies, fetchMovieDetails } from './api';

global.fetch = jest.fn();

describe('API tests', () => {
  afterEach(() => {
    fetch.mockClear();
  });

  test('fetchMovies should return movies with ratings', async () => {
    const mockMovies = {
      Search: [
        {
          imdbID: 'tt0111161',
          Title: 'The Shawshank Redemption',
          Year: '1994',
          Poster: 'https://example.com/poster.jpg',
        },
      ],
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockMovies,
    });

    const movies = await fetchMovies('shawshank');
    expect(movies).toEqual(mockMovies.Search);
  });

  test('fetchMovieDetails should return movie details', async () => {
    const mockDetails = {
      imdbID: 'tt0111161',
      Title: 'The Shawshank Redemption',
      Year: '1994',
      Poster: 'https://example.com/poster.jpg',
    };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockDetails,
    });

    const details = await fetchMovieDetails('tt0111161');
    expect(details).toEqual(mockDetails);
  });
});
