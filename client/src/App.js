import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import NavBar from './components/Navbar';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import MoviePage from './pages/MoviePage';
import './App.css';
import './GlobalStyles.css';  // Importowanie globalnych stylów
import './components/Popup.css';
import './components/Navbar.css';  // Importowanie stylizacji dla NavBar
import './pages/HomePage.css';  // Importowanie stylizacji dla HomePage
import './components/SearchBar.css'; 
import './components/MovieDetails.css'; 
import ProtectedRoute from './components/ProtectedRoute'; 

const App = () => {
  return (
    <UserProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}
;

export default App;
