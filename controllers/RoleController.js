const Role = require('../models/Role');
const {UNIQUE_VIOLATION, FOREIGN_KEY_VIOLATION} = require('pg-error-constants');

exports.addRole = async (req, res) => {
    try {
        let result = await Role.add(req.body.name, req.body.performance_id, req.body.actor_id);
        res.status(200).send(result);
    } catch(err) {
        if(err.code == FOREIGN_KEY_VIOLATION) {
            res.status(409).send({msg: 'Nie istnieje aktor o takim id.'});
        } else {
            console.log(err);
            res.status(500).send({msg: 'Coś poszło nie tak...'});
        }
    }
};

exports.getRoles = async (req, res) => {
    try {
        let result = await Role.get(req.params.performance_id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

exports.deleteRole = async (req, res) => {
    try {
        let result = await Role.delete(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

