const { Router } = require('express');

const commentsControllers = require('../controllers/comments-controllers');

const router = Router();

router.post('/comments', commentsControllers.addComments);

module.exports = router;
