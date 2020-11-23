// package imports 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const con = require('../config.js');
const jwtConfig = require('../jwt-config.js');
const authQueries = require('../queries/auth.queries');
const personQueries = require('../queries/person.queries');

exports.createPerson = function(req, res) {
    con.query(personQueries.CREATE_PERSON, [req.body.last_name, req.body.first_name, req.body.username], function(err) {
        if (err) {      
            res.status(500);                
            res.send({msg: "Failed to create person."});
        }

        // hash password for use
        const passwordHash = bcrypt.hashSync(req.body.password);
        con.query(authQueries.NEW_AUTH, [req.body.username, passwordHash], function (err, result, fields) {
            if (err) {
                res
                    .status(500)
                    .send({ msg: "Failed to create person." });
            }

        });
        con.query(personQueries.GET_PERSON_FROM_USERNAME, [req.body.username], function (err, person) {
            console.log(person);
            res.send(person);
        });
    });
}

exports.login = function(req, res) {
    // does this username exist in the auth table?
    con.query(authQueries.GET_AUTH, [req.body.username], function(err, auth) {
            if (err) {
                res.status(500);
                res.send({ msg: 'Person does not exist. Please create a new user.'});
            }
            console.log(auth);

            bcrypt
                .compare(req.body.password, auth[0].password)
                .then(function (validPassword) {
                    if (!validPassword) {
                        res.status(403).send({ msg: 'Invalid password' });
                    }

                    con.query(personQueries.GET_PERSON_FROM_USERNAME, [req.body.username], function (err, person) {
                        console.debug(person);
                        const token = jwt.sign({ id: person[0].person_id }, jwtConfig.secret);
                        if (err) {
                            res.status(500);
                            res.send({ msg: 'Critical services are down at this time. Please try again later.' })
                        }
                        res
                            .header('auth-token', token)
                            .send({ auth: true, person, msg: 'Logged in!' })

                    })

                })
                .catch(console.log());
        });
}


// this method can be updated so that the username is no longer needed. We can potentially sign the token with the username as well making it easier to link between the two db tables
exports.updatePerson = function (req, res) {
    // does this username exist in the auth table?
    con.query(authQueries.GET_AUTH, [req.body.username], function (err, auth) {
            if (err) {
                res.status(500);
                res.send({ msg: 'Person does not exist. Please create a new user.' });
            }
            console.log(auth);

            const passwordHash = bcrypt.hashSync(req.body.password);

            con.query(
                authQueries.UPDATE_PASSWORD, [passwordHash, req.body.username], function (err, res) {
                    if (err) {
                        console.log(err);
                        res.status(500)
                        res.send({ msg: 'Could not update user password.' });
                    }
                })
                res.send({ msg: 'User updated successfully!' });
        });
};

