const express = require("express");
const router = express.Router();

const boardModel = require("../odm/post");
const auth = require("../modules/authorization.js");
const boardInfo = require("../modules/boardInfo");

const tag = "[posts.js]";

router.get("/", function (req, res) {
  //각 게시판마다 랜덤한 게시글 가져오기
  let o = {};
  o.map =
    "function () { if(this.boardCode<7) emit(this.boardCode, {'_id': this._id, 'title': this.title, 'createdAt': this.createdAt})}";
  o.reduce =
    "function (key, values) { if(key==0) return {value: values}; const random = Math.floor(Math.random() * values.length); return values[random]; }";
  boardModel
    .mapReduce(o)
    .then((result) => {
      res.status(200).json(result.results);
    })
    .catch((err) => {
      console.log(tag, err);
    });
});
router.get("/search", function (req, res) {
  const page = req.query.page || 1;
  const searchQuery = req.query.query;
  if (!searchQuery) res.sendStatus(404);
  boardModel
    .aggregate([
      {
        $match: {
          $text: { $search: searchQuery },
        },
      },
      { $sort: { _id: -1 } },
      {
        $group: {
          _id: null,
          result: { $push: "$$ROOT" },
          count: { $sum: 1 },
        },
      },
      { $unwind: "$result" },
      { $skip: 10 * (page - 1) },
      { $limit: 10 },
    ])
    .then((result) => {
      const posts = [];
      result.forEach((e) => {
        posts.push(e.result);
      });
      res
        .status(200)
        .json({ posts: posts, count: result.length ? result[0].count : 0 });
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(400);
    });
});

router.get("/recent", function (req, res) {
  boardModel
    .find({
      createdAt: {
        $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7일전
      },
    })
    .sort({ createdAt: -1 })
    .limit(10)
    .then((result) => {
      console.log(result);
      res.status(200).json({ posts: result });
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(400);
    });
});

router.get("/:boardCode", function (req, res) {
  const page = req.query.page || 1;
  const aggregateOptions = [
    {
      $match: {
        $text: { $search: req.query.search },
      },
    },
    {
      $match: {
        boardCode: req.params.boardCode * 1,
      },
    },
    {
      $sort: { _id: -1 },
    },
    {
      $group: {
        _id: null,
        result: { $push: "$$ROOT" },
        count: { $sum: 1 },
      },
    },
    { $unwind: "$result" },
    { $skip: 10 * (page - 1) },
    { $limit: 10 },
  ];
  if (!req.query.search) aggregateOptions.shift();
  boardModel
    .aggregate(aggregateOptions)
    .then((result) => {
      const posts = [];
      result.forEach((e) => {
        posts.push(e.result);
      });
      res
        .status(200)
        .json({ posts: posts, count: result.length ? result[0].count : 0 });
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(400);
    });
});

router.post("/:boardCode", function (req, res) {
  // admin만
  auth
    .decodeToken(req.cookies.token)
    .then((token) => {
      if (token.rule == "admin") {
        boardModel
          .create({
            ...req.body,
            boardCode: req.params.boardCode,
          })
          .then((result) => {
            boardInfo.setRecentCount();
            res.status(201).json({ _id: result._id });
          })
          .catch((err) => {
            res.sendStatus(400);
            console.log(tag, err);
          });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(401);
    });
});

router.get("/:boardCode/:postId", function (req, res) {
  let updateQuery = {};
  if (!req.query.editmode) updateQuery = { $inc: { view: 1 } };
  boardModel
    .findOneAndUpdate({ _id: req.params.postId }, updateQuery, { new: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(404);
    });
});

router.delete("/:boardCode/:postId", function (req, res) {
  // admin만
  auth
    .decodeToken(req.cookies.token)
    .then((token) => {
      if (token.rule == "admin") {
        boardModel
          .deleteOne({
            _id: req.params.postId,
          })
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => {
            console.log(tag, err);
            res.sendStatus(400);
          });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(401);
    });
});

router.patch("/:boardCode/:postId", function (req, res) {
  // admin만
  auth
    .decodeToken(req.cookies.token)
    .then((token) => {
      if (token.rule == "admin") {
        boardModel
          .updateOne(
            {
              _id: req.params.postId,
            },
            req.body
          )
          .then(() => {
            res.sendStatus(200);
          })
          .catch((err) => {
            console.log(tag, err);
            res.sendStatus(400);
          });
      } else {
        req.sendStatus(401);
      }
    })
    .catch((err) => {
      console.log(tag, err);
      req.sendStatus(401);
    });
});

module.exports = router;
