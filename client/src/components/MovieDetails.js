import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { fetchMovieDetails } from '../utils/api';
import './MovieDetails.css';

function MovieDetails({ movie, isHomePage, onRemove }) {
  const { user, favorites = [], addFavorite, removeFavorite } = useContext(UserContext); // Domyślnie favorites jako pusta tablica
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(movie.imdbID);
      setDetails(data);
    };

    getMovieDetails();
  }, [movie.imdbID]);

  const handleAddToFavorites = () => {
    if (!user) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 3000);
      return;
    }

    if (details) {
      addFavorite(movie);
      navigate('/favorites');
    }
  };

  const handleAddToFavoritesHome = () => {
    if (!user) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 3000);
      return;
    }

    if (details) {
      addFavorite(movie);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        if (onRemove) onRemove(movie.imdbID);
      }, 3000);
    }
  };

  const handleRemoveFromFavorites = () => {
    removeFavorite(movie.imdbID);
    navigate('/favorites');
  };

  const isFavorite = details && favorites.some(fav => fav.imdbID === details.imdbID);

  if (!details) return <div>Ładowanie...</div>;

  return (
    <div className={`movie-details ${showNotification ? 'removing' : ''}`}>
      <Link to={`/movie/${movie.imdbID}`}>
        <img src={details.Poster} alt={details.Title} />
        <h2>{details.Title}</h2>
        <p>{details.Year}</p>
        <p><strong>Ocena IMDb:</strong> <u>{details.imdbRating}</u></p>
      </Link>
      {isHomePage && !isFavorite && (
        <button onClick={handleAddToFavoritesHome}>Dodaj do ulubionych</button>
      )}
      {!isHomePage && !isFavorite && (
        <button onClick={handleAddToFavorites}>Dodaj do ulubionych</button>
      )}
      {isFavorite && (
        <button onClick={handleRemoveFromFavorites}>Usuń z ulubionych</button>
      )}
      {showNotification && (
        <div className="notification">Dodano do ulubionych</div>
      )}
      {showLoginAlert && (
        <div className="notification">Musisz się zalogować, aby dodać do ulubionych</div>
      )}
    </div>
  );
}

export default MovieDetails;
