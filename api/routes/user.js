const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/user.model");

router.get("/:username", (req, res) => {
  const username = String(req.params.username);
  User.find({ username: username })
    .then((users) => res.status(200).json(users))
    .catch((err) => res.json({ errMSG: "Action Failed" }));
});

router.post("/", (req, res) => {
  const newUser = new User({ ...req.body });
  newUser
    .save()
    .then(res.status(200).send("Succesfully added"))
    .catch((err) => res.status(404).send("username taken "));
});

router.put("/detail", (req, res) => {
  User.update({ username: req.body.username }, { ...req.body })
    .then(res.status(200).send("Succesfully updated"))
    .catch((err) => res.status(404).send("Error in updating"));
});

router.post("/login", (req, res) => {
  User.find({ username: req.body.username })
    .then((users) => {
      if (users.length == 0) res.status(404).send("Sign up to login");
      else {
        const user = users[0];
        if (user.password === req.body.password) {
          res.status(200).json(user);
        } else res.status(404).send("Incorrect password");
      }
    })
    .catch((err) => res.send("Action Failed"));
});

router.put("/message", (req, res) => {
  User.update({ username: req.body.to }, { $push: { messages: req.body } })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(404).send("Check details"));
});

router.put("/clearmessage", (req, res) => {
  User.update({ username: req.body.username }, { $set: { messages: [] } })
    .then(res.send("Succesfully cleared"))
    .catch((err) => res.send("Error in clearing"));
});

module.exports = router;
