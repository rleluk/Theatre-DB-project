const Actor = require('../models/Actor');

exports.actor = (req, res) => {
    res.render('actor-panel');
};

exports.addActor = async (req, res) => {
    try {
        let result = await Actor.add(req.body.name, req.body.surname, req.body.bday);
        res.send(result);
    } catch(err) {
        console.log(err);
        res.status(400).send({msg: 'Wystąpił błąd przez co dane nie zostały pomyślnie wprowadzone do bazy danych.'});
    }
};

exports.searchActor = async (req, res) => {
    try {
        let result = await Actor.search(req.query.name, req.query.surname);
        res.send(result);
    } catch(err) {
        console.log("Błąd bazy danych.", err);
        res.status(400).send("Błąd bazy danych.");
    }
};

exports.deleteActor = async (req, res) => {
    try {
        let result = await Actor.delete(req.params.id);
        res.send(result);
    } catch(err) {
        console.log("Błąd bazy danych.", err);
        res.status(400).send("Błąd bazy danych.");
    }
};

// exports.deleteActor = async (req, res) => {
//     Actor.delete(req.params.id)
//         .then(result => res.send(result))
//         .catch(err => {
//             console.log("Błąd bazy danych.", err);
//             res.status(400).send("Błąd bazy danych.");
//         });
// };
