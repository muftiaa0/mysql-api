const { getPerson, deletePerson, updatePassword, updatePerson } = require('../controllers/person.controller');
const express = require('express');
const canAccess = require('../middleware/auth.middleware')

const personRoutes = express.Router();

personRoutes
    .get('/me', canAccess, getPerson)
    .put('/me/updatePassword', canAccess, updatePassword)
    .delete('/me/delete', canAccess, deletePerson)
    .put('/me/updatePerson', canAccess, updatePerson);

module.exports = personRoutes;