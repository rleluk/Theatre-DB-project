const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator');
const utils = require('../controllers/utils');
const DirectorController = require('../controllers/DirectorController');

router.get('/',
    utils.sessionChecker,
    DirectorController.director
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
    DirectorController.addDirector
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
    DirectorController.searchDirector
);

router.delete('/delete/:id',
    utils.sessionChecker,
    [
        check('id').isInt()
    ],
    utils.checkValidation,
    DirectorController.deleteDirector
);

router.get('/:id',
    utils.sessionChecker,
    [
        check('id').isInt()
    ],
    utils.checkValidation,
    DirectorController.getDirector
);

router.put('/update',
    utils.sessionChecker,
    [
        check('name')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowa długość imienia.').bail()
            .isAlpha('pl-PL').withMessage('Imię powinno zawierać wyłącznie litery.'),
        check('surname')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowa długość nazwiska.').bail()
            .isAlpha('pl-PL').withMessage('Nazwisko powinno zawierać wyłącznie litery.'),
        check('bday').isISO8601().withMessage('Nie podano daty urodzenia.'),
    ],
    utils.checkValidationVerbose,
    DirectorController.updateDirector
);

module.exports = router;