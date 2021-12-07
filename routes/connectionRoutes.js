/*
Author: Austin Lamp
Date: 10/14/2021
Description: The following code is meant to be the 'router' for the web server, particular in the /connections area.
*/

const express = require('express');
const connectionsRouter = express.Router();
const connectionController = require('../controllers/connectionController');
const {isLoggedIn, isCreator, isNotCreator} = require('../middlewares/auth'); 
const {validateID, validateRSVP, validateResults} = require('../middlewares/validator');

/*The following are all going to be for the connectionController, specifically*/

//GET /connections: Sends all connections to the user
connectionsRouter.get('/', connectionController.index); //anyone can view

//GET /connections/new: send HTML form for creating a new connection
connectionsRouter.get('/new', isLoggedIn, connectionController.new);

//POST /connections: Creates a new story from the form sent from /stories/new
connectionsRouter.post('/', isLoggedIn, validateResults, connectionController.create);

//GET /connections/:id : Send details of story identified by id
connectionsRouter.get('/:id', validateID, connectionController.show); //anyone can view

//GET /connections/:id/edit: send HTML form for editing an existing story with a specific id
connectionsRouter.get('/:id/edit', validateID, isLoggedIn, isCreator, connectionController.edit);

//PUT /connections/:id : Update the story identified by id
connectionsRouter.put('/:id', validateID, isLoggedIn, isCreator, validateResults, connectionController.update);

//DELETE /connections/:id, delete the story identified by id
connectionsRouter.delete('/:id', validateID, isLoggedIn, isCreator, connectionController.delete);

connectionsRouter.post('/:id/rsvp', validateID, isLoggedIn, isNotCreator, validateRSVP, validateResults, connectionController.editRsvp);

connectionsRouter.delete('/:id/rsvp', validateID, isLoggedIn, connectionController.deleteRsvp);

/*The following after this point are all going to be the general controller, specifically*/


module.exports = connectionsRouter;

