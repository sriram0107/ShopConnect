const express = require("express");
const fs = require("fs");
const router = express.Router();

router.post("/", (req, res) => {
  var newUser = new Object();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.hospital = req.body.hospital;
  newUser.address = req.body.address;
  newUser.stock = {};
  newUser.stock.mask = req.body.mask;
  newUser.stock.ppe = req.body.ppe;
  newUser.stock.ventilator = req.body.ventilator;
  newUser.stock.gown = req.body.gown;
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

module.exports = router;
