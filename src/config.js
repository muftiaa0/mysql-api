// Database info
const mysql = require('mysql');
const { CREATE_PERSON_TABLE } = require('./queries/person.queries');
const { CREATE_AUTH_TABLE } = require('./queries/auth.queries');
const query = require('./utils/query');
const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PW || 'password';
const database = process.env.DB_NAME || 'week3';


const connection = async () =>
    new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host,
            user,
            password,
            database,
        });

        con.connect((err) => {
            if (err) {
                reject(err);
                return;
            }
        });

        resolve(con);
    });

// Create the connection with required details
(async () => {
    const _con = await connection().catch((err) => {
        throw err;
    });

    const personTableCreated = await query(_con, CREATE_PERSON_TABLE).catch(
        (err) => {
            console.log(err);
            
        }
    );

    const authTableCreated = await query(_con, CREATE_AUTH_TABLE).catch(
        (err) => {
            console.log(err);
        }
    );

    if (!!personTableCreated && !!authTableCreated) {
        console.log('Both AUTH and PERSON Tables Created!');
    }
})();

module.exports = connection;