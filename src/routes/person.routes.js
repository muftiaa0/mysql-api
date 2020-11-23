const personController = require('../controllers/person.controller');
const authController = require('../controllers/auth.controller');
const express = require('express');
const verifyToken = require('../middleware/auth.middleware')

const personRoutes = express.Router();

personRoutes
    .get('/me', verifyToken, personController.getPerson)
    .post('/me/update', verifyToken, authController.updatePerson)
    .delete('/:person_id', personController.deletePerson);

module.exports = personRoutes;