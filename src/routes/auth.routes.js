const express = require('express');
const {
    createPerson,
    login,
} = require('../controllers/auth.controller.js');

const authRoutes = express.Router();

authRoutes
    .post('/createPerson', createPerson)
    .post('/login', login)

module.exports = authRoutes;