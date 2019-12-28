const pool = require('../config/connection');
exports.getData = (req, res) => {
    pool.query('SELECT * FROM test.test_table', (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
};



