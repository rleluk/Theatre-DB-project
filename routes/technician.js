const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator');
const utils = require('../controllers/utils');
const TechnicianController = require('../controllers/TechnicianController');

router.get('/',
    utils.sessionChecker,
    TechnicianController.technician
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
        check('profession').isAlpha('pl-PL').withMessage('Nieprawidłowa profesja.')
    ],
    utils.checkDashboardValidation,
    TechnicianController.addTechnician
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
    oneOf([
        check('profession').trim().not().exists({checkFalsy: true}),
        check('profession').exists({checkFalsy: true}).isAlpha('pl-PL')
    ]),
    utils.checkDashboardValidation,
    TechnicianController.searchTechnician
);

router.delete('/delete/:id',
    utils.sessionChecker,
    [check('id').isInt()],
    utils.checkDashboardValidation,
    TechnicianController.deleteTechnician
);

router.post('/profession/add',
    utils.sessionChecker,
    [check('name').trim().isAlpha('pl-PL').withMessage('Nazwa profesji powinna zawierać wyłącznie litery.')],
    utils.checkDashboardValidation,
    TechnicianController.addProfession
);

router.delete('/profession/delete/:id',
    utils.sessionChecker,
    [check('id').isInt()],
    utils.checkDashboardValidation,
    TechnicianController.deleteProfession
);

router.get('/profession/getall',
    utils.sessionChecker,
    TechnicianController.getAllProfessions
);

module.exports = router;