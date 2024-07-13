import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import './Navbar.css';  // Importowanie stylizacji dla NavBar

const NavBar = () => {
  const { user, logout } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleClosePopup = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <nav>
      <h1>Strona Filmowa</h1>
      <ul>
        <li><Link to="/">Strona Główna</Link></li>
        {user && <li><Link to="/favorites">Ulubione</Link></li>}
        {user ? (
          <>
            <li>Witaj, {user.username}</li>
            <li><button onClick={logout}>Wyloguj</button></li>
          </>
        ) : (
          <>
            <li><button onClick={handleLoginClick}>Zaloguj</button></li>
            <li><button onClick={handleRegisterClick}>Zarejestruj</button></li>
          </>
        )}
      </ul>
      {showLogin && <LoginPopup closePopup={handleClosePopup} />}
      {showRegister && <RegisterPopup closePopup={handleClosePopup} />}
    </nav>
  );
};

export default NavBar;
