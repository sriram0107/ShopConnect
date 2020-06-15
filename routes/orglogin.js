const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/", (req, res) => {
  fs.readFile("shops.json", "utf8", (err, file) => {
    if (err) console.log(err);
    else {
      const users = JSON.parse(file);
      for (var i = 0; i < users.length; i++) {
        if (
          users[i].name === req.body.name &&
          users[i].password === req.body.password
        ) {
          req.session.login = true;
          req.session.user = users[i];
          res.redirect("/main");
        }
      }
      res.render("login");
    }
  });
});

module.exports = router;
