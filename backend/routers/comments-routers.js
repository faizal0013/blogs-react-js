const { Router } = require('express');

const commentsControllers = require('../controllers/comments-controllers');

const router = Router();

router.post('/comments', commentsControllers.addComments);

router.delete('/comments/:_id', commentsControllers.removeCommentById);

module.exports = router;
