const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  if (req.session.login == true) {
    axios
      .get("http://localhost:5001/shops")
      .then((response) => {
        if (response.status === 200) {
          console.log("-------------");
          console.log(response.data);
          console.log("---------");
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
  axios
    .get("http://localhost:5001/shops")
    .then((response) => {
      if (response.status === 200) {
        switch (req.params.id) {
          case 1:
            var data = response.data.filter((mem) =>
              mem.username.toLowerCase().includes(req.body.shop.toLowerCase())
            );
            res.render("shop", { shops: data });
            break;
          case 2:
            var data = response.data.filter(
              (mem) => mem.stock[req.body.item] >= req.body.quantity
            );
            res.render("shop", { shops: data });
            break;
          case 3:
            var data = response.data.filter((mem) =>
              mem.city.toLowerCase().includes(req.body.shop.toLowerCase())
            );
            res.render("shop", { shops: data });
            break;
        }
      } else {
        throw new Error("Data not found");
      }
    })
    .catch((err) => res.send(err));
});

module.exports = router;
