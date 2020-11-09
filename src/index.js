const express = require('express');
const port = process.env.PORT || 3000;

const personRoutes = require('./routes/person.routes');
const middleware = require('./middleware/errors.middleware');

// using Morgan's Logger
const logger = require('morgan');
const logLevel = process.env.LOG_LEVEL || 'dev';

const bodyParser = require('body-parser');

const app = express(); // startup

// setup basic logging
app.use(logger(logLevel));

// setup parsing of incoming requests
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// handle person route
app.use('/person', personRoutes);

// handle bad HTTP response codes
app.use(middleware.error404);
app.use(middleware.error500);


app.listen(port, function() {
    console.log('Server started successfully at http://localhost:%s', port);
});