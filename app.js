const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
const admin = require('./routes/admin')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    key: 'user_sid',
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if(req.cookies.user_sid && !req.session.user ) 
        res.clearCookie('user_sid');
    next();
});

app.use('/', routes);
app.use('/admin', admin);

app.use((req, res, next) => {
    res.status(404).render('404');
});

module.exports = app;
