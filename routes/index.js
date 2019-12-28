const express = require('express');
const router = express.Router();

const PagesController = require('../controllers/PagesController');
const DatabaseController = require('../controllers/DatabaseController');

router.get('/', PagesController.home);
router.get('/wtf', PagesController.wtf);
router.get('/testdb', DatabaseController.getData);

module.exports = router;