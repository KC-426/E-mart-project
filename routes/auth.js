const express = require('express')

const { body } = require('express-validator')

const router = express.Router()

const authController = require('../controllers/auth')

router.get('/login', authController.getLogin)

router.post('/login', authController.postLogin)

router.get('/signup', authController.getSignup)

router.post('/signup', authController.postSignup)

router.get('/logout', authController.postLogout)

module.exports = router
