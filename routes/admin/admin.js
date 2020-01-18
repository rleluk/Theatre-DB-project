const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator');
const AdminController = require('../../controllers/AdminController');
const utils = require('../../controllers/utils');

router.get('/', 
    AdminController.home
);

router.post('/', 
    [
        check('login').isLength({min: 1}).withMessage('Nie podano loginu.'),
        check('password').isLength({min: 1}).withMessage('Nie podano hasła.')
    ], 
    AdminController.checkAdminValidation, 
    AdminController.login
);

router.get('/dashboard',
    utils.sessionChecker,
    AdminController.dashboard
);

router.get('/logout', 
    utils.sessionChecker,    
    AdminController.logout
);

module.exports = router;