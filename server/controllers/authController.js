const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Dane rejestracyjne:', { username, email, password });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);

    db.query(
      'INSERT INTO użytkownicy (nazwa_użytkownika, email, hasło) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error('Błąd podczas rejestracji:', err);
          return res.status(500).send('Błąd serwera');
        }
        res.status(201).send('Zarejestrowano pomyślnie');
      }
    );
  } catch (error) {
    console.error('Błąd podczas haszowania hasła:', error);
    res.status(500).send('Błąd serwera');
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log('Dane logowania:', { email, password });

  db.query('SELECT * FROM użytkownicy WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Błąd podczas logowania:', err);
      return res.status(500).send('Błąd serwera');
    }
    if (results.length === 0) return res.status(401).send('Nieprawidłowy email lub hasło');

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.hasło);
      if (!isMatch) return res.status(401).send('Nieprawidłowy email lub hasło');

      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
      res.json({ token, user: { id: user.id, username: user.nazwa_użytkownika, email: user.email } });
    } catch (error) {
      console.error('Błąd podczas porównywania hasła:', error);
      res.status(500).send('Błąd serwera');
    }
  });
};

exports.logout = (req, res) => {
  res.send('Wylogowano pomyślnie');
};
