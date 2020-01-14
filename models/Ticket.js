var db = require('../config/connection');
var pool = db.getPool();

class Ticket {
    static async add(play_id, ticketType) {
        let {rows} = await pool.query('SELECT Teatr.Dodaj_bilet($1, $2)', [play_id, ticketType]);
        let data = rows[0].dodaj_bilet;
        data = data.replace('(', '');
        data = data.replace(')', '');
        data = data.split(',');
        return {sala: data[0], miejsce: data[1]};
    }

    static async getTicketInfo() {
        let {rows} = await pool.query('SELECT * FROM Teatr.Dane_statystyczne_wystawien');
        return rows;
    }
}

class TicketType {
    static async add(name, price) {
        await pool.query('INSERT INTO Teatr.Typ_biletu(nazwa, cena) VALUES($1, $2)', [name, price]);
        return {msg: 'Dane zostały wprowadzone pomyślnie.'};
    }
    
    static async getAll() {
        let {rows} = await pool.query('SELECT * FROM Teatr.Typ_biletu');
        return rows;
    }

    static async delete(id) {
        await pool.query('DELETE FROM Teatr.Typ_biletu WHERE typ_biletu_id = $1', [id]);
        return {msg: 'Dane zostały pomyślnie usunięte.'};
    }
}

module.exports = {
    Ticket,
    TicketType
}   