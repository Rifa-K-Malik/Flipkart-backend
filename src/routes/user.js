const express = require('express');
const { signup } = require('../controller/user');
const router = express.Router();

router.post('/signin', (req, res) => {

});

router.post('/signup', signup);

module.exports = router;