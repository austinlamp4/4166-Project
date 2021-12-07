/*
Validator Middleware
Author: Austin Lamp
Date: 12/07/21
Description: This Middleware is a validator to be inserted into the appropriate routes to ensure that anything that needs additional
validation receives just that.
*/

const connection = require('../models/connection');

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