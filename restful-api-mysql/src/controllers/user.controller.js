const jwt = require('jsonwebtoken');

const con = require('../db-config');
const jwtConfig = require('../jwt-config');
const userQueries = require('../queries/user.queries');

exports.getMe = function(req, res) {
    const token = req.headers['auth-token'];

    if (!token) {
        res.status(401).send({ auth: false, message: 'No token provided' });
    }

    jwt.verify(token, jwtConfig.secret, function(err, decoded) {
        if (err) {
            res.status(500).send({ auth: false, message: 'Failed to authenticate token' });
        }

        con.query(userQueries.GET_ME_BY_ID, [decoded.id], function(err, user) {
            if (err) {
                res.status(500).send({ message: 'Could not retrieve user' });
            }
            if (!user) {
                res.status(404).send({ message: 'User not found' });
            }
            res.status(200).send(user);
        });
    });
};