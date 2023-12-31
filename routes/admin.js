const path = require('path')
const express = require('express')

const router = express.Router()

const adminController = require('../controllers/admin');

router.get('/', adminController.getNavigation)

router.get('/products', adminController.getProducts)

router.get('/add-product', adminController.getAddProduct)

router.post('/add-product', adminController.postAddProduct)

router.post('/delete', adminController.postDeleteProduct)

module.exports = router