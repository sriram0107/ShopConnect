const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.login === true) {
    fs.readFile("user.json", "utf8", (err, file) => {
      if (err) console.log(err);
      else {
        const ob = JSON.parse(file);
        var messages = ob.filter(
          (mem) => mem.username === req.session.user.username
        );
        req.session.messages = JSON.stringify(messages[0].messages);
        res.render("messages", {
          user: req.session.user,
          messages: req.session.messages,
        });
      }
    });
  } else {
    res.status(400).send("LOGIN TO VIEW");
  }
});

module.exports = router;
