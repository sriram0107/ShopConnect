const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/user.model");

router.get("/:username", (req, res) => {
  const username = String(req.params.username);
  User.find({ username: username })
    .then((users) => res.json(users))
    .catch((err) => res.json({ errMSG: "Action Failed" }));
});

router.post("/", (req, res) => {
  const newUser = new User({ ...req.body });
  newUser
    .save()
    .then(res.send("Succesfully added"))
    .catch((err) => res.json({ errMSG: "username taken :(" }));
});

router.put("/detail", (req, res) => {
  User.update({ username: req.session.user.username }, { ...req.body })
    .then(res.send("Succesfully updated"))
    .catch((err) => res.send("Error in updating"));
});

router.post("/login", (req, res) => {
  User.find({ username: req.body.username })
    .then((users) => {
      if (users.length == 0) res.send("Sign up to login");
      else {
        const user = users[0];
        if (user.password === req.body.password) res.send("LoggedIn");
        else res.send("Incorrect password");
      }
    })
    .catch((err) => res.send("Action Failed"));
});

router.put("/message", (req, res) => {});

router.put("/clearmessage", (req, res) => {
  User.update(
    { username: req.session.user.username },
    { ...req.body, messages: [] }
  )
    .then(res.send("Succesfully cleared"))
    .catch((err) => res.send("Error in clearing"));
});

module.exports = router;
