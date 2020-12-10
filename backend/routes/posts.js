const express = require("express");
const router = express.Router();

const boardModel = require("../odm/post");

const tag = "[boards.js]";

router.get("/:boardCode", function (req, res) {
  const page = req.query.page || 1;
  boardModel
    .find({ boardCode: req.params.boardCode })
    .countDocuments()
    .then((count) => {
      boardModel
        .find({ boardCode: req.params.boardCode })
        .sort({ _id: -1 })
        .skip(10 * (page - 1))
        .limit(10)
        .then((result) => {
          res.status(200).json({ posts: result, count: count });
        })
        .catch((err) => {
          console.log(tag, err);
          res.sendStatus(404);
        });
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(400);
    });
});

router.post("/:boardCode", function (req, res) {
  boardModel
    .create({
      ...req.body,
      boardCode: req.params.boardCode,
    })
    .then((result) => {
      res.status(201).json({ _id: result._id });
    })
    .catch((err) => {
      res.sendStatus(400);
      console.log(tag, err);
    });
});

router.get("/:boardCode/:postId", function (req, res) {
  boardModel
    .findOneAndUpdate(
      { _id: req.params.postId },
      { $inc: { view: 1 } },
      { new: true }
    )
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(404);
    });
});

router.delete("/:boardCode/:postId", function (req, res) {
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
});

router.patch("/:boardCode/:postId", function (req, res) {
  boardModel
    .updateOne({
      _id: req.params.postId,
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(400);
    });
});

module.exports = router;
