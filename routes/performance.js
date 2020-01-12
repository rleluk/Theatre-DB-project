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
    utils.checkPerformanceVerbose,
    utils.checkValidationVerbose,
    PerformanceController.addPerformance
);

router.put('/update',
    utils.sessionChecker,
    utils.checkPerformanceVerbose,
    utils.checkValidationVerbose,
    PerformanceController.updatePerformance
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

/************************************** GENRE ENDPOINTS  **************************************/
router.post('/genre/add',
    utils.sessionChecker,
    [
        check('name').trim().isAlpha('pl-PL').withMessage('Nazwa gatunku powinna zawierać wyłącznie litery.')
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

/************************************** TECHNICIAN ENDPOINTS  **************************************/
router.post('/technician/add',
    utils.sessionChecker,
    [
        check('performance_id').isInt().withMessage('Niepoprawne id spektaklu.'),
        check('technician_id').isInt().withMessage('Nieprawidłowy technik.')
    ],
    utils.checkValidation,
    PerformanceController.addTechnician
);

router.delete('/technician/delete',
    utils.sessionChecker,
    [
        check('performance_id').isInt(),
        check('technician_id').isInt()
    ],
    utils.checkValidation,
    PerformanceController.deleteTechnician
);

router.get('/technicians/:performance_id',
    utils.sessionChecker,
    [
        check('performance_id').isInt()
    ],
    utils.checkValidation,
    PerformanceController.getTechnicians
);

module.exports = router;