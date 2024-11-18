const jwt = require('jsonwebtoken');
const jwtConfig = require('../jwt-config');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.headers['auth-token'];

    if (!token) {
        res.status(401).send({ auth: false, msg: 'Access Denied'});
    }

    try {
        // return the user id when creating the token
        const verified = jwt.verify(token, jwtConfig.secret);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ auth: false, msg: 'Invalid Token' });
    }
};