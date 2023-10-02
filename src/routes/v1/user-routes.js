const express = require('express');
const { UserController } = require('../../controllers');
const router = express.Router();
const { AuthRequestMiddlewares} = require('../../middlewares')

// api/v1/user/signup POST 
router.post('/signup',AuthRequestMiddlewares.validateAuthRequest,UserController.signUp)

// api/v1/user/signin POST 
router.post('/signin',AuthRequestMiddlewares.validateAuthRequest,UserController.signIn)

module.exports = router;