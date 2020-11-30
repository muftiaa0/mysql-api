const { getPerson, deletePerson, updatePassword } = require('../controllers/person.controller');
const express = require('express');
const canAccess = require('../middleware/auth.middleware')

const personRoutes = express.Router();

personRoutes
    .get('/me', canAccess, getPerson)
    .post('/me/updatePassword', canAccess, updatePassword)
    .delete('/:person_id', deletePerson);

module.exports = personRoutes;