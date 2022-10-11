import express from "express";
import multer from "multer";

import { Post } from "../models/Post";
const router = express.Router();

router.post("/addPost", (req, res) => {
  const post = new Post(req.body);
  post.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/deletePost", (req, res) => {
  Post.findOneAndDelete({ _id: req.body._id }).exec((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res
      .status(200)
      .json({ success: true, message: "포스트 삭제를 완료했습니다." });
  });
});

router.get("/getPost", (req, res) => {
  Post.find({})
    .populate("writer")
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, doc });
    });
});

router.post("/getMyPost", (req, res) => {
  Post.find({ _id: req.body.postId })
    .populate("writer")
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, doc });
    });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  //이미지 파일 저장하기
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
