const express = require("express");
const router = express.Router();

const auth = require("../modules/authorization.js");
const userModel = require("../odm/user.js");

router.post("/check", function (req, res) {
  auth
    .decodeToken(req.cookies.token)
    .then((decoded) => {
      res.status(200).json({
        rule: decoded.rule,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(401);
    });
});

router.post("/refresh", function (req, res) {
  auth
    .decodeToken(req.cookies.token)
    .then((decoded) => {
      auth
        .createToken({
          userId: decoded.userId,
          rule: decoded.rule,
        })
        .then((token) => {
          res
            .cookie("token", token, {
              maxAge: 7200000,
              httpOnly: true,
            })
            .status(200)
            .json({
              user: {
                rule: decoded.rule,
              },
            });
        })
        .catch((err) => {
          // 토큰 생성 실패
          console.log(err);
          res.sendStatus(401);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(401);
    });
});

router.post("/signin", function (req, res) {
  userModel
    .findOne({ userId: req.body.userId }, { _id: 0, __v: 0 })
    .exec()
    .then((user) => {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) {
          console.log(err);
          throw err;
        }
        if (isMatch) {
          auth
            .createToken({
              userId: user.userId,
              rule: user.rule,
            })
            .then((token) => {
              res
                .cookie("token", token, {
                  maxAge: 7200000,
                  httpOnly: true,
                })
                .status(200)
                .json({
                  user: {
                    rule: user.rule,
                  },
                });
            })
            .catch((err) => {
              // 토큰 생성 실패
              console.log(err);
              res.sendStatus(401);
            });
        } else {
          // 비밀번호 틀림
          res.sendStatus(403);
        }
      });
    })
    .catch((err) => {
      // 없는 ID
      console.log(err);
      res.sendStatus(403);
    });
});

router.post("/signout", function (req, res) {
  res.clearCookie("token").sendStatus(200);
});

module.exports = router;
