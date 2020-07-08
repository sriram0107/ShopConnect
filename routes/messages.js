const express = require("express");
const fs = require("fs");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  if (req.session.login === true) {
    fs.readFile("user.json", "utf8", (err, file) => {
      if (err) console.log(err);
      else {
        const users = JSON.parse(file);
        users.forEach((mem) => {
          if (mem.username === req.session.user.username)
            req.session.user.messages = mem.messages;
        });
      }
    });
    res.render("messages", {
      user: req.session.user,
      messages: req.session.user.messages,
      to: "",
    });
  } else {
    res.status(400).send("LOGIN TO VIEW");
  }
});
router.post("/", (req, res) => {
  var t;
  for (k in req.body) {
    t = k;
  }
  res.render("messages", {
    user: req.session.user,
    messages: req.session.user.messages,
    to: t,
  });
});
module.exports = router;
