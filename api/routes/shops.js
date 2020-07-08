const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Shops = require("../model/shops.model");

router.get("/:username", (req, res) => {
  const username = String(req.params.username);
  Shops.find({ username: username })
    .then((shops) => res.json(shops))
    .catch((err) => res.json({ errMSG: "Action Failed" }));
});

router.post("/", (req, res) => {
  const newUser = new Shops({ ...req.body });
  newUser
    .save()
    .then(res.send("Succesfully added"))
    .catch((err) => res.json({ errMSG: "username taken " }));
});

router.put("/detail", (req, res) => {
  Shops.update({ username: req.session.user.username }, { ...req.body })
    .then(res.send("Succesfully updated"))
    .catch((err) => res.send("Error in updating"));
});

router.post("/login", (req, res) => {
  Shops.find({ username: req.body.username })
    .then((shops) => {
      if (shops.length == 0) res.send("Sign up to login");
      else {
        const shop = shops[0];
        if (shop.password === req.body.password) res.send("LoggedIn");
        else res.send("Incorrect password");
      }
    })
    .catch((err) => res.send("Action Failed"));
});

router.put("/message", (req, res) => {});

router.put("/clearmessage", (req, res) => {
  Shops.update(
    { username: req.session.user.username },
    { ...req.body, messages: [] }
  )
    .then(res.send("Succesfully cleared"))
    .catch((err) => res.send("Error in clearing"));
});

module.exports = router;
