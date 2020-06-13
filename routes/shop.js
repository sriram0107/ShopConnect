const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.login == true) {
    fs.readFile("shops.json", "utf8", (err, file) => {
      if (err) console.log(err);
      else {
        const shops = JSON.parse(file);
        res.render("shop", { shops: shops });
      }
    });
  } else {
    res.status(400).send("Log In to view this page");
  }
});

router.post("/", (req, res) => {
  fs.readFile("shops.json", "utf8", (err, file) => {
    if (err) console.log(err);
    else {
      const shops = JSON.parse(file);
      var s = shops.filter((mem) =>
        mem.name.toLowerCase().includes(req.body.shop.toLowerCase())
      );
      res.render("shop", { shops: s });
    }
  });
});

module.exports = router;
