const socialController = require('../controllers/social.controller');
const express = require('express');

const socialRoutes = express.Router();

socialRoutes
    .get('/', socialController.getAllSocialMediaAccounts)
    .post('/', socialController.createSocialMediaAccount);

// Routes for social media account by id - Evaluates to '/accounts/:socialMediaAccountId'
socialRoutes
    .route('/:accounts')
    .get(socialController.getSocialMediaAccountByUsername)
    .put(socialController.updateSocialMediaAccount)
    .delete(socialController.deleteSocialMediaAccount);

module.exports = socialRoutes;