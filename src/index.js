const express = require('express');
const port = process.env.PORT || 3000;

const personRoutes = require('./routes/person.routes');
const authRoutes = require('./routes/auth.routes')
const {error404, error500} = require('./middleware/errors.middleware');

// using Morgan's Logger
const logger = require('morgan');
const logLevel = process.env.LOG_LEVEL || 'dev';

const bodyParser = require('body-parser');

const app = express(); // startup

// CORS
var cors = require('cors');
app.use(cors());

// setup basic logging
app.use(logger(logLevel));

// setup parsing of incoming requests
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// routing
app.use('/api/person', personRoutes);
app.use('/api/auth', authRoutes);

// handle bad HTTP response codes
app.use(error404);
app.use(error500);


app.listen(port, function() {
    console.log('Server started successfully at http://localhost:%s', port);
});