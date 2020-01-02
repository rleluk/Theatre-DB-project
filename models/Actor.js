var db = require('../config/connection');
var pool = db.getPool();

class Actor {
    static async add(name, surname, bday) {
        await pool.query('INSERT INTO Teatr.Aktor(imie, nazwisko, data_urodzenia) VALUES($1, $2, $3)', [name, surname, bday]);
        return {msg: 'Dane zostały wprowadzone pomyślnie.'};
    }

    static async search(name, surname) {
        let {rows} = await pool.query(`SELECT * FROM Teatr.Aktor WHERE LOWER(Imie) LIKE LOWER('%${name}%') AND LOWER(Nazwisko) LIKE LOWER('%${surname}%')`);
        return rows;
    }

    static async delete(id) {
        await pool.query(`DELETE FROM Teatr.Aktor WHERE aktor_id = '${id}'`);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }
}

module.exports = Actor;