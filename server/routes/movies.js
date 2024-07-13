const express = require('express');
const { dodajUlubiony, pobierzUlubione } = require('../controllers/movieController');

const router = express.Router();

router.post('/favorites', dodajUlubiony);
router.get('/favorites', pobierzUlubione);

module.exports = router;
