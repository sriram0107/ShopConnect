const express = require("express");
const fs = require("fs");
const router = express.Router();

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
  var newUser = new Object();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.hospital = req.body.hospital;
  newUser.address = req.body.address;
  fs.readFile("user.json", "utf8", (err, file) => {
    var users = JSON.parse(file);
    users.forEach((mem) => {
      if (mem.username === req.session.user.username) {
        mem.username = newUser.username ? newUser.username : mem.username;
        mem.password = newUser.password ? newUser.password : mem.password;
        mem.hospital = newUser.hospital ? newUser.hospital : mem.hospital;
        mem.address = newUser.address ? newUser.address : mem.address;
        req.session.user = mem;
      }
    });
    var data = JSON.stringify(users);
    fs.writeFile("user.json", data, (err) => {
      if (err) console.log(err);
      else res.redirect("/main");
    });
  });
});

router.post("/o", (req, res) => {
  var newUser = new Object();
  newUser.name = req.body.name;
  newUser.password = req.body.password;
  newUser.address = req.body.address;
  newUser.city = req.body.city;
  newUser.contact = req.body.contact;
  newUser.products = {};
  newUser.products.mask = req.body.mask;
  newUser.products.ppe = req.body.ppe;
  newUser.products.ventilator = req.body.ventilator;
  newUser.products.gown = req.body.gown;
  fs.readFile("shops.json", "utf8", (err, file) => {
    var users = JSON.parse(file);
    users.forEach((mem) => {
      if (mem.name === req.session.user.name) {
        mem.name = newUser.name ? newUser.name : mem.name;
        mem.password = newUser.password ? newUser.password : mem.password;
        mem.address = newUser.address ? newUser.address : mem.address;
        mem.city = newUser.city ? newUser.city : mem.city;
        mem.contact = newUser.contact ? newUser.contact : mem.contact;
        mem.products.mask = newUser.products.mask
          ? newUser.products.mask
          : mem.products.mask;
        mem.products.ppe = newUser.products.ppe
          ? newUser.products.ppe
          : mem.products.ppe;
        mem.products.ventilator = newUser.products.ventilator
          ? newUser.products.ventilator
          : mem.products.ventilator;
        mem.products.gown = newUser.products.gown
          ? newUser.products.gown
          : mem.products.gown;
        req.session.user = mem;
      }
    });
    var data = JSON.stringify(users);
    fs.writeFile("shops.json", data, (err) => {
      if (err) console.log(err);
      else res.redirect("/orgmain");
    });
  });
});

module.exports = router;
