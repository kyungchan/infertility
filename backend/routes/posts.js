const tag = "[boards.js]";

import sanitizeHtml from "sanitize-html";

const express = require("express");
const router = express.Router();

const boardModel = require("../odm/post");

const getPreview = (content) => {
  return sanitizeHtml(content).substr(0, 100);
};

router.get("/:boardCode", function (req, res) {
  const page = req.params.page || 1;
  boardModel
    .find({ boardCode: req.params.boardCode })
    .skip(10 * (page - 1))
    .limit(10)
    .then((result) => {
      res.statusCode(200).json(result);
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(404);
    });
});

router.post("/:boardCode", function (req, res) {
  boardModel
    .create({ ...req.params, preview: sanitizeHtml(req.params.content) })
    .then(() => {
      res.sendStatus(201);
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
