const pool = require('../config/connection');
exports.logIn = (req, res) => {
    pool.query(`SELECT * FROM users WHERE login='${req.body.login}' AND password='${req.body.password}'`, (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows)
    })
};



