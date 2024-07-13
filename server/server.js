const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const movieController = require('./controllers/movieController');
const authController = require('./controllers/authController');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/movies/favorites', movieController.addFavorite);
app.get('/api/movies/favorites', movieController.getFavorites);
app.delete('/api/movies/favorites/:imdbID', movieController.removeFavorite);

app.post('/api/register', authController.register);
app.post('/api/login', authController.login);
app.post('/api/logout', authController.logout);

app.use((err, req, res, next) => {
  console.error('Błąd serwera:', err.stack);
  res.status(500).send('Błąd serwera');
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
