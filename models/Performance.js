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
}

class Performance {
    static async add(description, title, genre, director_id, scriptwriter_id) {
        let {rows} = await pool.query('SELECT Teatr.Dodaj_spektakl($1, $2, $3, $4, $5)',
                [description, title, genre, director_id, scriptwriter_id]);

        return {msg: 'Dane zostały wprowadzone pomyślnie.', id: rows[0].dodaj_spektakl};
    }

    static async search(title, genre, director_name, director_surname, scriptwriter_name, scriptwriter_surname) {
        let {rows} = await pool.query(`
                        SELECT * FROM Teatr.Lista_spektakli WHERE 
                        LOWER(tytul) LIKE LOWER('%${title}%') AND LOWER(gatunek) LIKE LOWER('%${genre}%') 
                        AND LOWER(imie_rezysera) LIKE LOWER('%${director_name}%') AND LOWER(nazwisko_rezysera) LIKE LOWER('%${director_surname}%')
                        AND LOWER(imie_scenarzysty) LIKE LOWER('%${scriptwriter_name}%') AND LOWER(nazwisko_scenarzysty) LIKE LOWER('%${scriptwriter_surname}%')`
                    );
        return rows;
    }

    static async update(performance_id, description, title, genre, director_id, scriptwriter_id) {
        await pool.query('SELECT Teatr.Zmien_spektakl($1, $2, $3, $4, $5, $6)',
                [performance_id, description, title, genre, director_id, scriptwriter_id]);

        return {msg: 'Dane zostały pomyślnie zmienione.'};
    }  

    static async get(id) {
        let {rows} = await pool.query('SELECT * FROM Teatr.Rozszerzona_lista_spektakli WHERE spektakl_id = $1', [id]);
        return rows;
    }   

    static async delete(id) {
        await pool.query('DELETE FROM Teatr.Spektakl WHERE spektakl_id = $1', [id]);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }

    static async addTechnician(performance_id, technician_id) {
        await pool.query('INSERT INTO Teatr.Spektakl_Technik(spektakl_id, technik_id) VALUES($1, $2)', [performance_id, technician_id]);
        return {msg: 'Dane zostały wprowadzone pomyślnie.'};
    }

    static async deleteTechnician(performance_id, technician_id) {
        await pool.query('DELETE FROM Teatr.Spektakl_Technik WHERE spektakl_id = $1 AND technik_id = $2', [performance_id, technician_id]);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }

    static async getTechnicians(performance_id) {
        let {rows} = await pool.query('SELECT * FROM Teatr.Technicy_w_spektaklach WHERE spektakl_id = $1', [performance_id]);
        return rows;
    }
}

module.exports = {
    Performance,
    Genre
}