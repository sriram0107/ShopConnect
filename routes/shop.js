const express = require("express");
const router = express.Router();
const axios = require("axios");
var shopdata;

router.get("/", (req, res) => {
  if (req.session.login == true) {
    axios
      .get("http://localhost:5001/shops")
      .then((response) => {
        if (response.status === 200) {
          shopdata = response.data;
          res.render("shop", { shops: response.data });
        } else {
          throw new Error("Data not found");
        }
      })
      .catch((err) => res.send(err));
  } else {
    res.status(400).send("Log In to view this page");
  }
});

router.post("/:id", (req, res) => {
  switch (req.params.id) {
    case "1":
      var data = shopdata.filter((mem) =>
        mem.username.toLowerCase().includes(req.body.shop.toLowerCase())
      );
      res.render("shop", { shops: data });
      break;
    case "2":
      var data = shopdata.filter(
        (mem) => mem.products[req.body.item] >= req.body.quantity
      );
      res.render("shop", { shops: data });
      break;
    case "3":
      var data = shopdata.filter((mem) =>
        mem.city.toLowerCase().includes(req.body.shop.toLowerCase())
      );
      res.render("shop", { shops: data });
      break;
  }
});

module.exports = router;
