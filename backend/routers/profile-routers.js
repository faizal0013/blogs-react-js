const { Router } = require('express');

const profileControllers = require('../controllers/profile-controllers');

const router = Router();

//middlewares
const upload = require('../middlewares/uploads');

// get profile
router.post('/profile/:_id', profileControllers.getProfileDetail);

// new blog
router.post('/profile/newblog/:_id', upload.single('image'), profileControllers.postNewBlog);

// update blog get
router.get('/profile/updateblog/:slug', profileControllers.getUpdateDetailById);

// update blog put
router.put('/profile/updateblog/:_id', upload.single('image'), profileControllers.putUpdateDetailById);

// delete blog
router.delete('/profile/removeblog/:slug', profileControllers.removeBlogById);

module.exports = router;
