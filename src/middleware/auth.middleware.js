const {jwtconfig, verifyToken} = require('../utils/jwt-helpers');


module.exports = (req, res, next) => {
    const authHeader = req.headers['auth-token'] || req.headers['authorization'];
    const accessToken = authHeader.split(' ')[1];

    if (!accessToken) {
        res
            .status(401)
            .send({
                auth: false,
                msg: 'Access Denied'
            });
    }
    
    try {
        const person = verifyToken(accessToken, jwtconfig.access, req, res);
        req.person = person;
        next();
    } catch (err) {
        res.status(400).send({ msg: 'Invalid Token' });
    }
};