const Director = require('../models/Director');

exports.director = (req, res) => {
    res.render('director-panel');
};

exports.addDirector = async (req, res) => {
    try {
        let result = await Director.add(req.body.name, req.body.surname, req.body.bday, req.body.description);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

exports.searchDirector = async (req, res) => {
    try {
        let result = await Director.search(req.query.name, req.query.surname);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

exports.deleteDirector = async (req, res) => {
    try {
        let result = await Director.delete(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

exports.updateDirector = async (req, res) => {
    try {
        let result = await Director.update(req.body.id, req.body.name,
            req.body.surname, req.body.bday, req.body.description);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
}

exports.getDirector = async (req, res) => {
    try {
        let result = await Director.get(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
}

exports.getAllDirectors = async (req, res) => {
    try {
        let result = await Director.getAll();
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
  };