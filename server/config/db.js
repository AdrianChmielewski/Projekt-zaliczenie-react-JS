const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'moje_haslo123',
  database: 'baza_filmow'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Połączono z MySQL');
});

module.exports = db;
