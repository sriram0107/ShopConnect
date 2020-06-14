const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.login === true) {
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
