const express = require('express');
const {
    createPerson,
    login,
    logout,
} = require('../controllers/auth.controller.js');

const authRoutes = express.Router();

authRoutes
    .post('/createPerson', createPerson)
    .post('/login', login)
    .post('/logout', logout)

module.exports = authRoutes;