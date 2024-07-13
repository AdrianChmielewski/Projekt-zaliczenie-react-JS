import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      fetchFavorites(token);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      fetchFavorites(localStorage.getItem('token'));
    } else {
      localStorage.removeItem('user');
      setFavorites([]);
    }
  }, [user]);

  const fetchFavorites = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/movies/favorites', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        return { success: true };
      } else {
        const message = await response.text();
        return { success: false, message };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success: false, message: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    alert('Wylogowano pomyślnie');
  };

  const addFavorite = (movie) => {
    if (!user) {
      console.error('Musisz się zalogować, aby dodać film do ulubionych.');
      return;
    }

    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
      fetch('http://localhost:5000/api/movies/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ imdbID: movie.imdbID, title: movie.Title, year: movie.Year, poster: movie.Poster }),
      });
    }
  };

  const removeFavorite = (imdbID) => {
    if (!user) {
      console.error('Musisz się zalogować, aby usunąć film z ulubionych.');
      return;
    }

    setFavorites(favorites.filter(fav => fav.imdbID !== imdbID));
    fetch(`http://localhost:5000/api/movies/favorites/${imdbID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  };

  return (
    <UserContext.Provider value={{ user, register, login, logout, favorites, addFavorite, removeFavorite }}>
      {children}
    </UserContext.Provider>
  );
};
