const Pool = require('pg').Pool
const pool = new Pool({
  user: 'u7leluk',
  host: 'pascal',
  database: 'u7leluk',
  password: '7leluk',
  port: 5432,
});

exports.getData = (req, res) => {
    pool.query('SELECT * FROM test.test_table', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
};


