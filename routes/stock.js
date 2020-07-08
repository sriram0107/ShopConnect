const express = require("express");
const fs = require("fs");
const axios = require("axios");
const router = express.Router();
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
const axios = require("axios");

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
  fs.readFile("user.json", "utf8", (err, file) => {
    var users = JSON.parse(file);
    users.forEach((mem) => {
      if (mem.username === req.session.user.username) {
        mem.stock[t] -= 1;
        if (t == "mask" && mem.stock[t] == 999) {
          eventEmitter.emit("mask", req.session.user);
        } else if (t == "ppe" && mem.stock[t] == 999) {
          eventEmitter.emit("ppe", req.session.user);
        } else if (t == "ventilator" && mem.stock[t] == 49) {
          eventEmitter.emit("ventilator", req.session.user);
        } else if (t == "gown" && mem.stock[t] == 999) {
          eventEmitter.emit("gown", req.session.user);
        }
        req.session.user = mem;
      }
    });
    var data = JSON.stringify(users);
    fs.writeFile("user.json", data, (err) => {
      if (err) console.log(err);
      else res.redirect("/stock");
    });
  });
});

eventEmitter.on("mask", (user) => {
  fs.readFile("shops.json", "utf8", (err, file) => {
    if (err) console.log(err);
    else {
      var shops = JSON.parse(file);
      var sfilt = [];
      shops.forEach((mem) => {
        if (
          user.address.toLowerCase().includes(mem.city.toLowerCase()) &&
          mem.products.mask - 1000 >= -100
        ) {
          sfilt.push(mem);
        }
      });
      var l = sfilt.length;
      console.log("sending request.....");
      axios
        .post("http://localhost:5000/sendmessage", {
          to: sfilt[Math.floor(Math.random() * l)].name,
          message: "We require masks asap ",
          user: user,
        })
        .then((res) => {
          //console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});
eventEmitter.on("ppe", (user) => {
  fs.readFile("shops.json", "utf8", (err, file) => {
    if (err) console.log(err);
    else {
      var shops = JSON.parse(file);
      var sfilt = [];
      shops.forEach((mem) => {
        if (
          user.address.toLowerCase().includes(mem.city.toLowerCase()) &&
          mem.products.ppe - 1000 >= -100
        ) {
          sfilt.push(mem);
        }
      });
      var l = sfilt.length;
      console.log("sending request.....");
      axios
        .post("http://localhost:5000/sendmessage", {
          to: sfilt[Math.floor(Math.random() * l)].name,
          message: "We require ppe asap ",
          user: user,
        })
        .then((res) => {
          //console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});
eventEmitter.on("ventilator", (user) => {
  fs.readFile("shops.json", "utf8", (err, file) => {
    if (err) console.log(err);
    else {
      var shops = JSON.parse(file);
      var sfilt = [];
      shops.forEach((mem) => {
        if (
          user.address.toLowerCase().includes(mem.city.toLowerCase()) &&
          mem.products.ventilator - 100 >= -10
        ) {
          sfilt.push(mem);
        }
      });
      var l = sfilt.length;
      console.log("sending request.....");
      axios
        .post("http://localhost:5000/sendmessage", {
          to: sfilt[Math.floor(Math.random() * l)].name,
          message: "We require ventilators asap ",
          user: user,
        })
        .then((res) => {
          //console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});
eventEmitter.on("gown", (user) => {
  fs.readFile("shops.json", "utf8", (err, file) => {
    if (err) console.log(err);
    else {
      var shops = JSON.parse(file);
      var sfilt = [];
      shops.forEach((mem) => {
        if (
          user.address.toLowerCase().includes(mem.city.toLowerCase()) &&
          mem.products.gown - 2000 >= -100
        ) {
          sfilt.push(mem);
        }
      });
      var l = sfilt.length;
      console.log("sending request.....");
      axios
        .post("http://localhost:5000/sendmessage", {
          to: sfilt[Math.floor(Math.random() * l)].name,
          message: "We require gowns asap ",
          user: user,
        })
        .then((res) => {
          //console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});
module.exports = router;
