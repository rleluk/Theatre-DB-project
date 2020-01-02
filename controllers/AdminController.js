const {validationResult} = require('express-validator');
const peopleModels = require('../models/peopleModels');
const adminModel = require('../models/adminModel');

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
    let result = await adminModel.checkCredentials(req.body.login, req.body.password);
    if(result.length == 1) {
      req.session.user = req.body.login;
      res.redirect('/admin/dashboard');
    } else {
      res.render('admin-home', {
        notFound: true
      });
    }
  } catch(err) {
    console.log("Błąd bazy danych.", err);
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

////////////////////////////////////////////////////////////

exports.checkDashboardValidation = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).send(errors.mapped());
  }
  next();
};

////////////// actor

exports.actor = (req, res) => {
  res.render('actor-panel');
};

exports.addActor = async (req, res) => {
  try {
    let result = await peopleModels.Actor.add(req.body.name, req.body.surname, req.body.bday);
    res.send(result);
  } catch(err) {
    console.log(err);
    res.status(400).send({msg: 'Wystąpił błąd przez co dane nie zostały pomyślnie wprowadzone do bazy danych.'});
  }
};

exports.searchActor = async (req, res) => {
  try {
    let result = await peopleModels.Actor.search(req.query.name, req.query.surname);
    res.send(result);
  } catch(err) {
    console.log("Błąd bazy danych.", err);
    res.status(400).send("Błąd bazy danych.");
  }
};

exports.deleteActor = async (req, res) => {
  try {
    let result = await peopleModels.Actor.delete(req.params.id);
    res.send(result);
  } catch(err) {
    console.log("Błąd bazy danych.", err);
    res.status(400).send("Błąd bazy danych.");
  }
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