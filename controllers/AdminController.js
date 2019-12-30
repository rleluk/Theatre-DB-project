const {check, validationResult} = require('express-validator')
const pool = require('../config/connection');

exports.sessionChecker = (req, res, next) => {
  if(!req.session.user || !req.cookies.user_sid) 
    res.redirect('/admin');
  else next();
};

exports.home = (req, res) => {
  if(req.session.user && req.cookies.user_sid) 
    res.redirect('/admin/dashboard');
  else res.render('admin-home');
};

exports.validateAdmin = [
  check('login').trim().isLength({min: 1}).withMessage('Login is required.'),
  check('password').trim().isLength({min: 1}).withMessage('Password is required')
]

exports.checkAdminValidation = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.render('admin-home', {
      errors: errors.mapped()
    });
  }
  next();
};

exports.login = (req, res) => {
  var login = req.body.login;
  var password = req.body.password;
  pool.query(`SELECT * FROM Teatr.admins WHERE login='${login}' AND password='${password}'`, (error, results) => {
    if (error) 
      throw error;

    if(results.rows.length == 1) {
      req.session.user = login;
      res.redirect('/admin/dashboard');
    } else {
      res.render('admin-home', {
        notFound: true
      });
    }
  })
};

exports.dashboard = (req, res) => {
  if (req.session.user && req.cookies.user_sid) 
    res.render('admin-dashboard');
  else res.redirect('/admin');
};

exports.logout = (req, res) => {
  if(req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/admin');
  }
};

////////////////////////////////////////////////////////////

exports.validatePerson = [
  check('name').isLength({min: 1, max: 20}).withMessage('Nieprawidłowe imię.'),
  check('name').isAlpha('pl-PL').withMessage('Pole powinno zawierać wyłącznie litery.'),
  check('surname').isLength({min: 1, max: 20}).withMessage('Nieprawidłowe nazwisko.'),
  check('surname').isAlpha('pl-PL').withMessage('Pole powinno zawierać wyłącznie litery.')
]

exports.checkDashboardValidation = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.render('admin-dashboard', {
      errors: errors.mapped()
    });
  }
  next();
};

////////////// actor

exports.actor = (req, res) => {
  res.render('actor-panel');
};

exports.addActor = (req, res) => {
  let name = req.body.name;
  let surname = req.body.surname;
  pool.query(`INSERT INTO Teatr.Aktor(imie, nazwisko) VALUES('${name}', '${surname}')`, (error, results) => {
    if(error) 
      throw error;
    // res.send(results);
  });
};

exports.getActor = (req, res) => {
  let id = parseInt(req.params.id);
  pool.query(`SELECT * FROM Teatr.Aktor WHERE id = ${id}`, (error, results) => {
    if(error)
      throw error;
    res.render('');
  });
};

////////////// performance

exports.performance = (req, res) => {
  res.render('performance-panel');
};

////////////// director

exports.director = (req, res) => {
  res.render('director-panel');
};

////////////// scriptwriter

exports.scriptwriter = (req, res) => {
  res.render('scriptwriter-panel');
};

////////////// technician

exports.technician = (req, res) => {
  res.render('technician-panel');
};

////////////// hall

exports.hall = (req, res) => {
  res.render('hall-panel');
};