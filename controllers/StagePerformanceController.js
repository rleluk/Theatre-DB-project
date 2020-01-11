const StagePerformance = require('../models/StagePerformance');

exports.addStagePerformance = async (req, res) => {
    try {
        let startDate = new Date(...req.body.startDate.split('-'), ...req.body.startTime.split(':'));
        let endDate = new Date(...req.body.endDate.split('-'), ...req.body.endTime.split(':'));
        let result = await StagePerformance.add(req.body.performance_id, startDate, endDate, req.body.hall);
        res.status(200).send(result);
    } catch(err) {
        if(err.code === 'P0001') {
            res.status(409).send({msg: err.message})
        } else {
            console.log(err);
            res.status(500).send({msg: 'Coś poszło nie tak...'});
        }
    }
};

exports.searchStagePerformance = async (req, res) => {
    try {
        let result = await StagePerformance.search(req.query.startDate, req.query.endDate);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

exports.deleteStagePerformance = async (req, res) => {
    try {
        let result = await StagePerformance.delete(req.params.id);
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};

exports.getAllStagePerformances = async (req, res) => {
    try {
        let result = await StagePerformance.getAll();
        res.status(200).send(result);
    } catch(err) {
        console.log(err);
        res.status(500).send({msg: 'Coś poszło nie tak...'});
    }
};
