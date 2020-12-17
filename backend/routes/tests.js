const express = require("express");
const router = express.Router();
const jsonexport = require("jsonexport");

const auth = require("../modules/authorization.js");
const testsModel = require("../odm/test");

const tag = "[tests.js]";

router.get("/", function (req, res) {
  // admin만
  auth
    .decodeToken(req.cookies.token)
    .then((token) => {
      if (token.rule == "admin") {
        testsModel
          .find({}, { surveyData: 0 })
          .then((result) => {
            res.status(200).json(result);
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

router.get("/title", function (req, res) {
  testsModel
    .find({}, { surveyData: 0, answers: 0 })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(400);
    });
});

router.post("/:testId", function (req, res) {
  testsModel
    .updateOne(
      { _id: req.params.testId },
      {
        $push: {
          answers: {
            testee: req.body.uid, // user의 _id
            answer: req.body.answer,
            score: req.body.score,
          },
        },
      }
    )
    .then((re) => {
      console.log(re);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(400);
    });
});

router.get("/:testId", function (req, res) {
  testsModel
    .findOne({ _id: req.params.testId }, { surveyData: 1 })
    .then((result) => {
      res.status(200).json(result.surveyData);
    })
    .catch((err) => {
      console.log(tag, err);
      res.sendStatus(400);
    });
});

router.get("/:testId/data", function (req, res) {
  // admin만
  auth
    .decodeToken(req.cookies.token)
    .then((token) => {
      if (token.rule == "admin") {
        testsModel
          .findOne({ _id: req.params.testId }, { surveyData: 1 })
          .then((result) => {
            res.status(200).json(result.surveyData);
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

router.get("/:testId/csv", function (req, res) {
  auth
    .decodeToken(req.cookies.token)
    .then((token) => {
      if (token.rule == "admin") {
        testsModel
          .aggregate([
            { $project: { "answers.answer": 1 } },
            { $unwind: "$answers" },
          ])
          .then((result) => {
            let jsonArray = [];
            result.forEach((e) => {
              jsonArray.push(e.answers.answer);
            });
            jsonexport(jsonArray, (err, csv) => {
              if (err) throw err;
              res.setHeader(
                "Content-disposition",
                "attachment; filename=data.csv"
              );
              res.set("Content-Type", "text/csv; charset=euc-kr");
              res.status(200).send(csv);
            });
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

module.exports = router;
