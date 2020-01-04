const Scriptwriter = require('../models/Scriptwriter');

exports.scriptwriter = (req, res) => {
    res.render('scriptwriter-panel');
};
  
exports.addScriptwriter = async (req, res) => {
    try {
      let result = await Scriptwriter.add(req.body.name, req.body.surname, req.body.bday, req.body.description);
      res.status(200).send(result);
    } catch(err) {
      console.log(err);
      res.status(500).send({msg: 'Wystąpił błąd przez co dane nie zostały pomyślnie wprowadzone do bazy danych.'});
    }
};
  
exports.searchScriptwriter = async (req, res) => {
    try {
      let result = await Scriptwriter.search(req.query.name, req.query.surname);
      res.status(200).send(result);
    } catch(err) {
      console.log(err);
      res.status(500).send({msg: 'Błąd bazy danych.'});
    }
};
  
exports.deleteScriptwriter = async (req, res) => {
    try {
      let result = await Scriptwriter.delete(req.params.id);
      res.status(200).send(result);
    } catch(err) {
      console.log(err);
      res.status(500).send({msg: 'Błąd bazy danych.'});
    }
};
  
exports.updateScriptwriter = async (req, res) => {
    try {
      let result = await Scriptwriter.update(req.body.id, req.body.name,
        req.body.surname, req.body.bday, req.body.description);
      res.status(200).send(result);
    } catch(err) {
      console.log(err);
      res.status(500).send({msg: 'Błąd bazy danych.'});
    }
}
  
exports.getScriptwriter = async (req, res) => {
    try {
      let result = await Scriptwriter.get(req.params.id);
      res.status(200).send(result);
    } catch(err) {
      console.log(err);
      res.status(500).send({msg: 'Błąd bazy danych.'});
    }
}