const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// routers
const index = require('./routes/client/index');
const admin = require('./routes/admin/admin');
const actor = require('./routes/admin/actor');
const role = require('./routes/admin/role');
const director = require('./routes/admin/director');
const scriptwriter = require('./routes/admin/scriptwriter');
const technician = require('./routes/admin/technician');
const hall = require('./routes/admin/hall');
const performance = require('./routes/admin/performance');
const ticket = require('./routes/admin/ticket');
const stagePerformance = require('./routes/admin/stagePerformance');

// app
const app = express();

// config
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

// routes
app.use('/', index);
app.use('/admin/role', role);
app.use('/admin', admin);
app.use('/admin/actor', actor);
app.use('/admin/director', director);
app.use('/admin/scriptwriter', scriptwriter);
app.use('/admin/technician', technician);
app.use('/admin/hall', hall);
app.use('/admin/performance', performance);
app.use('/admin/ticket', ticket);
app.use('/admin/stageperformance', stagePerformance);

app.use((req, res, next) => {
    res.status(404).render('404');
});

module.exports = app;
