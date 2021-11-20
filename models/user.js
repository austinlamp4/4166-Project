/*
Author: Austin Lamp
Date: 11/18/21
Description: Create a User template with a schema to store users in the database. Functionalities include hashing a password and comparing a plaintext password
in a given form to the hashed password using bcrypt. The Schema is also used to define what a user should look like.
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {type: String, required: [true, 'Cannot be empty']},
    lastName: {type: String, required: [true, 'Cannot be empty']},
    email: {type: String, required: [true, 'Cannot be empty'], unique: true},
    password: {type: String, required: [true, 'Cannot be empty']}
});

//Hashes password and saves user.
userSchema.pre('save', function(next) {
    let user = this; 
    if(!user.isModified('password')) { 
        return next();
    } else {
        bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(err => next(err));
    }
});


//Compare plaintext password to hashed password.
userSchema.methods.comparePassword = function(loginPassword) { 
    return bcrypt.compare(loginPassword, this.password); 
}

//Collection name in db must be users
module.exports = mongoose.model('User', userSchema);