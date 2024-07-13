import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import './Popup.css';  // Importowanie stylizacji popup

const RegisterPopup = ({ closePopup }) => {
  const { register } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Niepoprawny format email.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Hasła się nie zgadzają.');
      return;
    }

    const result = await register(username, email, password);
    if (result.success) {
      alert('Zarejestrowano pomyślnie');
      closePopup();
    } else {
      setError('Rejestracja nie powiodła się: ' + result.message);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Rejestracja</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          <input
            type="password"
            placeholder="Powtórz hasło"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Zarejestruj się</button>
        </form>
        <button onClick={closePopup}>Zamknij</button>
      </div>
    </div>
  );
};

export default RegisterPopup;
