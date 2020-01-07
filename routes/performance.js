const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator');
const PerformanceController = require('../controllers/PerformanceController');
const utils = require('../controllers/utils');

router.get('/',
    utils.sessionChecker,
    PerformanceController.performance
);

module.exports = router;