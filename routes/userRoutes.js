const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();


router.get('/new', controller.new);

//POST -- Create a new user
router.post('/new', controller.create);

router.get('/login', controller.login);

router.post('/login', controller.logon);

router.get('/profile', controller.profile);

router.get('/logout', controller.logout);

module.exports = router;