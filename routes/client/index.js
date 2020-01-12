const express = require('express');
const router = express.Router();

const PagesController = require('../../controllers/PagesController');

router.get('/', PagesController.home);

router.get('/performances', PagesController.performances);

router.get('/staff', PagesController.staff);

router.get('/tickets', PagesController.tickets);

router.get('/halls', PagesController.halls);

module.exports = router;