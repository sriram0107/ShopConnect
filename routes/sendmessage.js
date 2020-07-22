const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/s", (req, res) => {
  message = {};
  message.send = false;
  var today = new Date();
  message.date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  message.to = req.body.to;
  message.from = req.session.user.hospital;
  message.message = req.body.message;
  axios
    .put("http://localhost:5001/shops/message", { ...message })
    .then((response) => {
      if (response.status === 200) {
        req.session.user.messages.push({ ...message, send: true });
        res.redirect("/Messages");
      } else {
        throw new Error("Message Unsuccessful(Check shop details)");
      }
    })
    .catch((err) =>
      res.render("messages", {
        user: req.session.user,
        messages: req.session.user.messages,
        to: "",
        err: err,
      })
    );
});

router.post("/o", (req, res) => {
  message = {};
  message.send = false;
  var today = new Date();
  message.date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  message.to = req.body.to;
  message.from = req.session.user.username;
  message.message = req.body.message;
  axios
    .put("http://localhost:5001/user/message", { ...message })
    .then((response) => {
      if (response.status === 200) {
        req.session.user.messages.push({ ...message, send: true });
        res.redirect("/orgmain");
      } else {
        throw new Error("Message Unsuccessful");
      }
    })
    .catch((err) =>
      res.render("orgmain", {
        user: req.session.user,
        messages: req.session.user.messages,
        err: err,
      })
    );
});

module.exports = router;
