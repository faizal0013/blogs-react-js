const { Router } = require('express');

const commentsControllers = require('../controllers/comments-controllers');

const router = Router();

router.post('/comments', commentsControllers.addComments);

router.get('/comments/:_id', commentsControllers.getCommentsOnBlogById);

module.exports = router;
