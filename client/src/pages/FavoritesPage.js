import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import MovieDetails from '../components/MovieDetails';

function FavoritesPage() {
  const { favorites } = useContext(UserContext);

  return (
    <div className="favorites-page">
      <h1>Ulubione</h1>
      <div className="movies-list">
        {favorites.map(movie => (
          <MovieDetails key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
