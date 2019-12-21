const express = require('express');

const app = express();

app.get('/', function(req, res, next) {
    res.json({
        'status': 'sukces'
    });
});

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'u7leluk',
  host: 'pascal',
  database: 'u7leluk',
  password: '7leluk',
  port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM test.test_table', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

app.get('/test', getUsers);

module.exports = app;
