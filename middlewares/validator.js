/*
Validator Middleware
Author: Austin Lamp
Date: 12/07/21
Description: This Middleware is a validator to be inserted into the appropriate routes to ensure that anything that needs additional
validation receives just that.
*/
const {validationResult} = require('express-validator');
const {body} = require('express-validator');

/*
validateID function
Author: Austin Lamp
Date: 12/07/21
Description: Ensures anything with ":id" in the route has a valid ID. Valid ID's are formatted like below in the ValidateID function.
*/
exports.validateID = (req, res, next) => { 
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        console.log(id);
        console.log(req.params);
        console.log(req);
        let err = new Error('Invalid connection id');
        err.status = 400;
        req.flash('error', err.message);
        return next(err);
    }
}

/*
validateSignUp
Author: Austin Lamp
Date: 12/07/21
Description: Use express validation framework to validate input on sign-up page in an attempt to prevent any malicious input from the user.
*/
exports.validateSignUp = [
body('firstName', 'First Name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last Name cannot be empty').notEmpty().trim().escape(),  
body('email', 'Email must be a valid email address').notEmpty().trim().escape().normalizeEmail(),  
body('password', 'Password must be at least 8 characters in length, and at most 64 characters in length').isLength({min: 8, max: 64})                          
];

/*
validateLogIn
Author: Austin Lamp
Date: 12/07/21
Description: Use express validation framework to validate input on login page in an attempt to prevent any malicious input from the user.
*/
exports.validLogIn = [
    body('email', 'Email must be a valid email address').notEmpty().trim().escape().normalizeEmail(),  
    body('password', 'Password must be at least 8 characters in length, and at most 64 characters in length').isLength({min: 8, max: 64})    
];

/*
validateRSVP function
Author: Austin Lamp
Date: 12/07/21
Description: Ensures POST request being sent to update RSVP status is secure, and only accepts YES or NO, so tools such as PostMan (and other proxies) cannot change values.
*/
exports.validateRSVP = [body('rsvp').isIn(['YES', 'NO', 'MAYBE'])];

/*
validateResults function
Author: Austin Lamp
Date: 12/07/21
Description: Display results of the validation.
*/
exports.validateResults = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
};