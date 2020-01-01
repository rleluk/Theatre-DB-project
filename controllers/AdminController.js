const {validationResult} = require('express-validator')
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

exports.addActor = (req, res) => {
  let name = req.body.name;
  let surname = req.body.surname;
  let bday = req.body.bday;
  pool.query(`INSERT INTO Teatr.Aktor(imie, nazwisko, data_urodzenia) VALUES('${name}', '${surname}', '${bday}')`, (error, results) => {
    if(error) 
      throw error;
    res.json({msg: 'Dane zostały wprowadzone pomyślnie.'});
  });
};

exports.searchActor = (req, res) => {
  let name = req.query.name;
  let surname = req.query.surname;
  pool.query(`SELECT * FROM Teatr.Aktor WHERE LOWER(Imie) LIKE LOWER('%${name}%') AND LOWER(Nazwisko) LIKE LOWER('%${surname}%')`, (error, results) => {
    if(error)
      throw error;
    res.send(results.rows);
  });
};

exports.getAllActors = (req, res) => {
  pool.query('SELECT * FROM Teatr.Aktor', (error, results) => {
    if(error)
      throw error;
    res.send(results.rows);
  }); 
};

exports.deleteActor = (req, res) => {
  let id = req.params.id;
  pool.query(`DELETE FROM Teatr.Aktor WHERE aktor_id = '${id}'`, (error, results) => {
    if(error) 
      throw error;
    res.json({msg: 'Dane zostały pomyślnie usunięte.'});
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