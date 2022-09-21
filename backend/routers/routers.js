const { Router } = require('express');

const controllers = require('../controllers/controllers');

//middlewares
const upload = require('../middlewares/uploads');

const router = Router();

router.get('/', controllers.getLetestPostsController);

router.get('/blogs', controllers.getAllPostsController);

router.get('/blog/:_id', controllers.getBlogsById);

// get profile
router.post('/profile/:_id', controllers.getProfileDetail);

// new blog
router.post('/profile/newblog/:_id', upload.single('image'), controllers.postNewBlog);

// update blog get
router.get('/profile/updateblog/:_id', controllers.getUpdateDetailById);

// update blog put
router.put('/profile/updateblog/:_id', upload.single('image'), controllers.putUpdateDetailById);

// delete blog
router.delete('/profile/removeblog/:_id', controllers.removeBlogById);

module.exports = router;
