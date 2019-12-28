const {check, validationResult} = require('express-validator')
const pool = require('../config/connection');

exports.sessionChecker = (req, res, next) => {
  if(req.session.user && req.cookies.user_sid) 
    res.redirect('/admin/dashboard');
  else next();
};

exports.home = (req, res) => {
  res.render('admin-home');
};

exports.validate = [
  check('login').trim().isLength({min: 1}).withMessage('Login is required.'),
  check('password').trim().isLength({min: 1}).withMessage('Password is required')
]

exports.checkValidation = (req, res, next) => {
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
  pool.query(`SELECT * FROM users WHERE login='${login}' AND password='${password}'`, (error, results) => {
    if (error) {
      throw error;
    }

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
