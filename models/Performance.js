var db = require('../config/connection');
var pool = db.getPool();

class Genre {
    static async add(name) {
        await pool.query('INSERT INTO Teatr.Gatunek(nazwa) VALUES($1)', [name]);
        return {msg: 'Dane zostały wprowadzone pomyślnie.'};
    }

    static async getAll() {
        let {rows} = await pool.query('SELECT * FROM Teatr.Gatunek');
        return rows;
    }

    static async delete(id) {
        await pool.query('DELETE FROM Teatr.Gatunek WHERE gatunek_id = $1', [id]);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }

    static async getID(name) {
        let {rows} = await pool.query('SELECT gatunek_id FROM Teatr.Gatunek WHERE Nazwa = $1', [name]);
        return rows[0].gatunek_id;
    }
}

class Performance {
    static async add(description, title, genre_name, director_id, scriptwriter_id) {
        let genre_id = await Genre.getID(genre_name);
        await pool.query('INSERT INTO Teatr.Spektakl(opis, tytul, gatunek_id, rezyser_id, scenarzysta_id) VALUES($1, $2, $3, $4, $5)',
                [description, title, genre_id, director_id, scriptwriter_id]);
        return {msg: 'Dane zostały wprowadzone pomyślnie.'};
    }

    static async search(title, genre_id, director_name, director_surname, scriptwriter_name, scriptwriter_surname) {
        let {rows} = await pool.query(`
                        SELECT * FROM Teatr.Lista_spektakli WHERE 
                        LOWER(tytul) LIKE LOWER('%${title}%') 
                        AND LOWER(imie_rezysera) LIKE LOWER('%${director_name}%') AND LOWER(nazwisko_rezysera) LIKE LOWER('%${director_surname}%')
                        AND LOWER(imie_scenarzysty) LIKE LOWER('%${scriptwriter_name}%') AND LOWER(nazwisko_scenarzysty) LIKE LOWER('%${scriptwriter_surname}%')`
                    );
        return rows;
    }

    static async get(id) {
        let {rows} = await pool.query('SELECT * FROM Teatr.Spektakl WHERE technik_id = $1', [id]);
        return rows;
    }   

    static async delete(id) {
        await pool.query('DELETE FROM Teatr.Spektakl WHERE spektakl_id = $1', [id]);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }
}

module.exports = {
    Performance,
    Genre
}