const express = require("express");
const router = express.Router();
const axios = require("axios");

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
