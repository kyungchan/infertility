const express = require("express");
const router = express.Router();

const auth = require("../modules/authorization.js");
const userModel = require("../odm/user");

const tag = "[users.js]";
router.get("/", function (req, res) {
  auth.decodeToken(req.cookies.token).then((token) => {
    if (token.rule == "admin") {
      // admin 만
      userModel
        .find({}, { id: 1, name: 1, rule: 1, createdAt: 1 })
        .sort({ _id: -1 })
        .then((users) => {
          res.status(200).json(users);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(404);
        });
    } else {
      res.sendStatus(401);
    }
  });
});

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

router.get("/likes", function (req, res) {
  auth
    .decodeToken(req.cookies.token)
    .then((decoded) => {
      const page = req.query.page || 1;
      if (page != 0)
        userModel
          .aggregate([
            { $match: { id: decoded.id } },
            { $limit: 1 },
            {
              $project: {
                total: { $size: "$likes" },
                likes: {
                  $slice: [
                    "$likes",
                    -10 * page,
                    {
                      $cond: [
                        { $gte: [{ $size: "$likes" }, page * 10] },
                        10,
                        {
                          $subtract: [{ $size: "$likes" }, (page - 1) * 10],
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              $unwind: { path: "$likes", includeArrayIndex: "row" }, // lookup stage에서 망가지는 순서를 지키기위해
            },
            {
              $lookup: {
                from: "posts",
                localField: "likes",
                foreignField: "_id",
                as: "likes",
              },
            },
          ])
          .then((result) => {
            let resultLikes = [];
            result.forEach((e) => {
              resultLikes.push(e.likes[0]);
            });
            console.log(resultLikes);
            res.status(200).json({
              likes: resultLikes,
              total: result[0].total,
            });
          })
          .catch((err) => {
            console.log(err);
            // 좋아요가 0개일때
            if (err.code == 28729)
              return res.status(200).json({
                likes: [],
                total: 0,
              });
            res.sendStatus(200);
          });
      else
        userModel
          .findOne({ id: decoded.id }, { likes: 1 })
          .then((result) => {
            res.status(200).json({
              likes: result.likes,
            });
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(200);
          });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

router.post("/likes", function (req, res) {
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

router.get("/history/count", function (req, res) {
  auth
    .decodeToken(req.cookies.token)
    .then((decoded) => {
      userModel
        .aggregate([
          { $match: { id: decoded.id } },
          { $limit: 1 },
          {
            $project: {
              total: { $size: "$history" },
              id: 1,
            },
          },
        ])
        .then((result) => {
          res.status(200).json({ count: result[0].total });
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(401);
    });
});

router.get("/history", function (req, res) {
  auth
    .decodeToken(req.cookies.token)
    .then((decoded) => {
      const page = req.query.page || 1;
      userModel
        .aggregate([
          { $match: { id: decoded.id } },
          { $limit: 1 },
          {
            $project: {
              total: { $size: "$history" },
              history: {
                $slice: [
                  "$history",
                  -10 * page,
                  {
                    $cond: [
                      { $gte: [{ $size: "$history" }, page * 10] },
                      10,
                      {
                        $subtract: [{ $size: "$history" }, (page - 1) * 10],
                      },
                    ],
                  },
                ],
              },
            },
          },
          {
            $unwind: { path: "$history", includeArrayIndex: "row" }, // lookup stage에서 망가지는 순서를 지키기위해
          },
          {
            $lookup: {
              from: "posts",
              localField: "history",
              foreignField: "_id",
              as: "history",
            },
          },
        ])
        .then((result) => {
          let resultHistory = [];
          result.forEach((e) => {
            resultHistory.push(e.history[0]);
          });
          res.status(200).json({
            posts: resultHistory,
            total: result[0].total,
          });
        })
        .catch((err) => {
          // 좋아요가 0개일때
          if (err.code == 28729)
            return res.status(200).json({
              likes: [],
              total: 0,
            });
          console.log(err);
          res.sendStatus(200);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(401);
    });
});

router.patch("/history", function (req, res) {
  auth
    .decodeToken(req.cookies.token)
    .then((decoded) => {
      userModel
        .findOneAndUpdate(
          { id: decoded.id },
          { $addToSet: { history: req.body.post } },
          { projection: { history: 1 }, new: true }
        )
        .then((result) => {
          res.status(201).json({ count: result.history.length });
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
      // 요청한 사용자의 토큰과 변경하려는 ID가 같거나 ADMIN일 경우
      if (decoded.id == req.body.userId || decoded.rule == "admin") {
        console.log(req.body);
        userModel
          .findOne({ id: req.body.userId || decoded.id })
          .then((user) => {
            user.password = req.body.password;
            user
              .save()
              .then(() => {
                res.sendStatus(200);
              })
              .catch((err) => {
                console.log(err);
                throw err;
              });
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(404);
          });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(401);
    });
});

module.exports = router;
