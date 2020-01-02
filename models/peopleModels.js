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

class Director {
    static async add(name, surname, bday, description) {
        await pool.query('INSERT INTO Teatr.Rezyser(imie, nazwisko, opis, data_urodzenia) VALUES($1, $2, $3, $4)', [name, surname, description, bday]);
        return {msg: 'Dane zostały wprowadzone pomyślnie.'};
    }

    static async search(name, surname) {
        let {rows} = await pool.query(`SELECT * FROM Teatr.Rezyser WHERE LOWER(Imie) LIKE LOWER('%${name}%') AND LOWER(Nazwisko) LIKE LOWER('%${surname}%')`);
        return rows;
    }

    static async update(id, name, surname, bday, description) {
        let result = await pool.query('UPDATE Teatr.Rezyser SET Imie = $1, Nazwisko = $2, Data_urodzenia = $3, Opis = $4 WHERE Rezyser_id = $5',
            [name, surname, bday, description, id]);
        return {msg: 'Dane zostały pomyślnie zmienione.'};
    }   

    static async get(id) {
        let {rows} = await pool.query('SELECT * FROM Teatr.Rezyser WHERE Rezyser_id = $1', [id]);
        return rows;
    }

    static async delete(id) {
        await pool.query('DELETE FROM Teatr.Rezyser WHERE Rezyser_id = $1', [id]);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }
}

class Scriptwriter {
    static async add(name, surname, bday, description) {
        await pool.query('INSERT INTO Teatr.Scenarzysta(imie, nazwisko, opis, data_urodzenia) VALUES($1, $2, $3, $4)', [name, surname, description, bday]);
        return {msg: 'Dane zostały wprowadzone pomyślnie.'};
    }

    static async search(name, surname) {
        let {rows} = await pool.query(`SELECT * FROM Teatr.Scenarzysta WHERE LOWER(Imie) LIKE LOWER('%${name}%') AND LOWER(Nazwisko) LIKE LOWER('%${surname}%')`);
        return rows;
    }

    static async update(id, name, surname, bday, description) {
        let result = await pool.query('UPDATE Teatr.Scenarzysta SET Imie = $1, Nazwisko = $2, Data_urodzenia = $3, Opis = $4 WHERE Scenarzysta_id = $5',
            [name, surname, bday, description, id]);
        return {msg: 'Dane zostały pomyślnie zmienione.'};
    }   

    static async get(id) {
        let {rows} = await pool.query('SELECT * FROM Teatr.Scenarzysta WHERE Scenarzysta_id = $1', [id]);
        return rows;
    }

    static async delete(id) {
        await pool.query('DELETE FROM Teatr.Scenarzysta WHERE Scenarzysta_id = $1', [id]);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }
}

module.exports = {
    Actor: Actor,
    Director: Director,
    Scriptwriter: Scriptwriter
}