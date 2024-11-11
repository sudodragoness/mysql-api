const controllers = require('../controllers/social.controller');
const express = require('express');

const socialRoutes = express.Router();

socialRoutes
    .get('/', controllers.getAllSocialMediaAccounts)
    .post('/', controllers.createSocialMediaAccount);

// Routes for social media account by id - Evaluates to '/accounts/:socialMediaAccountId'
socialRoutes
    .route('/:accounts')
    .get(controllers.getSocialMediaAccountByUsername)
    .put(controllers.updateSocialMediaAccount)
    .delete(controllers.deleteSocialMediaAccount);

module.exports = socialRoutes;
