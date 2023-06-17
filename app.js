const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const expressValidator = require("express-validator");

const MONGODB_URI = "mongodb://localhost:27017/e-mart";

const app = express();
const store = new MongoDBStore({ uri: MONGODB_URI, collection: "sessions" });

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const { compareSync } = require("bcryptjs");

console.log(
  "------------------------Server Started---------------------------------"
);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(adminRoutes);
app.use(shopRoutes);
app.use("/auth", authRoutes);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000);
