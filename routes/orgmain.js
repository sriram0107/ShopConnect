const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  if (req.session.login === true) {
    res.render("orgmain", { user: req.session.user });
  } else {
    res.status(400).send("LOGIN TO VIEW");
  }
});

module.exports = router;
