const {check} = require('express-validator');
const express = require('express');
const router = express.Router();


const utils = require('../../controllers/utils');
const PagesController = require('../../controllers/PagesController');
const ActorController = require('../../controllers/ActorController');
const DirectorController = require('../../controllers/DirectorController');
const ScriptwriterController = require('../../controllers/ScriptwriterController');
const TechnicianController = require('../../controllers/TechnicianController');
const PerformanceController = require('../../controllers/PerformanceController');
const RoleController = require('../../controllers/RoleController');
const StagePerformanceController = require('../../controllers/StagePerformanceController');
const TicketController = require('../../controllers/TicketController');


router.get('/', PagesController.home);

router.get('/performances', PagesController.performances);

router.get('/staff', PagesController.staff);

router.get('/tickets', PagesController.tickets);

router.get('/halls', PagesController.halls);

router.get('/director/all',
    DirectorController.getAllDirectors
);

router.get('/scriptwriter/all',
    ScriptwriterController.getAllScriptwriters
);

router.get('/actor/all',
    ActorController.getAllActors
);

router.get('/technician/all',
    TechnicianController.getAllTechnicians
);

router.get('/performance/all',
    PerformanceController.getAllPerformances
);

router.get('/performance/descriptions/:id',
    [
        check('id').isInt(),
    ],
    utils.checkValidation,
    PerformanceController.getDescriptions
);

router.get('/performance/technicians/:performance_id',
    [
        check('performance_id').isInt(),
    ],
    utils.checkValidation,
    PerformanceController.getTechnicians
);

router.get('/performance/roles/:performance_id',
    [
        check('performance_id').isInt(),
    ],
    utils.checkValidation,
    RoleController.getRoles
);

router.get('/play/current',
    StagePerformanceController.getCurrentStagePerformances
);

router.post('/tickets/:play_id'
    [
        check('play_id').isInt(),
    ],
    utils.checkValidation,
    TicketController.addTicket
);

module.exports = router;