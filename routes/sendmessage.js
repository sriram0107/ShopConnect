const express = require("express");
const fs = require("fs");
const EventEmitter = require("events");
const eventemitter = new EventEmitter();
const router = express.Router();

router.post("/", (req, res) => {
  message = new Object();
  message.send = true;
  var today = new Date();
  message.date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  message.to = req.body.to;
  message.from = req.body.user.hospital;
  message.message = req.body.message;
  fs.readFile("shops.json", "utf8", (err, shopfile) => {
    if (err) console.log(err);
    else {
      var shops = JSON.parse(shopfile);
      fs.readFile("user.json", "utf8", (err, file) => {
        if (err) console.log(err);
        else {
          var users = JSON.parse(file);
          users.forEach((mem) => {
            if (mem.username === req.body.user.username) {
              mem.messages.push(message);
              var mes = new Object();
              mes.send = message.send;
              mes.date = message.date;
              mes.to = message.to;
              mes.from = message.from;
              mes.message = message.message;
              eventemitter.emit("shop", mes, shops);
              req.session.user = mem;
            }
          });
          var data = JSON.stringify(users);
          fs.writeFile("user.json", data, (err) => {
            if (err) console.log(err);
            else res.send("Successfully sent automated message");
          });
        }
      });
    }
  });
});

router.post("/s", (req, res) => {
  message = new Object();
  message.send = true;
  var today = new Date();
  message.date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  message.to = req.body.to;
  message.from = req.session.user.hospital;
  message.message = req.body.message;
  fs.readFile("shops.json", "utf8", (err, shopfile) => {
    if (err) console.log(err);
    else {
      var shops = JSON.parse(shopfile);
      var found = 0;
      shops.forEach((mem) => {
        if (mem.name === message.to) found = 1;
      });
      if (found == 0) res.send("Invalid shop name....");
      else {
        fs.readFile("user.json", "utf8", (err, file) => {
          if (err) console.log(err);
          else {
            var users = JSON.parse(file);
            users.forEach((mem) => {
              if (mem.username === req.session.user.username) {
                mem.messages.push(message);
                var mes = new Object();
                mes.send = message.send;
                mes.date = message.date;
                mes.to = message.to;
                mes.from = message.from;
                mes.message = message.message;
                eventemitter.emit("shop", mes, shops);
                req.session.user = mem;
              }
            });
            var data = JSON.stringify(users);
            fs.writeFile("user.json", data, (err) => {
              if (err) console.log(err);
              else res.redirect("/Messages");
            });
          }
        });
      }
    }
  });
});

router.post("/o", (req, res) => {
  message = new Object();
  message.send = true;
  var today = new Date();
  message.date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  message.to = req.body.to;
  message.from = req.session.user.name;
  message.message = req.body.message;
  fs.readFile("user.json", "utf8", (err, userfile) => {
    if (err) console.log(err);
    else {
      var users = JSON.parse(userfile);
      var found = 0;
      users.forEach((mem) => {
        if (mem.hospital === message.to) found = 1;
      });
      if (found == 0) res.send("Invalid hospital name....");
      else {
        fs.readFile("shops.json", "utf8", (err, file) => {
          if (err) console.log(err);
          else {
            var shops = JSON.parse(file);
            shops.forEach((mem) => {
              if (mem.name === req.session.user.name) {
                mem.messages.push(message);
                var mes = new Object();
                mes.send = message.send;
                mes.date = message.date;
                mes.to = message.to;
                mes.from = message.from;
                mes.message = message.message;
                eventemitter.emit("user", mes, users);
                req.session.user = mem;
              }
            });
            var data = JSON.stringify(shops);
            fs.writeFile("shops.json", data, (err) => {
              if (err) console.log(err);
              else res.redirect("/orgmain");
            });
          }
        });
      }
    }
  });
});

eventemitter.on("shop", (message, shops) => {
  message.send = false;
  shops.forEach((mem) => {
    if (mem.name === message.to) mem.messages.push(message);
  });
  var data = JSON.stringify(shops);
  fs.writeFile("shops.json", data, (err) => {
    if (err) console.log(err);
  });
});

eventemitter.on("user", (message, users) => {
  message.send = false;
  users.forEach((mem) => {
    if (mem.hospital === message.to) mem.messages.push(message);
  });
  var data = JSON.stringify(users);
  fs.writeFile("user.json", data, (err) => {
    if (err) console.log(err);
  });
});

module.exports = router;
