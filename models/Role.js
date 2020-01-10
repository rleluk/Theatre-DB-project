var db = require('../config/connection');
var pool = db.getPool();

class Role {
    static async add(name, performance_id, actor_id) {
        await pool.query('INSERT INTO Teatr.Rola(nazwa, spektakl_id, aktor_id) VALUES($1, $2, $3)', [name, performance_id, actor_id]);
        return {msg: 'Dane zostały wprowadzone pomyślnie.'};
    }

    static async get(performance_id) {
        let {rows} = await pool.query(`SELECT * FROM Teatr.Lista_rol WHERE spektakl_id = $1`, [performance_id]);
        return rows;
    }

    static async delete(id) {
        await pool.query('DELETE FROM Teatr.Rola WHERE rola_id = $1', [id]);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }
}

module.exports = Role;