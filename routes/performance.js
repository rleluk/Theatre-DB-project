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
            .isLength({min: 1, max: 30}).withMessage('Nieprawidłowy tytuł').bail()
            .isAlpha('pl-PL').withMessage('Tytuł powinien zawierać wyłącznie litery.'),
        check('genre')
            .isAlpha('pl-PL').withMessage('Gatunek powinien zawierać wyłącznie litery.'),
        check('director_id').isInt().withMessage('Nieprawidłowe id reżysera.'),
        check('scriptwriter_id').isInt().withMessage('Nieprawidłowe id scenarzysty.')
    ],
    utils.checkValidationVerbose,
    PerformanceController.addPerformance
);

router.post('/technician',
    utils.sessionChecker,
    [
        check('performance_id').isInt(),
        check('technician_id').isInt()
    ],
    utils.checkValidation,
    PerformanceController.addTechnician
);

router.get('/search', 
    utils.sessionChecker,
    oneOf([
        check('title').trim().not().exists({checkFalsy: true}),
        check('title').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]), 
    oneOf([
        check('genre').trim().not().exists({checkFalsy: true}),
        check('genre').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]),
    oneOf([
        check('director_name').trim().not().exists({checkFalsy: true}),
        check('director_name').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]),
    oneOf([
        check('director_surname').trim().not().exists({checkFalsy: true}),
        check('director_surname').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]),
    oneOf([
        check('scriptwriter_name').trim().not().exists({checkFalsy: true}),
        check('scriptwriter_name').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]),
    oneOf([
        check('scriptwriter_surname').trim().not().exists({checkFalsy: true}),
        check('scriptwriter_surname').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]),
    utils.checkValidation,
    PerformanceController.searchPerformance
);

router.get('/:id',
    utils.sessionChecker,
    [
        check('id').isInt()
    ],
    utils.checkValidation,
    PerformanceController.getPerformance
);

router.delete('/delete/:id',
    utils.sessionChecker,
    [
        check('id').isInt()
    ],
    utils.checkValidation,
    PerformanceController.deletePerformance
);

router.post('/genre/add',
    utils.sessionChecker,
    [
        check('name').trim().isAlpha('pl-PL').withMessage('Nazwa profesji powinna zawierać wyłącznie litery.')
    ],
    utils.checkValidationVerbose,
    PerformanceController.addGenre
);

router.delete('/genre/delete/:id',
    utils.sessionChecker,
    [
        check('id').isInt()
    ],
    utils.checkValidation,
    PerformanceController.deleteGenre
);

router.get('/genre/all',
    utils.sessionChecker,
    PerformanceController.getAllGenres
);

module.exports = router;