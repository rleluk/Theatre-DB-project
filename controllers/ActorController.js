const Actor = require('../models/Actor');

exports.actor = (req, res) => {
    res.render('actor-panel');
};

exports.addActor = async (req, res) => {
    try {
        let result = await Actor.add(req.body.name, req.body.surname, req.body.bday);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

exports.searchActor = async (req, res) => {
    try {
        let result = await Actor.search(req.query.name, req.query.surname);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

exports.deleteActor = async (req, res) => {
    try {
        let result = await Actor.delete(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};
