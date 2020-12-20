const express = require("express");
const router = express.Router();

const auth = require("../modules/authorization.js");
const userModel = require("../odm/user");

const tag = "[users.js]";

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

router.get("/like", function (req, res) {
  auth
    .decodeToken(req.cookies.token)
    .then((decoded) => {
      const page = req.query.page || 1;
      userModel
        .findOne({ id: decoded.id }, { likes: 1 })
        .then((result) => {
          let sendJson;
          if (page == 0) {
            sendJson = {
              likes: result.likes,
            };
          } else {
            sendJson = {
              likes: result.likes.slice(-10 * page, -10 * (page - 1)).reverse(),
              total: result.likes.length,
            };
          }
          res.status(200).json(sendJson);
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

router.post("/like", function (req, res) {
  auth
    .decodeToken(req.cookies.token)
    .then((decoded) => {
      let updateQuery = req.body.set
        ? { $push: { likes: req.body.postId } }
        : { $pull: { likes: req.body.postId } };
      userModel
        .updateOne({ id: decoded.id }, updateQuery)
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });
    })
    .catch(() => {
      res.sendStatus(401);
    });
});

router.get("/history", function (req, res) {
  auth
    .decodeToken(req.cookies.token)
    .then((decoded) => {
      userModel
        .findOne({ id: decoded.id })
        .populate("history")
        .then((result) => {
          res.status(200).json({ posts: result.history });
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

router.patch("/history", function (req, res) {
  auth
    .decodeToken(req.cookies.token)
    .then((decoded) => {
      userModel
        .findOne({ id: decoded.id })
        .then((result) => {
          if (!result.history.includes(req.body.post)) {
            result.history.push(req.body.post);
            result
              .save()
              .then(() => {
                res.sendStatus(201);
              })
              .catch((err) => {
                throw err;
              });
          } else {
            res.sendStatus(201);
          }
        })
        .catch((err) => {
          console.log(tag, err);
          res.sendStatus(400);
        });
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(401);
    });
});

router.patch("/password", function (req, res) {
  auth
    .decodeToken(req.cookies.token)
    .then((decoded) => {
      userModel
        .findOne({ id: decoded.id })
        .then((user) => {
          user.password = req.body.password;
          user
            .save()
            .then(() => {
              res.sendStatus(200);
            })
            .catch((err) => {
              throw err;
            });
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(404);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(401);
    });
});

module.exports = router;
