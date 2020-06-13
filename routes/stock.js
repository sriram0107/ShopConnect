const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.login === true) {
    res.render("stock", { user: req.session.user });
  } else {
    res.status(400).send("LOGIN TO VIEW");
  }
});

router.post("/", (req, res) => {
  var t;
  for (k in req.body) {
    t = k;
  }

  fs.readFile("user.json", "utf8", (err, file) => {
    var users = JSON.parse(file);
    users.forEach((mem) => {
      if (mem.username === req.session.user.username) {
        mem.stock[t] -= 1;
        req.session.user = mem;
      }
    });
    var data = JSON.stringify(users);
    fs.writeFile("user.json", data, (err) => {
      if (err) console.log(err);
      else res.redirect("/stock");
    });
  });
});

module.exports = router;
