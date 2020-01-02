const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator');
const AdminController = require('../controllers/AdminController');
const utils = require('../controllers/utils');

router.get('/', 
    AdminController.home
);

router.post('/', 
    [
        check('login').trim().isLength({min: 1}).withMessage('Login is required.'),
        check('password').trim().isLength({min: 1}).withMessage('Password is required')
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

////////////////////////////////////////////////////// PERFORMANCE

router.get('/performance',
    utils.sessionChecker,
    AdminController.performance
);

////////////////////////////////////////////////////// 

router.get('/technician',
    utils.sessionChecker,
    AdminController.technician
);

router.get('/hall',
    utils.sessionChecker,
    AdminController.hall
);

module.exports = router;