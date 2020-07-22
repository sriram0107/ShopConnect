const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Shops = require("../model/shops.model");

router.get("/", (req, res) => {
  const username = String(req.params.username);
  Shops.find()
    .then((shops) => res.status(200).json(shops))
    .catch((err) => res.json({ errMSG: "Action Failed" }));
});

router.post("/", (req, res) => {
  const newUser = new Shops({ ...req.body });
  newUser
    .save()
    .then(res.status(200).send("Succesfully added"))
    .catch((err) => res.status(404).json("username taken "));
});

router.put("/detail", (req, res) => {
  Shops.updateOne({ username: req.session.user.username }, { ...req.body })
    .then(res.send("Succesfully updated"))
    .catch((err) => res.send("Error in updating"));
});

router.post("/login", (req, res) => {
  Shops.find({ username: req.body.username })
    .then((shops) => {
      if (shops.length == 0) res.send("Sign up to login");
      else {
        const shop = shops[0];
        if (shop.password === req.body.password) res.status(200).send(shop);
        else res.send("Incorrect password");
      }
    })
    .catch((err) => res.send("Action Failed"));
});

router.put("/message", (req, res) => {
  Shops.updateOne({ username: req.body.to }, { $push: { messages: req.body } })
    .then((response) => {
      res.status(200).send("all is guud");
    })
    .catch((err) => res.status(404).send("bad request"));
});

router.put("/clearmessage", (req, res) => {
  Shops.updateOne(
    { username: req.session.user.username },
    { $set: { messages: [] } }
  )
    .then(res.send("Succesfully cleared"))
    .catch((err) => res.send("Error in clearing"));
});

module.exports = router;
