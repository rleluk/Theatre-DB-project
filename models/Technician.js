var db = require('../config/connection');
var pool = db.getPool();

class Profession {
    static async add(name) {
        await pool.query('INSERT INTO Teatr.Profesja(nazwa) VALUES($1)', [name]);
        return {msg: 'Dane zostały wprowadzone pomyślnie.'};
    }

    static async getAll() {
        let {rows} = await pool.query('SELECT * FROM Teatr.Profesja');
        return rows;
    }

    static async delete(id) {
        await pool.query('DELETE FROM Teatr.Profesja WHERE Profesja_id = $1', [id]);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }

    static async getID(name) {
        let {rows} = await pool.query('SELECT Profesja_id FROM Teatr.Profesja WHERE Nazwa = $1', [name]);
        return rows[0].profesja_id;
    }
}

class Technician {
    static async add(name, surname, profession) {
        let profession_id = await Profession.getID(profession);
        await pool.query('INSERT INTO Teatr.Technik_teatralny(imie, nazwisko, profesja_id) VALUES($1, $2, $3)', [name, surname, profession_id]);
        return {msg: 'Dane zostały wprowadzone pomyślnie.'};
    }

    static async search(name, surname, profession) {
        let {rows} = await pool.query(`SELECT * FROM Teatr.Lista_technikow WHERE LOWER(Imie) 
                LIKE LOWER('%${name}%') AND LOWER(Nazwisko) LIKE LOWER('%${surname}%') AND LOWER(Profesja) LIKE LOWER('%${profession}%')`);
        return rows;
    }

    // static async update(id, name, surname, profession_id) {
    //     let result = await pool.query('UPDATE Teatr.Technik_teatralny SET Imie = $1, Nazwisko = $2, Profesja_id = $3 WHERE Technik_id = $4',
    //         [name, surname, profession_id, id]);
    //     return {msg: 'Dane zostały pomyślnie zmienione.'};
    // }   

    // static async get(id) {
    //     let {rows} = await pool.query('SELECT * FROM Teatr.Scenarzysta WHERE Technik_id = $1', [id]);
    //     return rows;
    // }   

    static async delete(id) {
        await pool.query('DELETE FROM Teatr.Technik_teatralny WHERE Technik_id = $1', [id]);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }
}

module.exports = {
    Technician,
    Profession
}   