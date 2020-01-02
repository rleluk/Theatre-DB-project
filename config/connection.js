const pg = require('pg');
var pool;
var config = {
  user: 'u7leluk',
  host: 'pascal',
  database: 'u7leluk',
  password: '7leluk',
  port: 5432,
};

module.exports = {
  getPool: function() {
    if(pool) return pool; // if it is already there, grab it here
    pool = new pg.Pool(config);
    return pool;
  }
}