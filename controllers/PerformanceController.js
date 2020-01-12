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
        res.status(500).send({msg: 'Coś poszło nie tak...'});
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
            res.status(500).send({msg: 'Coś poszło nie tak...'});
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
            res.status(500).send({msg: 'Coś poszło nie tak...'});
        }
    }
};

exports.searchPerformance = async (req, res) => {
    try {
      let result = await Performance.search(req.query.title, req.query.genre,
         req.query.director_name, req.query.director_surname, req.query.scriptwriter_name, req.query.scriptwriter_surname);
      res.status(200).send(result);
    } catch(err) {
      console.log(err);
      res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

exports.addPerformance = async (req, res) => {
    try {
        let description = (req.body.description === '') ? 'Brak opisu spektaklu.' : req.body.description;
        let result = await Performance.add(description, req.body.title, 
            req.body.genre, req.body.director_id, req.body.scriptwriter_id);
        res.status(200).send(result);
    } catch(err) {
        if(err.code === 'P0001') {
            res.status(409).send({msg: err.message});
        } else {
            console.log(err);
            res.status(500).send({msg: 'Coś poszło nie tak...'});
        }
    }
};

exports.updatePerformance = async (req, res) => {
    try {
        let result = await Performance.update(req.body.performance_id, req.body.description, 
            req.body.title, req.body.genre, req.body.director_id, req.body.scriptwriter_id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

exports.deletePerformance = async (req, res) => {
    try {
        let result = await Performance.delete(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

exports.getPerformance = async (req, res) => {
    try {
        let result = await Performance.get(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

exports.addTechnician = async (req, res) => {
    try {
        let result = await Performance.addTechnician(req.body.performance_id, req.body.technician_id);
        res.status(200).send(result);
    } catch(err) {
        if(err.code == UNIQUE_VIOLATION) 
            res.status(409).send({msg: 'Wybrany technik już jest przypisany do tego spektaklu.'});
        else {
            console.log(err);
            res.status(500).send({msg: 'Coś poszło nie tak...'});
        }
    }
};

exports.deleteTechnician = async (req, res) => {
    try {
        let result = await Performance.deleteTechnician(req.query.performance_id, req.query.technician_id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
}

exports.getTechnicians = async (req, res) => {
    try {
        let result = await Performance.getTechnicians(req.params.performance_id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
}


