const { Router } = require('express');

const controllers = require('../controllers/controllers');

const router = Router();

router.get('/', controllers.getLetestPostsController);

router.get('/blogs', controllers.getAllPostsController);

router.get('/blog/:_id', controllers.getBlogsById);

module.exports = router;
