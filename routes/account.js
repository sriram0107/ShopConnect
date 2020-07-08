const express = require("express");
const fs = require("fs");
const router = express.Router();
const axios = require("axios");

router.post("/", (req, res) => {
  var newUser = { ...req.body };
  newUser.messages = [];
  fs.readFile("user.json", "utf8", (err, file) => {
    var users = JSON.parse(file);
    var found = 0;
    users.forEach((mem) => {
      if (mem.username == newUser.username) found = 1;
    });
    if (found == 1) res.send("Username taken");
    else {
      users.push(newUser);
      var data = JSON.stringify(users);
      fs.writeFile("user.json", data, (err) => {
        if (err) console.log(err);
        else res.redirect("/");
      });
    }
  });
});

router.post("/o", (req, res) => {
  var newUser = new Object();
  newUser.name = req.body.name;
  newUser.password = req.body.password;
  newUser.address = req.body.address;
  newUser.city = req.body.city;
  newUser.contact = req.body.contact;
  newUser.messages = [];
  newUser.products = {};
  newUser.products.mask = req.body.mask;
  newUser.products.ppe = req.body.ppe;
  newUser.products.ventilator = req.body.ventilator;
  newUser.products.gown = req.body.gown;
  fs.readFile("shops.json", "utf8", (err, file) => {
    var users = JSON.parse(file);
    var found = 0;
    users.forEach((mem) => {
      if (mem.address == newUser.address && mem.name == newUser.name) found = 1;
    });
    if (found == 1) res.send("Username taken");
    else {
      users.push(newUser);
      var data = JSON.stringify(users);
      fs.writeFile("shops.json", data, (err) => {
        if (err) console.log(err);
        else res.redirect("/");
      });
    }
  });
});

module.exports = router;
