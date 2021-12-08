const User = require('../models/user');
const connection = require('../models/connection');
const rsvpModel = require('../models/rsvp');

exports.index = (req, res)=>{
    res.render('./index');
};

//get the sign up form
exports.new = (req, res) => {
    res.render('./user/new');
};

//POST Create a new user
exports.create = (req, res, next) => {
    let user = new User(req.body);

    //Ensures email stored in database will always match regardless of case sensitivity. See exports.login for further logic.
    if(user.email) {
        user.email = user.email.toLowerCase();
    }

    user.save()
    .then(() => res.redirect('/users/login')) //this is sending us to login
    .catch(err => {
        if(err.name === 'ValidationError') {
            req.flash('error', error.message);
            return res.redirect('/users/new');
        }

        if (err.code === 11000) {
            req.flash('error', 'Email Address has been used');
            return res.redirect('/users/new');
        }
        next(err)
    });
};

//get the login page
exports.login = (req, res) => { //processing requests to /login
    res.render('./user/login');
};

//get profile page
exports.profile = (req, res, next) => {
    let id = req.session.user;
    Promise.all([User.findById(id), connection.find({creator: id}), rsvpModel.find({user: id}).populate('connection')])
    .then(results => {
        const [user, connections, rsvps] = results; //Results gives us both the user and stories
        res.render('./user/profile', {user, connections, rsvps});
    })
    .catch(err => next(err));
};

//logout the user
exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if(err) {
            return next(err);
        } else {
            return res.redirect('/');
        }
    });
};

//process login requests (POST of login)
exports.logon = (req, res, next) => {
    let email = req.body.email;
    if (email) {
        email = email.toLowerCase; //no case sensitivty for email
    }
    let password = req.body.password;

    User.findOne({email: email})
    .then(user => {
        if(user) {
            //user found in the database
            user.comparePassword(password)
            .then(result => {
                if(result) {
                    req.session.user = user._id; //Storing the user's ID in the session
                    req.session.firstName = user.firstName;
                    //The above allows for the user to browse to other pages and we know who it is.

                    req.flash('success', 'You have successfully logged in!');
                    //user is authenticated in this case
                    res.redirect('/users/profile');
                } else {
                    //console.log('wrong password');
                    req.flash('error', 'Wrong Password!');
                    res.redirect('/users/login');
                }
            })
            .catch(err => next(err));
        } else {
            req.flash('error', 'Wrong email address!');
            res.redirect('/users/login');
        }
    })
    .catch(err => next(err));
};
