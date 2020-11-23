const jwt = require('jsonwebtoken');
const jwtconfig = require('../jwt-config');

const con = require('../config.js');
const personQueries = require('../queries/person.queries');


exports.getPerson = function (req, res) {
    const token = req.headers['auth-token'];
    if (!token) {
        res.status(401).send({ auth: false, msg: 'No token provided.' });
    }

    jwt.verify(token, jwtconfig.secret, function(err, decoded) {
        if (err) {
            res
                .status(500)
                .send({ auth: false, message: 'Failed to authenticate token.' });
        }
        con.query(personQueries.GET_PERSON, [decoded.id], function (err, person) {
            if (err) {
                res.status(500).send({ msg: 'Could not find person.' });
            }
            if (!person) {
                res.status(400).send({ msg: 'No person found' })

            }
            console.log(person);
            res.json(person);
        });
    });
}


exports.updatePerson = function(req, res) {
    con.query(personQueries.UPDATE_PERSON, [req.body.last_name, req.body.first_name, req.params.person_id], function(err, result, fields) {
        if (err) {                      
            res.send(err);
        }
        res.json({ message: 'Person updated successfully.' });;
    });
}

exports.deletePerson = function(req, res) {
    con.query(personQueries.DELETE_PERSON, [req.params.person_id], function(err, result, fields) {
        if (err) {                      
            res.send(err);
        }
        res.json({ message: 'Person deleted Successfully.' });
    });
}