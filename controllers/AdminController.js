const {validationResult} = require('express-validator');
const checkCredentials = require('../models/Admin');

exports.home = (req, res) => {
  if(req.session.user && req.cookies.user_sid) 
    res.redirect('/admin/dashboard');
  else res.render('admin-home');
};

exports.checkAdminValidation = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.render('admin-home', {
      errors: errors.mapped()
    });
  }
  next();
};

exports.login = async (req, res) => {
  try {
    let result = await checkCredentials(req.body.login, req.body.password);
    if(result.length == 1) {
      req.session.user = 'cos'; //req.body.login;
      res.redirect('/admin/dashboard');
    } else {
      res.render('admin-home', {
        notFound: true
      });
    }
  } catch(err) {
    console.log("Coś poszło nie tak...", err);
  } 
};

exports.dashboard = (req, res) => {
  res.render('admin-dashboard');
};

exports.logout = (req, res) => {
  if(req.session.user && req.cookies.user_sid) {
    res.clearCookie('user_sid');
  } 
  res.redirect('/admin');
};
