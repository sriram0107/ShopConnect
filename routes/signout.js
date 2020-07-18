const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", (req, res) => {
  req.session.login = false;
  axios
    .put("http://localhost:5001/user/detail", { ...req.session.user })
    .then((resp) => {
      req.session.user = null;
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
