const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  if (req.session.login === true) {
    res.render("orgmain", {
      user: req.session.user,
      messages: req.session.user.messages,
    });
  } else {
    res.status(400).send("LOGIN TO VIEW");
  }
});

module.exports = router;
