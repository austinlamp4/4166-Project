/*
Author: Austin Lamp
Date: 12/07/21
Desc: Middleware used to limit the amount of authentication requests from 1 IP at a time to help prevent DoS attacks.
*/

const rateLimit = require("express-rate-limit");

exports.logInLimiter = rateLimit({
    windowMs: 60 * 1000, //One minute time window
    max: 5, //Max of 5 requests within the window
    handler: (req, res, next) => {
        let err = new Error('Too many login requests. Try again later.');
        err.status = 429;
        return next(err);
    }
});