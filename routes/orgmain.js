const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  if (req.session.login === true) {
    axios
      .get(`http://localhost:5001/shops/${req.session.user.username}`)
      .then((response) => {
        if (response.status === 200) {
          req.session.user.messages = response.body.messages;
          res.render("orgmain", {
            user: req.session.user,
            messages: req.session.user.messages,
          });
        } else {
          throw new Error("Server Error");
        }
      })
      .catch((err) => res.send(err));
  } else {
    res.status(400).send("LOGIN TO VIEW");
  }
});

module.exports = router;
