var db = require('../config/connection');
var pool = db.getPool();

async function checkCredentials(login, password) {
    let {rows} = await pool.query(`SELECT * FROM Teatr.admins WHERE login='${login}' AND password='${password}'`);
    return rows;
}

module.exports.checkCredentials = checkCredentials;