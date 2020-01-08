const {Performance, Genre} = require('../models/Performance');
const {UNIQUE_VIOLATION, FOREIGN_KEY_VIOLATION} = require('pg-error-constants')

exports.performance = (req, res) => {
    res.render('performance-panel');
}

exports.getAllGenres = async (req, res) => {
    try {
        let result = await Genre.getAll();
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Błąd bazy danych.'});
    }
};

exports.addGenre = async (req, res) => {
    try {
        let result = await Genre.add(req.body.name);
        res.status(200).send(result);
    } catch(err) {
        if (err.code === UNIQUE_VIOLATION)
            res.status(412).send({msg: 'Wprowadzony gatunek już znajduje się w bazie danych.'});
        else {
            console.log(err);
            res.status(500).send({msg: 'Błąd bazy danych.'});
        }
    }
};

exports.deleteGenre = async (req, res) => {
    try {
        let result = await Genre.delete(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        if(err.code === FOREIGN_KEY_VIOLATION)
            res.status(409).send({msg: 'Wybrany gatunek ma wciąż odwołanie w tabeli "Spektakl".'});
        else {
            console.log(err);
            res.status(500).send({msg: 'Błąd bazy danych.'});
        }
    }
};

exports.addPerformance = async (req, res) => {
    try {
        let result = await Performance.add(req.body.description, req.body.title, req.body.genre_name, req.body.director_id, req.body.scriptwriter_id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Błąd bazy danych.'});
    }
};

exports.deletePerformance = async (req, res) => {
    try {
        let result = await Performance.delete(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        if(err.code === FOREIGN_KEY_VIOLATION)
            res.status(409).send({msg: 'Wybrany spektakl ma wciąż odwołanie w innych tabelach'});
        else {
            console.log(err);
            res.status(500).send({msg: 'Błąd bazy danych.'});
        }
    }
};