const express = require("express");
const router = express.Router();
const fs = require("fs");
const axios = require("axios");

router.post("/", (req, res) => {
  fs.readFile("user.json", "utf8", (err, file) => {
    if (err) console.log(err);
    else {
      const users = JSON.parse(file);
      users.forEach((mem) => {
        if (mem.username === req.session.user.username) {
          mem.messages = [];
          req.session.user = mem;
        }
      });
      const data = JSON.stringify(users);
      fs.writeFile("user.json", data, (err) => {
        if (err) console.log(err);
        res.redirect("/messages");
      });
    }
  });
});

router.post("/o", (req, res) => {
  fs.readFile("shops.json", "utf8", (err, file) => {
    if (err) console.log(err);
    else {
      const users = JSON.parse(file);
      users.forEach((mem) => {
        if (mem.name === req.session.user.name) {
          mem.messages = [];
          req.session.user = mem;
        }
      });
      const data = JSON.stringify(users);
      fs.writeFile("shops.json", data, (err) => {
        if (err) console.log(err);
        res.redirect("/orgmain");
      });
    }
  });
});

module.exports = router;
