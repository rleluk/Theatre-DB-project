const Scriptwriter = require('../models/Scriptwriter');
const {UNIQUE_VIOLATION, FOREIGN_KEY_VIOLATION} = require('pg-error-constants');

exports.scriptwriter = (req, res) => {
    res.render('scriptwriter-panel');
};
  
exports.addScriptwriter = async (req, res) => {
    try {
      let result = await Scriptwriter.add(req.body.name, req.body.surname, req.body.bday, req.body.description);
      res.status(200).send(result);
    } catch(err) {
      console.log(err);
      res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};
  
exports.searchScriptwriter = async (req, res) => {
    try {
      let result = await Scriptwriter.search(req.query.name, req.query.surname);
      res.status(200).send(result);
    } catch(err) {
      console.log(err);
      res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};
  
exports.deleteScriptwriter = async (req, res) => {
    try {
      let result = await Scriptwriter.delete(req.params.id);
      res.status(200).send(result);
    } catch(err) {
      if(err.code === FOREIGN_KEY_VIOLATION)
            res.status(409).send({msg: 'Wybrany scenarzysta ma wciąż odwołanie w tabeli "Spektakl".'});
      else {
          console.log(err);
          res.status(500).send({msg: 'Coś poszło nie tak...'});
      }
    }
};
  
exports.updateScriptwriter = async (req, res) => {
    try {
      let result = await Scriptwriter.update(req.body.id, req.body.name,
        req.body.surname, req.body.bday, req.body.description);
      res.status(200).send(result);
    } catch(err) {
      console.log(err);
      res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
}
  
exports.getScriptwriter = async (req, res) => {
    try {
      let result = await Scriptwriter.get(req.params.id);
      res.status(200).send(result);
    } catch(err) {
      console.log(err);
      res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
}

exports.getAllScriptwriters = async (req, res) => {
  try {
      let result = await Scriptwriter.getAll();
      res.status(200).send(result);
  } catch(err) {
      console.log(err);
      res.status(500).send({msg: 'Coś poszło nie tak...'});
  }
};

