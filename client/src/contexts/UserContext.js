import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

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
        },
        body: JSON.stringify({ userId: user.id, movie }),
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
      },
      body: JSON.stringify({ userId: user.id }),
    });
  };

  return (
    <UserContext.Provider value={{ user, register, login, logout, favorites, addFavorite, removeFavorite }}>
      {children}
    </UserContext.Provider>
  );
};
