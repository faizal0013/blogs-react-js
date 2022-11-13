const { Router } = require('express');

const tagsContainer = require('../controllers/tags-controllers');

const router = Router();

router.get('/tags', tagsContainer.getAllTags);

router.get('/filter_tag', tagsContainer.getFilterTag);

module.exports = router;
