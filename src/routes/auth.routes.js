const controllers = require('../controllers/auth.controller.js');
const express = require('express');

const authRoutes = express.Router();

authRoutes
    .post('/createPerson', controllers.createPerson)
    .post('/login', controllers.login)

module.exports = authRoutes;