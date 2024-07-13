import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { fetchMovies } from '../utils/api';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    const handleSearch = async () => {
      const movies = await fetchMovies(debouncedQuery);
      onSearch(movies);
    };

    if (debouncedQuery) {
      handleSearch();
    }
  }, [debouncedQuery, onSearch]);

  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Szukaj filmów..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
