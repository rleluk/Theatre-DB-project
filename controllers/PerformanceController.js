const Performance = require('../models/Performance');
const {UNIQUE_VIOLATION, FOREIGN_KEY_VIOLATION} = require('pg-error-constants')

exports.performance = (req, res) => {
    res.render('performance-panel');
}