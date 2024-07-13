CREATE DATABASE baza_filmow;
USE baza_filmow;

CREATE TABLE użytkownicy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nazwa_użytkownika VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hasło VARCHAR(255) NOT NULL
);

CREATE TABLE ulubione (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    imdbID VARCHAR(255),
    title VARCHAR(255),
    year VARCHAR(255),
    poster VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES użytkownicy(id)
);
