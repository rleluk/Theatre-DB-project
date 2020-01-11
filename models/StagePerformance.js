var db = require('../config/connection');
var pool = db.getPool();

class StagePerformance {
    static async add(performance_id, startDate, endDate, hall) {
        await pool.query('SELECT Teatr.Wystaw_spektakl($1, $2, $3, $4)',
            [performance_id, startDate, endDate, hall]);
        return {msg: 'Dane zostały wprowadzone pomyślnie.'};
    }

    static async search(startDate, endDate) {
        let {rows} = await pool.query(`SELECT * FROM Teatr.Lista_wystawien WHERE 
            DATE(data_rozpoczecia) >= $1 AND DATE(data_zakonczenia) <= $2`, [startDate, endDate]);
        return rows;
    }

    static async getAll() {
        let {rows} = await pool.query('SELECT * FROM Teatr.Lista_wystawien');
        return rows;
    }

    static async delete(id) {
        await pool.query(`DELETE FROM Teatr.Wystawienie_spektaklu WHERE wystawienie_id = $1`, [id]);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }
}

module.exports = StagePerformance;