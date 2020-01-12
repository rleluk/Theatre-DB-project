const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator');
const utils = require('../../controllers/utils');
const StagePerformanceController = require('../../controllers/StagePerformanceController');

router.post('/add', 
    utils.sessionChecker,
    [
        check('startDate').isISO8601().withMessage('Nie podano daty rozpoczęcia.'),
        check('startTime').matches('^(([01][0-9])|(2[0-3])):[0-5][0-9]$').withMessage('Nie podano czasu rozpoczęcia.'),
        check('endDate').isISO8601().withMessage('Nie podano daty zakończenia.'),
        check('endTime').matches('^(([01][0-9])|(2[0-3])):[0-5][0-9]$').withMessage('Nie podano czasu zakończenia.'),
        check('hall').isAlphanumeric('pl-PL').withMessage('Nieprawidłowa sala.'),
        check('performance_id').isInt().withMessage('Nieprawidłowe id spektaklu.')
    ],
    utils.checkValidationVerbose,
    StagePerformanceController.addStagePerformance
);

router.get('/search', 
    utils.sessionChecker,
    [
        check('startDate').isISO8601().withMessage('Nieprawidłowa data rozpoczęcia.'),
        check('endDate').isISO8601().withMessage('Nieprawidłowa data zakończenia.')
    ],
    utils.checkValidationVerbose,
    StagePerformanceController.searchStagePerformance
);

router.get('/all',
    utils.sessionChecker,
    StagePerformanceController.getAllStagePerformances
);

router.delete('/delete/:id',
    utils.sessionChecker,
    [
        check('id').isInt()
    ],
    utils.checkValidation,
    StagePerformanceController.deleteStagePerformance
);

module.exports = router;