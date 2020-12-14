const express = require("express");
const router = express.Router();

const userModel = require("../odm/user");

router.patch("/", function (req, res) {
  userModel
    .update({ userId: req.body.userId }, { password: req.body.password })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

module.exports = router;
