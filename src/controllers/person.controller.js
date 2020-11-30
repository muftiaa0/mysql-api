const bcrypt = require('bcryptjs');
const query = require('../utils/query.js');
const connection = require('../config.js');
const { DELETE_PERSON, GET_PERSON_FROM_USERNAME } = require('../queries/person.queries');
const { GET_AUTH, UPDATE_PASSWORD} = require('../queries/auth.queries');


exports.getPerson = async (req, res) => {
    const person = req.person;
    console.log(person);
    if (person.id) {
        const con = await connection().catch((err) => {
            throw err;
        });

        console.log(person);
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

        console.log(retrievedAuth);
        
        if (!! retrievedAuth.length) {
            const updatePassword = await query(con, UPDATE_PASSWORD, [passwordHash, person.id]).catch(
                (err) => {
                    res.status(500).json({ msg: 'Failed to update password.' });
                }
            );

            console.log(updatePassword);
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

exports.deletePerson = function(req, res) {
    con.query(DELETE_PERSON, [req.params.person_id], function(err, result, fields) {
        if (err) {                      
            res.send(err);
        }
        res.json({ message: 'Person deleted Successfully.' });
    });
}