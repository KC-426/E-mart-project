const Product = require("../models/product");
const path = require("path");

exports.getNavigation = (req, res, next) => {
  // console.log(req.body)
  res.render("home", {
    path: "/",
    pageTitle: "Home",
    isAuthenticated: true,
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/add-product",
    editing: false,
    isAuthenticated: req.isloggedIn,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  let price = req.body.price;
  const imageUrl = req.body.imageUrl
  const description = req.body.description;
  price = parseFloat(price);

  const product = new Product({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  });
  product
    .save()
    .then((product) => {
      console.log(product);
      res.redirect("/login");
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;

  const product = new Product({ title, price, imageUrl, description });
  product.save().then((product) => {
    console.log(product);
    res.redirect("/products");
  });
};

exports.getProducts = (req, res, next) => {
  Product.find()
  .then(products => {
    console.log(products)
    res.render("products", {
      path: "/products",
      products: products,
      pageTitle: 'Products',
      isAuthenticated: req.isloggedIn,
    });
  })
  .catch(err => console.log(err))
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/products');
    })
    .catch(err => console.log(err));
};
