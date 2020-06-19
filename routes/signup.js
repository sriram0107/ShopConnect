const express = require("express");
const fs = require("fs");
const router = express.Router();

router.post("/", (req, res) => {
  res.render("signup");
});

router.post("/o", (req, res) => {
  res.render("orgsignup");
});

module.exports = router;
