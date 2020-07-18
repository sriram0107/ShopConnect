const express = require("express");
const EventEmitter = require("events");
const eventemitter = new EventEmitter();
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
  message = new Object();
  message.send = false;
  var today = new Date();
  message.date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  message.to = req.body.to;
  message.from = req.session.user.name;
  message.message = req.body.message;
  axios
    .post("http://localhost:5001/user/message", { ...message })
    .then((response) => {
      if (response.status === 200) {
        eventemitter.emit("shop", mes);
      } else {
        throw new Error("Message Unsuccessful");
      }
    })
    .then(res.redirect("/orgmain"))
    .catch((err) =>
      res.render("orgmain", {
        user: req.session.user,
        messages: req.session.user.messages,
        err: err,
      })
    );
});

eventemitter.on("shop", (message) => {
  message.send = false;
  axios
    .put("http://localhost:5001/shops/message", { ...message })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

eventemitter.on("user", (message, res) => {
  message.send = false;

  // axios
  //   .put("http://localhost:5001/user/message", { ...message })
  //   .then((response) => {
  //     if (response.status === 200) {
  //       console.log("-0-0-0-0-0-0-0-0-0-0-0-0-0-0-0");
  //       console.log(response);
  //       res.redirect("/Messages");
  //     } else {
  //       throw new Error("404 not found");
  //     }
  //   })
  //   .catch((err) => console.log(err));
});

module.exports = router;
