const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {isUser, validateUserAuth, isAuthenticated} = require('../middlewares/authValidator');

router.post('/signup', isUser,  userController.userSignIn);
router.post('/login', validateUserAuth, userController.userLogIn);
router.get('/user', isAuthenticated, userController.getUser);
router.post('/borrow', isAuthenticated, userController.borrowMoney);
module.exports = router;