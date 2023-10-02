const express = require('express');
const { UserController } = require('../../controllers');
const router = express.Router();


// api/v1/user/signup POST 
router.post('/signup',UserController.signUp)

// api/v1/user/signin POST 
router.post('/signin',UserController.signIn)

module.exports = router;