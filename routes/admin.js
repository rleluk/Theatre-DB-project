const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator')
const AdminController = require('../controllers/AdminController');

router.get('/', 
    AdminController.home
);

router.post('/', 
    [
        check('login').trim().isLength({min: 1}).withMessage('Login is required.'),
        check('password').trim().isLength({min: 1}).withMessage('Password is required')
    ], 
    AdminController.checkAdminValidation, 
    AdminController.login
);

router.get('/dashboard',
    AdminController.sessionChecker,
    AdminController.dashboard
);

router.get('/logout', 
    AdminController.sessionChecker,    
    AdminController.logout
);

////////////////////////////////////////////////////// ACTOR

router.get('/actor',
    AdminController.sessionChecker,
    AdminController.actor
);

router.post('/actor/add', 
    AdminController.sessionChecker,
    [
        check('name')
            .isAlpha('pl-PL').withMessage('Imię powinno zawierać wyłącznie litery.')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowe imię.'),
        check('surname')
            .isAlpha('pl-PL').withMessage('Nazwisko powinno zawierać wyłącznie litery.')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowe nazwisko.'),
        check('bday').isISO8601().withMessage('Nie podano daty urodzenia.')
    ],
    AdminController.checkDashboardValidation,
    AdminController.addActor
);

router.get('/actor/search', 
    AdminController.sessionChecker,
    oneOf([
        check('name').trim().not().exists({checkFalsy: true}),
        check('name').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]), 
    oneOf([
        check('surname').trim().not().exists({checkFalsy: true}),
        check('surname').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]),
    AdminController.checkDashboardValidation,
    AdminController.searchActor
);

router.delete('/actor/delete/:id',
    AdminController.sessionChecker,
    [
        check('id').isInt()
    ],
    AdminController.checkDashboardValidation,
    AdminController.deleteActor
);

////////////////////////////////////////////////////// PERFORMANCE

router.get('/performance',
    AdminController.sessionChecker,
    AdminController.performance
);

////////////////////////////////////////////////////// DIRECTOR

router.get('/director',
    AdminController.sessionChecker,
    AdminController.director
);

router.post('/director/add', 
    AdminController.sessionChecker,
    [
        check('name')
            .isAlpha('pl-PL').withMessage('Imię powinno zawierać wyłącznie litery.')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowe imię.'),
        check('surname')
            .isAlpha('pl-PL').withMessage('Nazwisko powinno zawierać wyłącznie litery.')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowe nazwisko.'),
        check('bday').isISO8601().withMessage('Nie podano daty urodzenia.'),
    ],
    AdminController.checkDashboardValidation,
    AdminController.addDirector
);

router.get('/director/search', 
    AdminController.sessionChecker,
    oneOf([
        check('name').trim().not().exists({checkFalsy: true}),
        check('name').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]), 
    oneOf([
        check('surname').trim().not().exists({checkFalsy: true}),
        check('surname').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]),
    AdminController.checkDashboardValidation,
    AdminController.searchDirector
);

router.delete('/director/delete/:id',
    AdminController.sessionChecker,
    [
        check('id').isInt()
    ],
    AdminController.checkDashboardValidation,
    AdminController.deleteDirector
);

router.get('/director/:id',
    AdminController.sessionChecker,
    [
        check('id').isInt()
    ],
    AdminController.checkDashboardValidation,
    AdminController.getDirector
);

router.put('/director/update',
    AdminController.sessionChecker,
    [
        check('name')
            .isAlpha('pl-PL').withMessage('Imię powinno zawierać wyłącznie litery.')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowe imię.'),
        check('surname')
            .isAlpha('pl-PL').withMessage('Nazwisko powinno zawierać wyłącznie litery.')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowe nazwisko.'),
        check('bday').isISO8601().withMessage('Nie podano daty urodzenia.'),
    ],
    AdminController.checkDashboardValidation,
    AdminController.updateDirector
);

////////////////////////////////////////////////////// 

router.get('/scriptwriter',
    AdminController.sessionChecker,
    AdminController.scriptwriter
);

router.post('/scriptwriter/add', 
    AdminController.sessionChecker,
    [
        check('name')
            .isAlpha('pl-PL').withMessage('Imię powinno zawierać wyłącznie litery.')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowe imię.'),
        check('surname')
            .isAlpha('pl-PL').withMessage('Nazwisko powinno zawierać wyłącznie litery.')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowe nazwisko.'),
        check('bday').isISO8601().withMessage('Nie podano daty urodzenia.'),
    ],
    AdminController.checkDashboardValidation,
    AdminController.addScriptwriter
);

router.get('/scriptwriter/search', 
    AdminController.sessionChecker,
    oneOf([
        check('name').trim().not().exists({checkFalsy: true}),
        check('name').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]), 
    oneOf([
        check('surname').trim().not().exists({checkFalsy: true}),
        check('surname').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]),
    AdminController.checkDashboardValidation,
    AdminController.searchScriptwriter
);

router.delete('/scriptwriter/delete/:id',
    AdminController.sessionChecker,
    [
        check('id').isInt()
    ],
    AdminController.checkDashboardValidation,
    AdminController.deleteScriptwriter
);

router.get('/scriptwriter/:id',
    AdminController.sessionChecker,
    [
        check('id').isInt()
    ],
    AdminController.checkDashboardValidation,
    AdminController.getScriptwriter
);

router.put('/scriptwriter/update',
    AdminController.sessionChecker,
    [
        check('name')
            .isAlpha('pl-PL').withMessage('Imię powinno zawierać wyłącznie litery.')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowe imię.'),
        check('surname')
            .isAlpha('pl-PL').withMessage('Nazwisko powinno zawierać wyłącznie litery.')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowe nazwisko.'),
        check('bday').isISO8601().withMessage('Nie podano daty urodzenia.'),
    ],
    AdminController.checkDashboardValidation,
    AdminController.updateScriptwriter
);

////////////////////////////////////////////////////// 

router.get('/technician',
    AdminController.sessionChecker,
    AdminController.technician
);

router.get('/hall',
    AdminController.sessionChecker,
    AdminController.hall
);

module.exports = router;