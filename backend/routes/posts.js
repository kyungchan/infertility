const express = require("express");
const router = express.Router();

const boardModel = require("../odm/post");

const tag = "[boards.js]";

router.get("/", async function (req, res) {
  //각 게시판마다 랜덤한 게시글 가져오기
  let o = {};
  o.map =
    "function () { if(this.boardCode<7) emit(this.boardCode, {'_id': this._id, 'title': this.title, 'createdAt': this.createdAt})}";
  o.reduce =
    "function (key, values) { const random = Math.floor(Math.random() * values.length); return values[random]; }";
  boardModel
    .mapReduce(o)
    .then((result) => {
      res.status(200).json(result.results);
    })
    .catch((err) => {
      console.log(tag, err);
    });
  // 속도 비교용 sample 6번 vs map reduce
  // let results = [];
  // await (async () => {
  //   for (let i = 1; i <= 6; i++) {
  //     let result = await boardModel.aggregate([
  //       { $match: { boardCode: i } },
  //       { $sample: { size: 1 } },
  //     ]);
  //     results.push(result[0]);
  //   }
  // })();
  // console.log(results);
  // res.json(results);
});

router.get("/:boardCode", function (req, res) {
  const page = req.query.page || 1;
  const findOption = { boardCode: req.params.boardCode };
  if (req.query.search) findOption["$text"] = { $search: req.query.search };

  boardModel
    .find(findOption)
    .countDocuments()
    .then((count) => {
      boardModel
        .find(findOption)
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
