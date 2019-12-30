const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/AdminController');

router.get('/', 
    AdminController.home
);

router.post('/', 
    AdminController.validateAdmin, 
    AdminController.checkAdminValidation, 
    AdminController.login
);

router.get('/dashboard', AdminController.dashboard);

router.get('/logout', AdminController.logout);

//////////////////////////////////////////////////////

router.post('/actor/add', 
    AdminController.sessionChecker,
    AdminController.validatePerson,
    AdminController.checkDashboardValidation,
    AdminController.addActor
);

router.get('/actor/:id', 
    AdminController.sessionChecker,
    AdminController.getActor
);

//////////////////////////////////////////////////////
router.get('/performance',
    AdminController.sessionChecker,
    AdminController.performance
);

router.get('/director',
    AdminController.sessionChecker,
    AdminController.director
);

router.get('/scriptwriter',
    AdminController.sessionChecker,
    AdminController.scriptwriter
);

router.get('/actor',
    AdminController.sessionChecker,
    AdminController.actor
);

router.get('/technician',
    AdminController.sessionChecker,
    AdminController.technician
);

router.get('/hall',
    AdminController.sessionChecker,
    AdminController.hall
);

module.exports = router;