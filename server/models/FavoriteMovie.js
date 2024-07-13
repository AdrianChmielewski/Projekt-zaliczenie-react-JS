const db = require('../config/db');

const FavoriteMovie = {
  add: (uzytkownikId, film, callback) => {
    db.query('INSERT INTO ulubione (uzytkownik_id, film_id, tytul, plakat, opis) VALUES (?, ?, ?, ?, ?)', [uzytkownikId, film.id, film.tytul, film.plakat, film.opis], callback);
  },
  findByUserId: (uzytkownikId, callback) => {
    db.query('SELECT * FROM ulubione WHERE uzytkownik_id = ?', [uzytkownikId], callback);
  }
};

module.exports = FavoriteMovie;
