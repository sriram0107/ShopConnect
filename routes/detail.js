const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  if (req.session.login == true) {
    res.render("detail");
  } else res.send("Login To View");
});
router.get("/o", (req, res) => {
  if (req.session.login == true) {
    res.render("orgdetail");
  } else res.send("Login To View");
});

router.post("/", (req, res) => {
  var newUser = { ...req.body };
  req.session.user.username = newUser.username
    ? newUser.username
    : req.session.user.username;
  req.session.user.password = newUser.password
    ? newUser.password
    : req.session.user.password;
  req.session.user.hospital = newUser.hospital
    ? newUser.hospital
    : req.session.user.hospital;
  req.session.user.address = newUser.address
    ? newUser.address
    : req.session.user.address;

  console.log("-------");
  console.log(req.session.user);

  axios
    .put("http://localhost:5001/user/detail", { ...req.session.user })
    .then((response) => {
      if (response.status === 200) {
        res.redirect("/main");
      } else {
        throw new Error(response);
      }
    })
    .catch((err) => res.send(err));
});

router.post("/o", (req, res) => {
  var newUser = { ...req.body };
  req.session.user.name = newUser.name ? newUser.name : req.session.user.name;
  req.session.user.password = newUser.password
    ? newUser.password
    : req.session.user.password;
  req.session.user.address = newUser.address
    ? newUser.address
    : req.session.user.address;
  req.session.user.city = newUser.city ? newUser.city : req.session.user.city;
  req.session.user.contact = newUser.contact
    ? newUser.contact
    : req.session.user.contact;
  req.session.user.products.mask = newUser.products.mask
    ? newUser.products.mask
    : req.session.user.products.mask;
  req.session.user.products.ppe = newUser.products.ppe
    ? newUser.products.ppe
    : req.session.user.products.ppe;
  req.session.user.products.ventilator = newUser.products.ventilator
    ? newUser.products.ventilator
    : req.session.user.products.ventilator;
  req.session.user.products.gown = newUser.products.gown
    ? newUser.products.gown
    : req.session.user.products.gown;
  axios
    .post("http://localhost:5001/shops/detail", { ...req.session.user })
    .then((response) => {
      if (response.status === 200) {
        res.redirect("/orgmain");
      } else {
        var err = new Error("Error changing");
        throw err;
      }
    })
    .catch((err) => res.send("Server Error!!"));
});

module.exports = router;
