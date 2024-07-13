import React, { useState, useContext } from 'react';
import SearchBar from '../components/SearchBar';
import MovieDetails from '../components/MovieDetails';
import { UserContext } from '../contexts/UserContext';
import './HomePage.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const { favorites = [] } = useContext(UserContext); // Domyślnie favorites jako pusta tablica

  const handleRemove = (imdbID) => {
    setMovies(movies.filter(movie => movie.imdbID !== imdbID));
  };

  const filteredMovies = movies.filter(movie => !favorites.some(fav => fav.imdbID === movie.imdbID));

  console.log('Filtered movies:', filteredMovies);

  return (
    <div className="home-page">
      <div className="search-bar-container">
        <SearchBar onSearch={setMovies} />
      </div>
      <div className="movies-container">
        {filteredMovies.map(movie => (
          <MovieDetails key={movie.imdbID} movie={movie} isHomePage onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
