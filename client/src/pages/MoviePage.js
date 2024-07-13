import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../utils/api';
import { UserContext } from '../contexts/UserContext';
import './MoviePage.css';

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { user, favorites, addFavorite, removeFavorite } = useContext(UserContext);
  const navigate = useNavigate();
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
    };

    getMovieDetails();
  }, [id]);

  const handleAddToFavorites = () => {
    if (!user) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 3000);
      return;
    }

    if (movie) {
      addFavorite(movie);
      navigate('/favorites');
    }
  };

  const handleRemoveFromFavorites = () => {
    removeFavorite(movie.imdbID);
    navigate('/favorites');
  };

  const isFavorite = movie && favorites.some(fav => fav.imdbID === movie.imdbID);

  if (!movie) return <div>Ładowanie...</div>;

  return (
    <div className="movie-page">
      <img src={movie.Poster} alt={movie.Title} />
      <h1>{movie.Title}</h1>
      <p>{movie.Plot}</p>
      <p><strong>Reżyser:</strong> {movie.Director}</p>
      <p><strong>Gatunek:</strong> {movie.Genre}</p>
      <p><strong>Rok:</strong> {movie.Year}</p>
      <p><strong>Ocena IMDb:</strong> <u>{movie.imdbRating}</u></p>
      {!isFavorite && <button onClick={handleAddToFavorites}>Dodaj do ulubionych</button>}
      {isFavorite && <button onClick={handleRemoveFromFavorites}>Usuń z ulubionych</button>}
      {showLoginAlert && (
        <div className="notification">Musisz się zalogować, aby dodać do ulubionych</div>
      )}
    </div>
  );
}

export default MoviePage;
