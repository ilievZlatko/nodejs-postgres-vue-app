const express = require('express')
const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const router = express.Router()

// Post route for creating user
router.post(
  '/register',
  AuthenticationControllerPolicy.register,
  AuthenticationController.register
)

router.post(
  '/login',
  AuthenticationController.login
)

module.exports = router
