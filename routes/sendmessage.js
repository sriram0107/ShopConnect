const express = require("express");
const fs = require("fs");
const router = express.Router();

router.post("/", (req, res) => {
  message = new Object();
  message.to = req.body.to;
  message.message = req.body.message;
  fs.readFile("shops.json", "utf8", (err, file) => {
    if (err) console.log(err);
    else {
      var shops = JSON.parse(file);
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

module.exports = router;
