const model = require('../models/connection');

//GET /connections: Sends all connections to the user
exports.index = (req, res)=> {
    //res.send('send all connections');
    let connections = model.find();
    res.render('./connection/connections', {connections});
};

//GET /connections/new: send HTML form for creating a new story
exports.new = (req, res)=> {
    res.render('./connection/newConnection')
};

//POST /connections: Creates a new story from the form sent from /connections/new
exports.create = (req, res)=> {
    //res.send('Created a new story.');
    let connection = req.body;
    model.save(connection);
    res.redirect('/connections');
};

//GET /connections/:id : Send details of story identified by id
exports.show = (req, res, next)=> {
    let id = req.params.id;
    let connection = model.findById(id);
    if (connection) {
        res.render('./connection/connection', {connection})
    } else {
        let err = new Error('Cannot find connection with id ' + id);
        err.status = 404;
        next(err);
    }
};

//GET /connections/:id/edit: send HTML form for editing an existing story with a specific id
exports.edit = (req, res, next)=> {
    let id = req.params.id;
    let connection = model.findById(id);
    if (connection) {
        res.render('./connection/edit', {connection})
    } else {
        let err = new Error('Cannot find story with id ' + id);
        err.status = 404;
        next(err);
    }
};

//PUT /connections/:id : Update the story identified by id
exports.update = (req, res, next)=> {
    let connection = req.body;
    let id = req.params.id;
    if (model.updateById(id, connection)) {
        res.redirect('/connections/' + id);
    } else {
        let err = new Error('Cannot find story with id ' + id);
        err.status = 404;
        next(err);
    }
};
//DELETE /connections/:id, delete the story identified by id
exports.delete = (req, res, next)=> {
    let id = req.params.id;
    if(model.deleteById(id)) {
        res.redirect('/connections');
    } else {
        let err = new Error('Cannot find story with id ' + id);
        err.status = 404;
        next(err); 
    }
};
