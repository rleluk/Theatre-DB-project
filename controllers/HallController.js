const Hall = require('../models/Hall');
const {UNIQUE_VIOLATION, FOREIGN_KEY_VIOLATION} = require('pg-error-constants')

exports.hall = (req, res) => {
    res.render('hall-panel');
}

exports.addHall = async (req, res) => {
    try {
        let result = await Hall.add(req.body.name, req.body.numberOfRows, req.body.seatsInRow);
        res.status(200).send(result);
    } catch(err) {
        if (err.code === UNIQUE_VIOLATION)
            res.status(412).send({msg: 'Wprowadzona sala już znajduje się w bazie danych.'});
        console.log(err);
        res.status(500).send({msg: 'Wystąpił błąd przez co dane nie zostały pomyślnie wprowadzone do bazy danych.'});
    }
}

exports.deleteHall = async (req, res) => {
    try {
        let result = await Hall.delete(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
}

exports.searchHall = async (req, res) => {
    try {
        let result = await Hall.search(req.query.name);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
}
