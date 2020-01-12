const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator');
const RoleController = require('../controllers/RoleController');
const utils = require('../controllers/utils');

router.post('/add',
    utils.sessionChecker,
    [
        check('name').isAlpha('pl-PL').withMessage('Nazwa roli powinna zawierać wyłącznie litery.'),
        check('performance_id').isInt().withMessage('Niepoprawne id spektaklu.'),
        check('actor_id').isInt().withMessage('Nieprawidłowy aktor.')
    ],
    utils.checkValidationVerbose,
    RoleController.addRole
);

router.get('/:performance_id',
    utils.sessionChecker,
    [
        check('performance_id').isInt(),
    ],
    utils.checkValidation,
    RoleController.getRoles
);

router.delete('/delete/:id',
    utils.sessionChecker,
    [
        check('id').isInt(),
    ],
    utils.checkValidation,
    RoleController.deleteRole
);

module.exports = router;