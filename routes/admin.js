const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/AdminController');

router.get('/', 
    AdminController.sessionChecker, 
    AdminController.home
);

router.post('/', 
    AdminController.validate, 
    AdminController.checkValidation, 
    AdminController.login

);

router.get('/dashboard', AdminController.dashboard);

router.get('/logout', AdminController.logout);

module.exports = router;