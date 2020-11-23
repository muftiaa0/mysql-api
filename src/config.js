// Database info
const mysql = require('mysql');
const queries = require('./queries/person.queries');
const authQueries = require('./queries/auth.queries')
const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PW || 'password';
const database = process.env.DB_NAME || 'week3';

// Database connection string
const con = mysql.createConnection({
    host, user, password, database
});

// Make connection to DB
con.connect(function(err) {
    if (err) throw err;
    console.log('Successfully Connected to Database');

    // create person table
    con.query(queries.CREATE_PERSON_TABLE, function(err, results) {
        if (err) {
            console.log('Failed to create table. Person table already exists')
        } else {
            console.log('Person table created successfully');
        }
    });

    con.query(queries.CONSTRAINT_PERSON_TABLE, function(err, results) {
        if (err) {
            console.log('Person unique constraint already exists')
        } else {
            console.log('Constraint added successfully');
        }
    });
    
    // create auth table
    con.query(authQueries.CREATE_AUTH_TABLE, function(err, results) {
        if (err) {
            console.log('Failed to create table. Authentication table already exists') 
        } else {
            console.log('Authentication table created successfully.');
        } 
    });

    con.query(authQueries.CONSTRAINT_AUTH_TABLE, function(err, results) {
        if (err) {
            console.log('Auth unique constraint already exists')
        } else {
            console.log('Constraint added successfully');
        }
    });
});

module.exports = con;