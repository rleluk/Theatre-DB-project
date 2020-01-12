const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator');
const utils = require('../../controllers/utils');
const TicketController = require('../../controllers/TicketController');

router.get('/',
    utils.sessionChecker,
    TicketController.ticket
);

router.post('/type/add',
    utils.sessionChecker,
    [
        check('name').trim().isAlpha('pl-PL').withMessage('Nazwa typu biletu powinna zawierać wyłącznie litery.'),
        check('price').isFloat().withMessage('Cena powinna być liczbą rzeczywistą.')
    ],
    utils.checkValidationVerbose,
    TicketController.addTicketType
);

router.delete('/type/delete/:id',
    utils.sessionChecker,
    [
        check('id').isInt()
    ],
    utils.checkValidation,
    TicketController.deleteTicketType
);

router.get('/type/getall',
    utils.sessionChecker,
    TicketController.getAllTicketTypes
);

module.exports = router;