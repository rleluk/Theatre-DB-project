const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator');
const utils = require('../controllers/utils');
const HallController = require('../controllers/HallController');

router.get('/', 
    utils.sessionChecker,
    HallController.hall
);

router.post('/add',
    utils.sessionChecker,
    [
        check('name').isAlphanumeric().withMessage('Nazwa sali powinna zawierać wyłącznie znaki alfanumeryczne.'),
        check('numberOfRows').isInt({gt: 0, lt: 10}).withMessage('Nieprawidłowa ilość rzędów.'),
        check('seatsInRow').isInt({gt: 0, lt: 10}).withMessage('Nieprawidłowa ilość siedzeń w rzędzie.')
    ],
    utils.checkValidationVerbose,
    HallController.addHall
);

router.get('/search', 
    utils.sessionChecker,
    oneOf([
        check('name').trim().not().exists({checkFalsy: true}),
        check('name').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]),
    utils.checkValidation,
    HallController.searchHall
);

router.delete('/delete/:id',
    utils.sessionChecker,
    [check('id').isInt()],
    utils.checkValidation,
    HallController.deleteHall
);

module.exports = router;