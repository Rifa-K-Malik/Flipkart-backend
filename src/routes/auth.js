const express = require('express');
const { signup, signin } = require('../controller/auth');
const router = express.Router();

router.post('/signin', signin);

router.post('/signup', signup);

module.exports = router;