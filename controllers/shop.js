const Product = require('../models/product')
const path = require("path");

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then((product) => {
        res.render('product-detail', {
          product: product,
          pageTitle: product.title,
          path: '/product-detail',
          isAuthenticated: req.isloggedIn,
        });
      })
      .catch(err => console.log(err));
  };
  