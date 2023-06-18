const product = require("../models/product");
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
  let size = req.body.size;
  let packet = req.body.packet;
  const description = req.body.description;
  size = parseFloat(size);
  packet = parseFloat(packet);

  const product = new Product({
    title: title,
    size: size,
    packet: packet,
    description: description,
  });
  product
    .save()
    .then((product) => {
      console.log(product);
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const packet = req.body.packet;
  const size = req.body.size;
  const description = req.body.description;

  const product = new Product({ title, packet, size, description });
  product.save().then((product) => {
    console.log(product);
    res.redirect("/");
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
