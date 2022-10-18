import express from "express";
import multer from "multer";

import { Post } from "../models/Post";
const router = express.Router();

router.post("/addPost", (req, res) => {
  const post = new Post(req.body);
  post.save((err, post) => {
    if (err) return res.status(400).json({ success: false, err });
    Post.findOne({ _id: post._id })
      .populate("writer")
      .exec((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, doc });
      });
  });
});

router.post("/editPost", (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { content: req.body.content, image: req.body.image } },
    { new: true }
  ).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/deletePost", (req, res) => {
  Post.findOneAndDelete({ _id: req.body.postId }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/getPost", (req, res) => {
  if (req.body.skip) {
    Post.find({})
      .limit(8)
      .skip(req.body.skip)
      .sort({ date: -1 })
      .populate("writer")
      .exec((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, doc });
      });
  } else {
    Post.find({})
      .limit(8)
      .sort({ date: -1 })
      .populate("writer")
      .exec((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, doc });
      });
  }
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
