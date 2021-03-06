const express = require("express");
const session = require("express-session");
const app = new express();
const hbs = require("hbs");
const mainPage = require("./routes/main");
const shopPage = require("./routes/shop");
const loginPage = require("./routes/login");
const signoutPage = require("./routes/signout");
const messages = require("./routes/messages");
const detail = require("./routes/detail");
const signup = require("./routes/signup");
const account = require("./routes/account");
const stock = require("./routes/stock");
const sendmessage = require("./routes/sendmessage");
const orglogin = require("./routes/orglogin");
const orgmain = require("./routes/orgmain");
const clearmessage = require("./routes/clearmessage");
var bodyParser = require("body-parser");

hbs.registerPartials(__dirname + "/views/partials/");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.static("views/images"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "hbs");

app.use("/", loginPage);
app.use("/shop", shopPage);
app.use("/main", mainPage);
app.use("/signup", signup);
app.use("/signout", signoutPage);
app.use("/messages", messages);
app.use("/detail", detail);
app.use("/account", account);
app.use("/stock", stock);
app.use("/sendmessage", sendmessage);
app.use("/orglogin", orglogin);
app.use("/orgmain", orgmain);
app.use("/clearmessage", clearmessage);

app.listen(5000, () => console.log("Server running on http://localhost:5000/"));
