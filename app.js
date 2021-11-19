//require all modules first
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const connectionRoutes = require('./routes/connectionRoutes');
const generalRoutes = require('./routes/generalRoutes');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');

//create app
const app = express();

//configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//Using mongoose to connect to database (local db server)
mongoose.connect('mongodb://localhost:27017/appdevproject', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    })
})
.catch(err => console.log(err.message));



//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'jasbasfibhdjfb',
    resave: false,
    saveUninitialized: false, //false -- if session has no data, doesn't store session and not sent to client side
    cookie:{maxAge: 60*60*1000}, //Cookie that lasts 1 hour (60 sec * 60 min * 1000 millisec/sec)
    store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/appdevproject'}) //can set an option name for collection to be named something other than sessions
}));

//Remember, flash after session middleware.
app.use(flash());

app.use((req, res, next) => {
    console.log(req.session);
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

//set up routes
app.get('/', (req, res)=> {
    res.render('index');
});

app.use('/', generalRoutes);

app.use('/connections', connectionRoutes);

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }

    res.status(err.status);
    res.render('error', {error: err});
});