const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator');
const utils = require('../controllers/utils');
const ActorController = require('../controllers/ActorController');

router.get('/',
    utils.sessionChecker,
    ActorController.actor
);

router.post('/add', 
    utils.sessionChecker,
    [
        check('name')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowa długość imienia.').bail()
            .isAlpha('pl-PL').withMessage('Imię powinno zawierać wyłącznie litery.'),
        check('surname')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowa długość nazwiska.').bail()
            .isAlpha('pl-PL').withMessage('Nazwisko powinno zawierać wyłącznie litery.'),
        check('bday').isISO8601().withMessage('Nie podano daty urodzenia.')
    ],
    utils.checkValidationVerbose,
    ActorController.addActor
);

router.get('/search', 
    utils.sessionChecker,
    oneOf([
        check('name').trim().not().exists({checkFalsy: true}),
        check('name').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]), 
    oneOf([
        check('surname').trim().not().exists({checkFalsy: true}),
        check('surname').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]),
    utils.checkValidation,
    ActorController.searchActor
);

router.delete('/delete/:id',
    utils.sessionChecker,
    [check('id').isInt()],
    utils.checkValidation,
    ActorController.deleteActor
);

module.exports = router;