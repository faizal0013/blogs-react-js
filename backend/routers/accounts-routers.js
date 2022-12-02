const { Router } = require('express');

const accountsControllers = require('../controllers/accounts-controllers');

const router = Router();

// signin route
router.post('/signin', accountsControllers.signinController);

// signup route
router.post('/signup', accountsControllers.signupController);

router.post('/forgot', accountsControllers.forgotController);

router.put('/forgot/:token', accountsControllers.putForgotController);

module.exports = router;
