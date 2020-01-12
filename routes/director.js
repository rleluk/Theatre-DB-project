const express = require('express');
const router = express.Router();
const {check, oneOf} = require('express-validator');
const utils = require('../controllers/utils');
const DirectorController = require('../controllers/DirectorController');

router.get('/',
    utils.sessionChecker,
    DirectorController.director
);

router.post('/add', 
    utils.sessionChecker,
    utils.checkPersonVerbose,
    utils.checkValidationVerbose,
    DirectorController.addDirector
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
    DirectorController.searchDirector
);

router.delete('/delete/:id',
    utils.sessionChecker,
    [
        check('id').isInt()
    ],
    utils.checkValidation,
    DirectorController.deleteDirector
);

router.get('/all',
    utils.sessionChecker,
    DirectorController.getAllDirectors
);

router.get('/:id',
    utils.sessionChecker,
    [
        check('id').isInt()
    ],
    utils.checkValidation,
    DirectorController.getDirector
);

router.put('/update',
    utils.sessionChecker,
    utils.checkPersonVerbose,
    utils.checkValidationVerbose,
    DirectorController.updateDirector
);

module.exports = router;