const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth'); 
const router = express.Router();


router.get('/new', isGuest, controller.new);

//POST -- Create a new user
router.post('/new', isGuest, controller.create);

router.get('/login', isGuest, controller.login);

router.post('/login', isGuest, controller.logon);

router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;