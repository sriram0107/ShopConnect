const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  fs.readFile("user.json", "utf8", (err, file) => {
    if (err) console.log(err);
    else {
      const users = JSON.parse(file);
      for (var i = 0; i < users.length; i++) {
        if (
          users[i].username === req.body.username &&
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
