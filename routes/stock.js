const express = require("express");
const fs = require("fs");
const axios = require("axios");
const router = express.Router();
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

router.get("/", (req, res) => {
  if (req.session.login === true) {
    res.render("stock", { user: req.session.user });
  } else {
    res.status(400).send("LOGIN TO VIEW");
  }
});

router.post("/", (req, res) => {
  var t;
  for (k in req.body) {
    t = k;
  }
  req.session.user.stock[t] -= 1;
  switch (t) {
    case "mask":
      if (req.session.user.stock[t] === 999) {
        eventEmitter.emit("mask", req.session.user);
      }
      res.redirect("/stock");
      break;
    case "ppe":
      if (req.session.user.stock[t] === 999) {
        eventEmitter.emit("ppe", req.session.user);
      }
      res.redirect("/stock");
      break;
    case "ventilator":
      if (req.session.user.stock[t] === 999) {
        eventEmitter.emit("ventilator", req.session.user);
      }
      res.redirect("/stock");
      break;
    case "gown":
      if (req.session.user.stock[t] === 999) {
        eventEmitter.emit("gown", req.session.user);
      }
      res.redirect("/stock");
      break;
  }
});

eventEmitter.on("mask", (user) => {
  axios
    .put(`http://localhost:5001/shops/quantity/mask`, { ...user })
    .then((res) => {
      console.log("0-0-0-0-0-0-0-");
      console.log(res);
      console.log("0-0-0-0-0-0-0-");
      user.messages.push(res.data);
    })
    .catch((err) => res.send("error"));
});
eventEmitter.on("ppe", (user) => {
  axios
    .put(`http://localhost:5001/shops/quantity/${user.city}/ppe`)
    .then((res) => user.messages.push(res.data))
    .catch((err) => res.send("error"));
});
eventEmitter.on("ventilator", (user) => {
  axios
    .put(`http://localhost:5001/shops/quantity/${user.city}/ventilator`)
    .then((res) => user.messages.push(res.data))
    .catch((err) => res.send("error"));
});
eventEmitter.on("gown", (user) => {
  axios
    .put(`http://localhost:5001/shops/quantity/${user.city}/gown`)
    .then((res) => user.messages.push(res.data))
    .catch((err) => res.send("error"));
});
module.exports = router;
