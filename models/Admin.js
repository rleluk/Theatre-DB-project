var db = require('../config/connection');
var pool = db.getPool();

async function checkCredentials(login, password) {
    let {rows} = await pool.query(`SELECT * FROM Teatr.admin WHERE login='${login}' AND haslo='${password}'`);
    return rows;
}

module.exports = checkCredentials;