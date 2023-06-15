const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const path = require("path");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    path: "/auth/signup",
    message: "",
    isAuthenticated: true,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).render("auth/signup", {
      path: "/auth/singup",
      pageTitle: "Signup",
      validationErrors: errors.array(),
    });
  }
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        cart: { items: [] },
      });
      return user.save();
    })
    .then((result) => {
      res.redirect("/auth/login");

      return transporter.sendMail({
        to: email,
        from: "kchahar686@gmail.com",
        subject: "Signup Successfully",
        html: "<h1> You have successfully signed up.</h1><p> Now you can use our application. The e-marketplace website </p>",
      });
    }).catch(err => console.log(err))
    .catch((err) => {
      console.log(err);
    });
};

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/auth/login",
    isAuthenticated: true,
  });
};


exports.postLogin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  const errors = validationResult(req)
  if(!errors.isEmpty()) {
  return res.status(422).render('auth/login', {
    path: '/auth/login',
    pageTitle: 'Login'
  })
  }

  User.findOne({email: email})
  .then(user => {
    if(!user) {
      return res.status(422).render('auth/login', {
        path: '/auth/login',
        errorMessage: "Invalid email or password",
        pageTitle: 'Login'
      })
    }
    
    bcrypt.compare(password, user.password)
    .then(doMatch => {
      if (doMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(err => {
          console.log(err);
          res.redirect('auth/login');
        });
      }
      return res.status(422).render('auth/login', {
        path: '/auth/login',
        pageTitle: 'Login',
        errorMessage: 'Invalid email or password.',
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/');
    });
})
.catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.render("home", {
      path: "/auth/logout",
      pageTitle: "Home",
      isAuthenticated: false,
    });
  });
};
