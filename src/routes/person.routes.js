const controllers = require('../controllers/person.controller');
const express = require('express');

const personRoutes = express.Router();

personRoutes
    .get('/', controllers.getAllPersons)
    .post('/', controllers.createPerson);

personRoutes
    .get('/:personID', controllers.getPerson)
    .put('/:personID', controllers.updatePerson)
    .delete('/:personID', controllers.deletePerson);

module.exports = personRoutes;