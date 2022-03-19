const express = require('express');
const viewController = require('../controllers/viewControllers');

const viewRouter = express.Router();

// generic routes
viewRouter.get('/about', viewController.about);
viewRouter.get('/privacy', viewController.privacy);
viewRouter.get('/contact', viewController.contact);
viewRouter.get('/similar-projects', viewController.similarProjects);
viewRouter.get('/', viewController.overview);

// routes identical to imdb
viewRouter.get('/title/:title', viewController.movie);
// viewRouter.get('/search/title/', viewController.searchGenres);

module.exports = viewRouter;
