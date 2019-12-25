const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const DatabaseController = require('../controllers/DatabaseController');
const LogInController = require('../controllers/LoggingController');

router.get('/', PagesController.home);
router.post('/testdb', DatabaseController.getData);
router.post('/login', LoggingController.logIn);

module.exports = router;