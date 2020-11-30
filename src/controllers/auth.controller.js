// package imports 
const bcrypt = require('bcryptjs');
const {NEW_AUTH, GET_AUTH } = require('../queries/auth.queries');
const {CREATE_PERSON, GET_PERSON_FROM_USERNAME } = require('../queries/person.queries');

const query = require('../utils/query.js');
const { refreshTokens, generateRefreshToken, generateAccessToken } = require('../utils/jwt-helpers');
const connection = require('../config.js');

exports.createPerson = async (req, res) => {
    // hash password for use
    const passwordHash = bcrypt.hashSync(req.body.password);

    const con = await connection().catch((err) => {
        throw err;
    });


    // the new person and newauth queries can happen at the same time independently but we want to make sure they occur before we retrieve the new person.
    const newPerson = await query(con, CREATE_PERSON, [req.body.last_name, req.body.first_name, req.body.username]).catch(
        (err) => {
            res.status(500);
            res.send({
                msg: 'Could not create person because this username exists already'
            });
        }
    );

    const newAuth = await query(con, NEW_AUTH, [req.body.username, passwordHash]).catch(
        (err) => {
            res.status(500);
            res.send({
                msg: 'Could not create authentication information.'
            });
        }
    );

    if (newPerson.affectedRows >= 1 && newAuth.affectedRows >= 1) {
        const newPerson = await query(con, GET_PERSON_FROM_USERNAME, [req.body.username]).catch(
            (err) => {
                res.status(500);
                res.send({
                    msg: 'Could not retrieve the person created.'
                });
            }
        );
        res.send({ newPerson, msg: 'Created new account!' });
    } else {
        res.send({
            msg: 'New Person was not created successfully.'
        });
    }
}

exports.login = async (req, res) => {
    const con = await connection().catch((err) => {
        throw err;
    });

    // does this username exist in the auth table?
    const auth = await query(con, GET_AUTH, [req.body.username]).catch(
        (err) => {
            res.status(500);
            res.send({
                msg: 'Username does not exist. Please create a new person.'
            });
        }
    );

    console.log(auth);
    if (auth.length < 1) {
        res.status(403).send({
            msg: 'Username does not exist.'
        });
    } else {
        const validPassword = await bcrypt
            .compare(req.body.password, auth[0].password)
            .catch((err) => {
                res.json(500).json({
                    msg: 'Invalid Password'
                });
            });

        if (!validPassword) {
            res.status(403).send({
                 msg: 'Invalid password'
                 });
        } else {
            const person = await query(con, GET_PERSON_FROM_USERNAME, [req.body.username]).catch(
                (err) => {
                    res.status(500);
                    res.send({
                        msg: 'Person does not exist. Please create a new person.'
                    });
                }
            );

            const accessToken = generateAccessToken(person[0].username, { expiresIn: 86400 });
            const refreshToken = generateRefreshToken(person[0].username, { expiresIn: 86400 });
            refreshTokens.push(refreshToken);
            
            res
                .header('access_token', accessToken)
                .json({ auth: true, 
                        msg: 'Logged in!',
                        token_type: 'bearer',
                        access_token: accessToken,
                        expires_in: 86400,
                        refresh_token: refreshToken,
                     });
        }
    }
};

exports.token = (req, res) => {
    const refreshToken = req.body.token;

    if (!refreshToken) {
        res
            .status(401)
            .send({
                auth: false,
                msg: 'Access Denied. No token provided'
            });
    }
    if (!refreshTokens.includes(refreshToken)) {
        res
        .status(403)
        .send({
            msg: 'Invalid refresh token.'
        });
    }

    const verified = verifyToken(refreshToken, jwtconfig.refresh, req, res);

    if (verified) {
        const accessToken = generateToken(person[0].username, { expiresIn: 86400 });
        res
            .header('access_token', accessToken)
            .json({
                auth: true,
                msg: 'Logged in!',
                token_type: 'bearer',
                access_token: accessToken,
                expires_in: 86400,
                refresh_token: refreshToken,
            });
        res
            .status(403)
            .send({
                msg: 'Invalid Token'
            });
    }  
}

exports.logout = (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
    res.json({
        msg: 'Logout Successful.'
    });
}




