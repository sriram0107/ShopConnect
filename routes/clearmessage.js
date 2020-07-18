const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", (req, res) => {
  var response;
  axios
    .put("http://localhost:5001/user/clearmessage", {
      username: req.session.user.username,
    })
    .then((response) => {
      if (response.status === 200) {
        req.session.user.messages = [];
        res.redirect("/messages");
      } else {
        var err = new Error("Error clearing the messages");
        throw err;
      }
    })
    .catch((err) => console.log(err));
});

router.post("/o", (req, res) => {
  var response;
  axios
    .put("http://localhost:5001/shops/clearmessage", {
      username: req.session.user.username,
    })
    .then((response) => {
      if (response.status === 200) {
        res.redirect("/orgmain");
      } else {
        var err = new Error("Error clearing the messages");
        throw err;
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
