const model = require('../models/connection');

//GET /connections: Sends all connections to the user
exports.index = (req, res, next)=> {
    model.find()
    .then(connections => {
        let categories = model.findCategories(connections);
        res.render('./connection/connections', {connections, categories: categories});
    })
    .catch(err => next(err));
};

//GET /connections/new: send HTML form for creating a new story
exports.new = (req, res)=> {
    res.render('./connection/newConnection')
};

//POST /connections: Creates a new story from the form sent from /connections/new
exports.create = (req, res, next)=> {
    let connection = new model(req.body);
    connection.creator = req.session.user;
    connection.save()
    .then((connection) => {
        res.redirect('/connections');
    })
    .catch(err => {
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};

//GET /connections/:id : Send details of story identified by id
exports.show = (req, res, next)=> {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) { //Regular expression to ensure 0-9, a-z, or A-Z and 24 digits
        let err = new Error("Invalid story id");
        err.status = 400;
        return next(err);
    }

    console.log(id);

    model.findById(id).populate('creator', 'firstName lastName') //This is for populating the creator field down the road.
    .then(connection => {
        if(connection) {
            return res.render('./connection/connection', {connection})
        } else {
            let err = new Error('Cannot find a connnection with id ' + id);
            err.status = 400;
            next(err);
        }
    })
    .catch(err => next(err));
};

//GET /connections/:id/edit: send HTML form for editing an existing story with a specific id
exports.edit = (req, res, next)=> {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) { //Regular expression to ensure 0-9, a-z, or A-Z and 24 digits
        let err = new Error("Invalid story id");
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(connection => {
        if(connection) {
            return res.render('./connection/edit', {connection});
        } else {
            let err = new Error('Cannot find a connection with id' + id);
            err.status = 400;
            next(err);
        }
    })
    .catch(err => next(err));
};

//PUT /connections/:id : Update the story identified by id
exports.update = (req, res, next)=> {
    let connection = req.body;
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) { //Regular expression to ensure 0-9, a-z, or A-Z and 24 digits
        let err = new Error("Invalid story id");
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then(connection => {
        if(connection) {
            res.redirect('/connections/' + id);
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 400;
            next(err);
        }
    })
    .catch(err => next(err));
};

//DELETE /connections/:id, delete the story identified by id
exports.delete = (req, res, next)=> {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) { //Regular expression to ensure 0-9, a-z, or A-Z and 24 digits
        let err = new Error("Invalid story id");
        err.status = 400;
        return next(err);
    }
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(connection => {
        if(connection) {
            res.redirect('/connections');
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 400;
            next(err);
        }
    })
    .catch(err => next(err));
};
