const express = require('express')
const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')
const RecepieController = require('../controllers/RecepieController')
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

router.post(
  '/api/recepies',
  RecepieController.createRecepie
)

router.get(
  '/api/recepies',
  RecepieController.loadRecepies
)

router.get(
  '/api/recepies/:id',
  RecepieController.loadSingleRecepie
)

router.put(
  '/api/recepies/:id',
  RecepieController.updateRecepie
)

router.delete(
  '/api/recepies/:id',
  RecepieController.deleteRecepie
)

module.exports = router
