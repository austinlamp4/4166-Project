const model = require('../models/connection');
const rsvpModel = require('../models/rsvp');

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
exports.show = (req, res, next)=>{
    let id = req.params.id;
    let user = req.session.user;

    Promise.all([model.findById(id).populate('creator', 'firstName lastName'), rsvpModel.count({connection:id, rsvp:"YES"})])
    .then(results =>{
        const [connection, rsvps] = results;
        if(connection) {
            return res.render('./connection/connection', {connection, user, rsvps});
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

//GET /connections/:id/edit: send HTML form for editing an existing story with a specific id
exports.edit = (req, res, next)=> {
    let id = req.params.id;

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

    Promise.all([model.findByIdAndDelete(id, {useFindAndModify: false}), rsvpModel.deleteMany({connection:id})])
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

exports.editRsvp = (req, res, next) => {
    console.log(req.body.rsvp);
    let id = req.params.id;
    rsvpModel.findOne({connection:id, user:req.session.user}).then(rsvp => {
        if(rsvp) {
            rsvpModel.findByIdAndUpdate(rsvp._id, {rsvp:req.body.rsvp}, {useFindAndModify: false, runValidators: true})
            .then(rsvp => {
                req.flash('success', 'You have successfully updated your RSVP status!');
                res.redirect('/users/profile')
            })
            .catch(err => {
                if (err.name === 'ValidationError') {
                    req.flash('error', err.message);
                    return res.redirect('/back');
                }
                next(err);
            });
        } else {
            let rsvp = new rsvpModel({
                connection: id,
                rsvp: req.body.rsvp,
                user: req.session.user
            });
            rsvp.save()
            .then(rsvp => {
                req.flash('success', 'You have successfully added your RSVP status!');
                res.redirect('/connections/' + id);
            })
            .catch(err => {
                if (err.name === 'ValidationError') {
                    req.flash('error', err.message);
                    return res.redirect('/back');
                }
                next(err);
            });
        }
    })
}

exports.deleteRsvp = (req, res, next) => {
    let id = req.params.id;
    rsvpModel.findOneAndDelete({connection:id, user:req.session.user})
    .then(rsvp => {
        req.flash('success', 'Successfully Deleted RSVP');
        res.redirect('/users/profile');
    })
    .catch(err => {
        if (err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err);
    });
}
