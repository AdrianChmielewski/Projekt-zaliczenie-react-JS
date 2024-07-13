import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import './Popup.css';  // Importowanie stylizacji popup

const LoginPopup = ({ closePopup }) => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      alert('Zalogowano pomyślnie');
      closePopup();
    } else {
      setError('Logowanie nie powiodło się: ' + result.message);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Logowanie</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Zaloguj się</button>
        </form>
        <button onClick={closePopup}>Zamknij</button>
      </div>
    </div>
  );
};

export default LoginPopup;
