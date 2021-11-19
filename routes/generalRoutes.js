/*
Author: Austin Lamp
Date: 10/13/2021
Description: The following is a router for the general pages, which include the homepage, the about page, and the contact page, all of which can be found on the header
and the footer.
*/

const express = require('express');
const generalRouter = express.Router();
const generalController = require('../controllers/generalController')

generalRouter.get('/', generalController.index);
generalRouter.get('/about', generalController.about);
generalRouter.get('/contact', generalController.contact);


module.exports = generalRouter;