const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth'); 
const {validateSignUp, validateLogIn} = require('../middlewares/validator'); 
const {logInLimiter} = require('../middlewares/rateLimiters');
const router = express.Router();


router.get('/new', isGuest, controller.new);

router.post('/new', validateSignUp, isGuest, controller.create);

router.get('/login', isGuest, controller.login);

router.post('/login', logInLimiter, validateLogIn, isGuest, controller.logon);

router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;