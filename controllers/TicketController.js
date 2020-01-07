const {Ticket, TicketType} = require('../models/Ticket');
const {UNIQUE_VIOLATION, FOREIGN_KEY_VIOLATION} = require('pg-error-constants')

exports.ticket = (req, res) => {
    res.render('ticket-panel');
};

exports.addTicketType = async (req, res) => {
    try {
        let result = await TicketType.add(req.body.name, req.body.price);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Wystąpił błąd przez co dane nie zostały pomyślnie wprowadzone do bazy danych.'});
    }
};

exports.getAllTicketTypes = async (req, res) => {
    try {
        let result = await TicketType.getAll();
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Błąd bazy danych.'});
    }
};

exports.deleteTicketType = async (req, res) => {
    try {
        let result = await TicketType.delete(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        if(err.code === FOREIGN_KEY_VIOLATION)
            res.status(409).send({msg: 'Podana profesja ma wciąż odwołanie w tabeli "Bilet".'});
        else {
            console.log(err);
            res.status(500).send({msg: 'Błąd bazy danych.'});
        }
    }
};