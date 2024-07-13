const db = require('../config/db');

exports.addFavorite = (req, res) => {
  const { userId, movie } = req.body;

  db.query('INSERT INTO ulubione (uzytkownik_id, film_id, tytul, plakat, opis) VALUES (?, ?, ?, ?, ?)', [userId, movie.imdbID, movie.Title, movie.Poster, movie.Plot], (err, result) => {
    if (err) return res.status(500).send('Błąd serwera');
    res.status(201).send('Film dodany do ulubionych');
  });
};

exports.getFavorites = (req, res) => {
  const { userId } = req.query;

  db.query('SELECT * FROM ulubione WHERE uzytkownik_id = ?', [userId], (err, results) => {
    if (err) return res.status(500).send('Błąd serwera');
    res.status(200).send(results);
  });
};

exports.removeFavorite = (req, res) => {
  const { userId, imdbID } = req.body;

  db.query('DELETE FROM ulubione WHERE uzytkownik_id = ? AND film_id = ?', [userId, imdbID], (err, result) => {
    if (err) return res.status(500).send('Błąd serwera');
    res.status(200).send('Film usunięty z ulubionych');
  });
};
