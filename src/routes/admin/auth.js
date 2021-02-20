const express = require('express');
const { requireSignin } = require('../../common-middleware');
const { signup, signin, signout } = require('../../controller/admin/auth');
const { validateSigninRequest, validateSignupRequest , isRequestValidated} = require('../../validators.js/auth');
const router = express.Router();


router.post('/admin/signin',validateSigninRequest , isRequestValidated, signin);
router.post('/admin/signup',validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signout', signout);


module.exports = router; 