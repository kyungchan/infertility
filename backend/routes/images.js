const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/board/image");
    },
    filename(req, file, cb) {
      const extention = path.extname(file.originalname);
      cb(
        null,
        new Date().valueOf() + Math.floor(Math.random() * 10) + extention
      );
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.post("/", upload.single("image"), (req, res) => {
  res.status(201).json(req.file.filename);
});
module.exports = router;
