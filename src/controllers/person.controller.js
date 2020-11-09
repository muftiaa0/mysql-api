const con = require('../config.js');
const queries = require('../queries/person.queries');

exports.getPerson = function(req, res) { // localhost:3000/persons/3
    con.query(queries.GET_PERSON, [req.params.personID], function(err, result, fields) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

exports.getAllPersons = function(req, res) {
    con.query(queries.GET_ALL_PERSONS, function(err, result, fields) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

exports.updatePerson = function(req, res) {
    con.query(queries.UPDATE_PERSON, [req.body.LastName, req.body.FirstName, req.params.personID], function(err, result, fields) {
        if (err) {                      
            res.send(err);
        }
        res.json({ message: 'Person updated successfully.' });;
    });
};

exports.createPerson = function(req, res) {
    con.query(queries.CREATE_PERSON, [req.body.LastName, req.body.FirstName, req.body.username], function(err, result, fields) {
        if (err) {                      
            res.send(err);
        }
        res.json({ message: 'Person created successfully.' });;
    });
}

exports.deletePerson = function(req, res) {
    con.query(queries.DELETE_PERSON, [req.params.personID], function(err, result, fields) {
        if (err) {                      
            res.send(err);
        }
        res.json({ message: 'Person deleted Successfully.' });
    });
}