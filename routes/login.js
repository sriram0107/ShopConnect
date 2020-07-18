const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  axios
    .post("http://localhost:5001/user/login", { ...req.body })
    .then((response) => {
      if (response.status === 200) {
        req.session.user = { ...response.data };
        req.session.login = true;
        res.redirect("/main");
      } else {
        res.send("Error Logging In...Try Again");
      }
    })
    .catch((err) => {
      res.render("login", { errMes: "Invalid Credentials" });
    });
});

module.exports = router;
