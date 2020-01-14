const {Ticket, TicketType} = require('../models/Ticket');
const {UNIQUE_VIOLATION, FOREIGN_KEY_VIOLATION} = require('pg-error-constants');

exports.ticket = (req, res) => {
    res.render('ticket-panel');
};

exports.addTicket = async (req, res) => {
    try {
        let result = await Ticket.add(req.body.play_id, req.body.ticketType);
        res.status(200).send(result);
    } catch(err) {
        if(err.code === 'P0001') {
            res.status(409).send({msg: err.message})
        } else {
            console.log(err);
            res.status(500).send({msg: 'Coś poszło nie tak...'});
        }
    }
};

exports.getTicketInfo = async (req, res) => {
    try {
        let result = await Ticket.getTicketInfo();
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

exports.addTicketType = async (req, res) => {
    try {
        let result = await TicketType.add(req.body.name, req.body.price);
        res.status(200).send(result);
    } catch(err) {
        if (err.code === UNIQUE_VIOLATION)
            res.status(412).send({msg: 'Wprowadzony typ biletu już znajduje się w bazie danych.'});
        else {
            console.log(err);
            res.status(500).send({msg: 'Coś poszło nie tak...'});
        }
    }
};

exports.getAllTicketTypes = async (req, res) => {
    try {
        let result = await TicketType.getAll();
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

exports.deleteTicketType = async (req, res) => {
    try {
        let result = await TicketType.delete(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        if(err.code === FOREIGN_KEY_VIOLATION)
            res.status(409).send({msg: 'Wybrany typ biletu ma wciąż odwołanie w tabeli "Bilet".'});
        else {
            console.log(err);
            res.status(500).send({msg: 'Coś poszło nie tak...'});
        }
    }
};