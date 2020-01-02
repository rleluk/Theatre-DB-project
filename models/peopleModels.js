var db = require('../config/connection');
var pool = db.getPool();

class Actor {
    static async add(name, surname, bday) {
        await pool.query(`INSERT INTO Teatr.Aktor(imie, nazwisko, data_urodzenia) VALUES('${name}', '${surname}', '${bday}')`);
        return {msg: 'Dane zostały wprowadzone pomyślnie.'};
    }

    static async search(name, surname) {
        let {rows} = await pool.query(`SELECT * FROM Teatr.Aktor WHERE LOWER(Imie) LIKE LOWER('%${name}%') AND LOWER(Nazwisko) LIKE LOWER('%${surname}%')`)
                    .catch(error => {throw error;});
        return rows;
    }

    static async delete(id) {
        await pool.query(`DELETE FROM Teatr.Aktor WHERE aktor_id = '${id}'`);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }
}

class Director {
    static async add(name, surname, bday, description) {
        await pool.query(`INSERT INTO Teatr.Rezyser(imie, nazwisko, opis, data_urodzenia) VALUES('${name}', '${surname}', '${bday}', '${description}')`);
        return {msg: 'Dane zostały wprowadzone pomyślnie.'};
    }

    static async search(name, surname) {
        let {rows} = await pool.query(`SELECT * FROM Teatr.Rezyser WHERE LOWER(Imie) LIKE LOWER('%${name}%') AND LOWER(Nazwisko) LIKE LOWER('%${surname}%')`);
        return rows;
    }

    static async delete(id) {
        await pool.query(`DELETE FROM Teatr.Rezyser WHERE rezyser_id = '${id}'`);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }
}

class Scriptwriter {
    static async add(name, surname, bday, description) {
        await pool.query(`INSERT INTO Teatr.Scenarzysta(imie, nazwisko, opis, data_urodzenia) VALUES('${name}', '${surname}', '${bday}', '${description}')`);
        return {msg: 'Dane zostały wprowadzone pomyślnie.'};
    }

    static async search(name, surname) {
        let {rows} = await pool.query(`SELECT * FROM Teatr.Scenarzysta WHERE LOWER(Imie) LIKE LOWER('%${name}%') AND LOWER(Nazwisko) LIKE LOWER('%${surname}%')`);
        return rows;
    }

    static async delete(id) {
        await pool.query(`DELETE FROM Teatr.Scenarzysta WHERE rezyser_id = '${id}'`);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }
}

module.exports = {
    Actor: Actor,
    Director: Director,
    Scriptwriter: Scriptwriter
}