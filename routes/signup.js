const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", (req, res) => {
  res.render("signup");
});

router.post("/o", (req, res) => {
  res.render("orgsignup");
});

module.exports = router;
