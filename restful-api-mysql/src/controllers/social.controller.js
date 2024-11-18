
const con = require('../db-config');
const queries = require('../queries/social.queries');

// Get all social media accounts
exports.getAllSocialMediaAccounts = (req, res) => {
    con.query(queries.getAllSocialMediaAccounts, (err, rows) => {
        if (err) {
            res.status(404).send({ message: 'No social media accounts found' });
        } else {
            res.status(200).send(rows);
        }
    });
};

// Get a social media account by id
exports.getSocialMediaAccountById = (req, res) => {
    con.query(queries.getSocialMediaAccountById, req.params.id, (err, rows) => {
        if (err) {
            res.status(404).send({ message: 'No social media account found with id ' + req.params.id });
        } else {
            res.status(200).send(rows);
        }
    });
};

// Get a social media account by username
exports.getSocialMediaAccountByUsername = (req, res) => {
    con.query(queries.getSocialMediaAccountByUsername, req.params.username, (err, rows) => {
        if (err) {
            res.status(404).send({ message: 'No social media account found with username ' + req.params.username });
        } else {
            res.status(200).send(rows);
        }
    });
};

// Add a new social media account
exports.createSocialMediaAccount = (req, res) => {
    con.query(queries.createSocialMediaAccount, [req.body.platform, req.body.username, req.body.url], (err, results) => {
        if (err) {
            res.status(500).send({ message: 'Error creating social media account' });
        } else {
            res.status(201).send({ message: 'Social media account created successfully', accountId: results.insertId });
        }
    });
};

// Update a social media account
exports.updateSocialMediaAccount = (req, res) => {
    con.query(queries.updateSocialMediaAccount, [req.body.platform, req.body.username, req.body.url, req.params.id], (err, results) => {
        if (err) {
            res.status(500).send({ message: 'Error updating social media account' });
        } else {
            res.status(200).send({ message: 'Social media account updated successfully' });
        }
    });
};

// Delete a social media account
exports.deleteSocialMediaAccount = (req, res) => {
    con.query(queries.deleteSocialMediaAccount, req.params.id, (err, results) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting social media account' });
        } else {
            res.status(200).send({ message: 'Social media account deleted successfully' });
        }
    });
};  
