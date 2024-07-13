const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'haslox123',
  database: 'baza_filmow'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.query('INSERT INTO użytkownicy (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).send('Error inserting user');
    }
    res.sendStatus(201);
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM użytkownicy WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send('Error fetching user');
    }
    if (results.length === 0 || !bcrypt.compareSync(password, results[0].password)) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: results[0].id }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ user: results[0], token });
  });
});

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post('/api/movies/favorites', authenticateJWT, (req, res) => {
  const { imdbID, title, year, poster } = req.body;
  const userId = req.user.id;
  db.query('INSERT INTO ulubione (user_id, imdbID, title, year, poster) VALUES (?, ?, ?, ?, ?)', [userId, imdbID, title, year, poster], (err, result) => {
    if (err) {
      console.error('Error inserting favorite:', err);
      return res.status(500).send('Error inserting favorite');
    }
    res.sendStatus(201);
  });
});

app.get('/api/movies/favorites', authenticateJWT, (req, res) => {
  const userId = req.user.id;
  db.query('SELECT * FROM ulubione WHERE user_id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching favorites:', err);
      return res.status(500).send('Error fetching favorites');
    }
    res.send(results);
  });
});

app.delete('/api/movies/favorites/:imdbID', authenticateJWT, (req, res) => {
  const { imdbID } = req.params;
  const userId = req.user.id;
  db.query('DELETE FROM ulubione WHERE user_id = ? AND imdbID = ?', [userId, imdbID], (err, result) => {
    if (err) {
      console.error('Error deleting favorite:', err);
      return res.status(500).send('Error deleting favorite');
    }
    res.sendStatus(204);
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
