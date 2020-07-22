const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", (req, res) => {
  var newUser = { ...req.body };
  newUser.messages = [];
  var response;
  axios
    .post("http://localhost:5001/user", { ...newUser })
    .then((response) => {
      if (response.status === 200) {
        res.redirect("/");
      } else {
        res.send("Username Taken");
      }
    })
    .catch((err) => console.log(err));
});

router.post("/o", (req, res) => {
  var newUser = { ...req.body };
  newUser.messages = [];
  console.log(newUser);
  axios
    .post("http://localhost:5001/shops", { ...newUser })
    .then((response) => {
      if (response.status === 200) {
        res.redirect("/");
      } else {
        res.send("Username Taken");
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
