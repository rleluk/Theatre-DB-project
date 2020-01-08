const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator');
const PerformanceController = require('../controllers/PerformanceController');
const utils = require('../controllers/utils');

router.get('/',
    utils.sessionChecker,
    PerformanceController.performance
);

router.post('/add',
    utils.sessionChecker,
    [
        check('title')
            .isLength({min: 1, max: 30}).withMessage('Nieprawidłowa długość tytułu.').bail()
            .isAlpha('pl-PL').withMessage('Tytuł powinien zawierać wyłącznie litery.'),
        check('genre_name').isAlpha('pl-PL').withMessage('Gatunek powinien zawierać wyłącznie litery.'),
        check('director_id').isInt().withMessage('Nieprawidłowe id reżysera.'),
        check('scriptwriter_id').isInt().withMessage('Nieprawidłowe id scenarzysty.')
    ],
    utils.checkValidationVerbose,
    PerformanceController.addPerformance
);

router.delete('/delete/:id',
    utils.sessionChecker,
    [check('id').isInt()],
    utils.checkValidation,
    PerformanceController.deletePerformance
);

router.post('/genre/add',
    utils.sessionChecker,
    [check('name').trim().isAlpha('pl-PL').withMessage('Nazwa profesji powinna zawierać wyłącznie litery.')],
    utils.checkValidationVerbose,
    PerformanceController.addGenre
);

router.delete('/genre/delete/:id',
    utils.sessionChecker,
    [check('id').isInt()],
    utils.checkValidation,
    PerformanceController.deleteGenre
);

router.get('/genre/all',
    utils.sessionChecker,
    PerformanceController.getAllGenres
);

module.exports = router;