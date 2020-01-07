var db = require('../config/connection');
var pool = db.getPool();

class Hall {
    static async add(name, numberOfRows, seatsInRow) {
        await pool.query("SELECT Teatr.Dodaj_sale($1, $2, $3)", [name, numberOfRows, seatsInRow]);
        return {msg: "Dane zostały wprowadzone pomyślnie."};
    }

    static async search(name) {
        let {rows} = await pool.query(`SELECT * FROM Teatr.Lista_sal WHERE LOWER(Nazwa) LIKE LOWER('%${name}%')`);
        return rows;
    }

    static async delete(id) {
        await pool.query(`DELETE FROM Teatr.Sala WHERE sala_id = $1`, [id]);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }
}

module.exports = Hall;