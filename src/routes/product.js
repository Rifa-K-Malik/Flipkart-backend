const express = require('express');
//const { addCategory, getCategories } = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../common-middleware/index');
const router = express.Router();

router.post('/product/create', requireSignin, adminMiddleware, (req, res) => {

    res.status(200).json({ message: 'Hello'})
});
//router.get('/product/getcategory', getCategories);

module.exports = router;

//0.12.06