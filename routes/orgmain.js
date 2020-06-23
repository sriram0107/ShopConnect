const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  if (req.session.login === true) {
    fs.readFile("shops.json", "utf8", (err, file) => {
      if (err) console.log(err);
      else {
        const users = JSON.parse(file);
        users.forEach((mem) => {
          if (mem.name === req.session.user.name)
            req.session.user.messages = mem.messages;
        });
      }
    });
    res.render("orgmain", {
      user: req.session.user,
      messages: req.session.user.messages,
    });
  } else {
    res.status(400).send("LOGIN TO VIEW");
  }
});

module.exports = router;
