const express = require("express");
const router = express.Router();

const auth = require("../modules/authorization.js");
const userModel = require("../odm/user");

router.post("/", function (req, res) {
  userModel
    .create({
      id: req.body.id,
      password: req.body.password,
      name: req.body.name,
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      if (err.code == 11000) res.sendStatus(409);
      else res.sendStatus(400);
    });
});

router.patch("/", function (req, res) {
  auth
    .decodeToken(req.cookies.token)
    .then((decoded) => {
      userModel
        .updateOne({ id: decoded.id }, { password: req.body.password })
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(404);
        });
    })
    .catch(() => {
      res.sendStatus(401);
    });
});

module.exports = router;
