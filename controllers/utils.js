const {validationResult, check} = require('express-validator');

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

exports.checkPerformanceVerbose = [
    check('title')
        .isLength({min: 1, max: 40}).trim().withMessage('Nieprawidłowa długość tytułu.').bail()
        .matches(/^[-AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻżvVxX0-9., ]+$/)
        .withMessage('Tytuł zawiera nieprawidłowe znaki.'),
    check('genre')
        .isAlpha('pl-PL').withMessage('Nieprawidłowy gatunek sztuki.'),
    check('director_id').isInt().withMessage('Nieprawidłowy reżyser.'),
    check('scriptwriter_id').isInt().withMessage('Nieprawidłowy scenarzysta.'),
    check('description')
        .matches(/^[-AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻżvVxX0-9.,\s ]+$|^$/)
        .withMessage('Opis zawiera niepoprawne znaki.')
];

exports.checkPersonVerbose = [
    check('name')
        .isLength({min: 1, max: 20}).withMessage('Nieprawidłowa długość imienia.').bail()
        .isAlpha('pl-PL').withMessage('Imię powinno zawierać wyłącznie litery.'),
    check('surname')
        .isLength({min: 1, max: 25}).withMessage('Nieprawidłowa długość nazwiska.').bail()
        .isAlpha('pl-PL').withMessage('Nazwisko powinno zawierać wyłącznie litery.'),
    check('bday').isISO8601().withMessage('Nieprawidłowa data urodzenia.'),
    check('description')
        .matches(/^[-AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż0-9vVxX.,\s ]+$|^$/)
        .withMessage('Opis zawiera niepoprawne znaki.')
];