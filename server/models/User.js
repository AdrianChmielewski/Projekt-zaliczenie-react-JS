const db = require('../config/db');

const User = {
  create: (nazwa_uzytkownika, haslo, callback) => {
    db.query('INSERT INTO uzytkownicy (nazwa_uzytkownika, haslo) VALUES (?, ?)', [nazwa_uzytkownika, haslo], callback);
  },
  findByUsername: (nazwa_uzytkownika, callback) => {
    db.query('SELECT * FROM uzytkownicy WHERE nazwa_uzytkownika = ?', [nazwa_uzytkownika], callback);
  }
};

module.exports = User;
