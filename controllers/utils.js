const {validationResult} = require('express-validator');

exports.sessionChecker = (req, res, next) => {
    if(!req.session.user || !req.cookies.user_sid) 
        res.redirect('/admin');
    else next();
};
  
exports.checkValidationVerbose = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        let result = {msg: ''};

        for(element of errors.array()) 
            result.msg += element.msg + '<br/>';

        return res.status(400).send(result);
    }

    next();
};

exports.checkValidation = (req, res, next) => {
    if(!validationResult(req).isEmpty()) 
        return res.status(400).send({msg: 'Wprowadzono nieprawidłowe dane.'});

    next();
}
