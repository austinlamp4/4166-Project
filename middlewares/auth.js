/*
Author: Austin Lamp
Date: 11/19/21
Description: Used within routes module as additional middleware to ensure that a user is authenticated before they are authorized to access certain resources
within the web server.
*/
const connection = require('../models/connection');

exports.isGuest = (req, res, next) => {
    if(!req.session.user) {
        return next();
    } else {
        req.flash('error', 'You are already logged in!');
        return res.redirect('/users/profile');
    }
};

//Make sure user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if(req.session.user) {
        return next();
    } else {
        req.flash('error', 'You need to login!');
        return res.redirect('/users/login');
    }
};

//Check if the user is the author of a particular story
exports.isCreator = (req, res, next) => {
    let id = req.params.id;
    connection.findById(id)
    .then(connection => {
        if(connection) {
            if(connection.creator == req.session.user) {
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }
    })
    .catch(err => next(err));
};

//Check if the user is the author of a particular story
exports.isNotCreator = (req, res, next) => {
    let id = req.params.id;
    connection.findById(id)
    .then(connection => {
        if(connection) {
            if(connection.creator != req.session.user) {
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }
    })
    .catch(err => next(err));
};