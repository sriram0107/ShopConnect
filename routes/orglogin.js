const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", (req, res) => {
  axios
    .post("http://localhost:5001/shops/login", { ...req.body })
    .then((response) => {
      if (response.status === 200) {
        req.session.user = { ...response.data };
        req.session.login = true;
        res.redirect("/orgmain");
      } else {
        res.send("Error Logging In...Try Again");
      }
    })
    .catch((err) => res.render("login", { errMesorg: "Invalid Credentials" }));
});

module.exports = router;
