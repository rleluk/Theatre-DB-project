const {Technician, Profession} = require('../models/Technician');
const {UNIQUE_VIOLATION, FOREIGN_KEY_VIOLATION} = require('pg-error-constants')

exports.technician = (req, res) => {
    res.render('technician-panel');
};

exports.addTechnician = async (req, res) => {
    try {
        let result = await Technician.add(req.body.name, req.body.surname, req.body.profession);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Wystąpił błąd przez co dane nie zostały pomyślnie wprowadzone do bazy danych.'});
    }
};

exports.searchTechnician = async (req, res) => {
    try {
        let result = await Technician.search(req.query.name, req.query.surname, req.query.profession);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Błąd bazy danych.'});
    }
};

exports.deleteTechnician = async (req, res) => {
    try {
        let result = await Technician.delete(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Błąd bazy danych.'});
    }
};

exports.getAllProfessions = async (req, res) => {
    try {
        let result = await Profession.getAll();
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Błąd bazy danych.'});
    }
};

exports.addProfession = async (req, res) => {
    try {
        let result = await Profession.add(req.body.name);
        res.status(200).send(result);
    } catch(err) {
        if (err.code === UNIQUE_VIOLATION)
            res.status(412).send({msg: 'Wprowadzona profesja już znajduje się w bazie danych.'});
        else {
            console.log(err);
            res.status(500).send({msg: 'Błąd bazy danych.'});
        }
    }
};

exports.deleteProfession = async (req, res) => {
    try {
        let result = await Profession.delete(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        if(err.code === FOREIGN_KEY_VIOLATION)
            res.status(409).send({msg: 'Wybrana profesja ma wciąż odwołanie w tabeli "Technik teatralny".'});
        else {
            console.log(err);
            res.status(500).send({msg: 'Błąd bazy danych.'});
        }
    }
};