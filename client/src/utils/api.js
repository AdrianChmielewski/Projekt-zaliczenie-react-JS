export const fetchMovies = async (query) => {
  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=37fbdb22`);
    const data = await response.json();
    console.log('fetchMovies response:', data);
    if (data.Response === "True") {
      const detailedMovies = await Promise.all(data.Search.map(async (movie) => {
        const details = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=37fbdb22`).then(res => res.json());
        return { ...movie, imdbRating: details.imdbRating };
      }));
      // Filtruj filmy bez oceny IMDb
      const moviesWithRatings = detailedMovies.filter(movie => movie.imdbRating && movie.imdbRating !== 'N/A');
      return moviesWithRatings;
    }
    return [];
  } catch (error) {
    console.error('Error in fetchMovies:', error);
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=37fbdb22`);
    const data = await response.json();
    console.log('fetchMovieDetails response:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchMovieDetails:', error);
    return null;
  }
};
