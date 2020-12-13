const bcrypt = require('bcryptjs');
const query = require('../utils/query.js');
const connection = require('../config.js');
const { DELETE_PERSON, GET_PERSON_FROM_USERNAME, UPDATE_PERSON_FIRST_NAME, UPDATE_PERSON_LAST_NAME } = require('../queries/person.queries');
const { GET_AUTH, UPDATE_PASSWORD, DELETE_AUTH } = require('../queries/auth.queries');


exports.getPerson = async (req, res) => {
    const person = req.person;
    if (person.id) {
        const con = await connection().catch((err) => {
            throw err;
        });

        const retrievedPerson = await query(con, GET_PERSON_FROM_USERNAME, [person.id]).catch(
            (err) => {
                res.status(500).json({ msg: 'Could not retrieve person at this time.' });
            }
        );

        if (retrievedPerson.length) {
            res.status(200).send(retrievedPerson);
        } else {
            res.status(400).json({ msg: 'Could not retrieve person at this time.' });
        }
    }
};

exports.updatePassword = async (req, res) => {
    const person = req.person;
    const passwordHash = bcrypt.hashSync(req.body.password);

    if (person.id) {
        const con = await connection().catch((err) => {
            throw err;
        });

        // does this username exist in the auth table?
        const retrievedAuth = await query(con, GET_AUTH, [person.id]).catch(
            (err) => {
                res.status(500).json({ msg: 'Could not retrieve authentication information at this time.' });
            }
        );


        if (!!retrievedAuth.length) {
            const updatePassword = await query(con, UPDATE_PASSWORD, [passwordHash, person.id]).catch(
                (err) => {
                    res.status(500).json({ msg: 'Failed to update password.' });
                }
            );

            if (!updatePassword.length) {
                res.send({ msg: 'User updated successfully!' });
            } else {
                res.status(500).json({ msg: 'Failed to update password 1' });
            }
        } else {
            res.status(500).json({ msg: 'Failed to update password 2' });
        }
    }
};

exports.deletePerson = async (req, res) => {
    const person = req.person;
    if (person.id) {
        const con = await connection().catch((err) => {
            throw err;
        });

        const deleteAuth = await query(con, DELETE_AUTH, [person.id]).catch(
            (err) => {
                res.status(500).json({ msg: 'Failed to delete auth for this person.' });
            }
        );

        const deletePerson = await query(con, DELETE_PERSON, [person.id]).catch(
            (err) => {
                res.status(500).json({ msg: 'Failed to delete person.' });
            }
        );

        if (!!deletePerson.affectedRows > 0 && deleteAuth.affectedRows > 0) {
            res.send({ msg: 'Deleted person successfully.' })
        } else {
            res.status(500).json({ msg: 'Person already deleted.' })
        }
    }
}

exports.updatePerson = async (req, res) => {
    const person = req.person;
    if (person.id) {
        const con = await connection().catch((err) => {
            throw err;
        });

        if (req.body.last_name.length == 0 && req.body.first_name.length == 0) {
            res.status(500).json({ msg: 'Must update at least one value' });
        } else {

        if (req.body.first_name.length != 0) {
            const updatedFirst = await query(con, UPDATE_PERSON_FIRST_NAME, [req.body.first_name, person.id]).catch(
                (err) => {
                    res.status(500).json({ msg: 'Could not update the first name.'});
                }
            );
        }

        if (req.body.last_name.length != 0) {
            const updatedLast = await query(con, UPDATE_PERSON_LAST_NAME, [req.body.last_name, person.id]).catch(
                (err) => {
                    res.status(500).json({ msg: 'Could not update the last name.'});
                }
            );
        }

        res.status(200).json({ msg: 'Username successfully updated.'});
    }
}
}