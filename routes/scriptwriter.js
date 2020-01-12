const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator');
const utils = require('../controllers/utils');
const ScriptwriterController = require('../controllers/ScriptwriterController');

router.get('/',
    utils.sessionChecker,
    ScriptwriterController.scriptwriter
);

router.post('/add', 
    utils.sessionChecker,
    utils.checkPersonVerbose,
    utils.checkValidationVerbose,
    ScriptwriterController.addScriptwriter
);

router.get('/search', 
    utils.sessionChecker,
    oneOf([
        check('name').trim().not().exists({checkFalsy: true}),
        check('name').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]), 
    oneOf([
        check('surname').trim().not().exists({checkFalsy: true}),
        check('surname').trim().exists({checkFalsy: true}).isAlpha('pl-PL')
    ]),
    utils.checkValidation,
    ScriptwriterController.searchScriptwriter
);

router.delete('/delete/:id',
    utils.sessionChecker,
    [
        check('id').isInt()
    ],
    utils.checkValidation,
    ScriptwriterController.deleteScriptwriter
);

router.get('/all',
    utils.sessionChecker,
    ScriptwriterController.getAllScriptwriters
);

router.get('/:id',
    utils.sessionChecker,
    [
        check('id').isInt()
    ],
    utils.checkValidation,
    ScriptwriterController.getScriptwriter
);

router.put('/update',
    utils.sessionChecker,
    utils.checkPersonVerbose,
    utils.checkValidationVerbose,
    ScriptwriterController.updateScriptwriter
);

module.exports = router;