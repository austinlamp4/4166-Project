
/*
Author: Austin Lamp
Date: 10/13/2021
Description: The following code is designed to be the controller function for the general navigation of the web server for the client.
*/


//Gets the home page for the user
exports.index = (req, res)=> {
    res.render('./index');
};

//GET Sends all about page to the client user
exports.about = (req, res)=> {
    res.render('./about');
};

//GET Sends the contact page to the client user.
exports.contact = (req, res)=> {
    res.render('./contact');
};
