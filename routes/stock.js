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
  if (req.session.user.stock[t] === 999) {
    axios
      .get("http://localhost:5001/shops")
      .then((shops) => {
        var sfilt = shops.data;
        mes = {};
        mes.send = false;
        var today = new Date();
        mes.date =
          today.getDate() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getFullYear();
        mes.to = sfilt[Math.floor(Math.random() * sfilt.length)].username;
        mes.from = req.session.user.username;
        mes.message = `we require ${t} immediately`;
        axios
          .put("http://localhost:5001/shops/message", { ...mes })
          .then((response) => {
            if (response.status === 200) {
              req.session.user.messages.push({ ...mes, send: true });
              res.redirect("/stock");
            } else {
              throw new Error("Message Unsuccessful(Check shop details)");
            }
          })
          .catch((err) => console.log("error in sending message"));
      })
      .catch((err) => console.log(err));
  }
});

module.exports = router;

// shops.forEach((mem) => {
//   if (
//     req.body.address.toLowerCase().includes(mem.city.toLowerCase()) &&
//     mem.products[req.params.item] - 100 >= -10
//   ) {
//     sfilt.push(mem);
//   }
// });
