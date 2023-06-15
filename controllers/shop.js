const Product = require('../models/product')

// exports.getProducts = (req, res, next) => {
//   res.render('product', {
//     path: '/products',
//     pageTitle: 'Products'
//   })
// }


// exports.getProducts = (req, res, next) => {
//     const prodId = req.params.productId
//     Product.fetchAll()
//     .then(([rows, fieldData]) => {
//         return res.render('', {
//             pageTitle: 'All Products',
//             path: '/products'     
//         })
//     }).catch(err => {
//         console.log(err)
//     })
// }

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then(([product]) => {
        res.render('/products', {
          product: product[0],
        //   pageTitle: product.title,
          path: '/products'
        });
      })
      .catch(err => console.log(err));
  };
  
exports.getIndex = (req, res, next) => {
    Product.fetchAll()
      .then(([rows, fieldData]) => {
        res.render('shop/index', {
          prods: rows,
          pageTitle: 'Shop',
          path: '/'
        });
      })
      .catch(err => console.log(err));
  };
  