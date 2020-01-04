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
        res.status(500).send({msg: 'Wystąpił błąd przez co dane nie zostały pomyślnie wprowadzone do bazy danych.'});
    }
};

exports.searchDirector = async (req, res) => {
    try {
        let result = await Director.search(req.query.name, req.query.surname);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Błąd bazy danych.'});
    }
};

exports.deleteDirector = async (req, res) => {
    try {
        let result = await Director.delete(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Błąd bazy danych.'});
    }
};

exports.updateDirector = async (req, res) => {
    try {
        let result = await Director.update(req.body.id, req.body.name,
            req.body.surname, req.body.bday, req.body.description);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Błąd bazy danych.'});
    }
}

exports.getDirector = async (req, res) => {
    try {
        let result = await Director.get(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Błąd bazy danych.'});
    }
}