const express = require('express');
const { zarejestruj, zaloguj } = require('../controllers/authController');

const router = express.Router();

router.post('/register', zarejestruj);
router.post('/login', zaloguj);

module.exports = router;
