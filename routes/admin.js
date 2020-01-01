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

router.get('/dashboard', AdminController.dashboard);

router.get('/logout', AdminController.logout);

//////////////////////////////////////////////////////

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

router.get('/actor/all',
    AdminController.sessionChecker,
    AdminController.getAllActors
);

router.delete('/actor/delete/:id',
    AdminController.sessionChecker,
    [
        check('id').isInt()
    ],
    AdminController.checkDashboardValidation,
    AdminController.deleteActor
);

//////////////////////////////////////////////////////
router.get('/performance',
    AdminController.sessionChecker,
    AdminController.performance
);

router.get('/director',
    AdminController.sessionChecker,
    AdminController.director
);

router.get('/scriptwriter',
    AdminController.sessionChecker,
    AdminController.scriptwriter
);

router.get('/actor',
    AdminController.sessionChecker,
    AdminController.actor
);

router.get('/technician',
    AdminController.sessionChecker,
    AdminController.technician
);

router.get('/hall',
    AdminController.sessionChecker,
    AdminController.hall
);

module.exports = router;