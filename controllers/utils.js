const {validationResult} = require('express-validator');

exports.sessionChecker = (req, res, next) => {
    if(!req.session.user || !req.cookies.user_sid) 
        res.redirect('/admin');
    else next();
};
  
exports.checkDashboardValidation = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).send(errors.mapped());
    }
    next();
};