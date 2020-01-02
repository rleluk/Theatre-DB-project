const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator');
const utils = require('../controllers/utils');
const ScriptwriterController = require('../controllers/ScriptwriterController');

router.get('/',
    utils.sessionChecker,
    ScriptwriterController.scriptwriter
);

router.post('/add', 
    utils.sessionChecker,
    [
        check('name')
            .isAlpha('pl-PL').withMessage('Imię powinno zawierać wyłącznie litery.')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowe imię.'),
        check('surname')
            .isAlpha('pl-PL').withMessage('Nazwisko powinno zawierać wyłącznie litery.')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowe nazwisko.'),
        check('bday').isISO8601().withMessage('Nie podano daty urodzenia.'),
    ],
    utils.checkDashboardValidation,
    ScriptwriterController.addScriptwriter
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
    utils.checkDashboardValidation,
    ScriptwriterController.searchScriptwriter
);

router.delete('/delete/:id',
    utils.sessionChecker,
    [
        check('id').isInt()
    ],
    utils.checkDashboardValidation,
    ScriptwriterController.deleteScriptwriter
);

router.get('/:id',
    utils.sessionChecker,
    [
        check('id').isInt()
    ],
    utils.checkDashboardValidation,
    ScriptwriterController.getScriptwriter
);

router.put('/update',
    utils.sessionChecker,
    [
        check('name')
            .isAlpha('pl-PL').withMessage('Imię powinno zawierać wyłącznie litery.')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowe imię.'),
        check('surname')
            .isAlpha('pl-PL').withMessage('Nazwisko powinno zawierać wyłącznie litery.')
            .isLength({min: 1, max: 20}).withMessage('Nieprawidłowe nazwisko.'),
        check('bday').isISO8601().withMessage('Nie podano daty urodzenia.'),
    ],
    utils.checkDashboardValidation,
    ScriptwriterController.updateScriptwriter
);

module.exports = router;