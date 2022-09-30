import express from "express";
const router = express.Router();

import { Post } from "../models/Post";

router.post("/upload", (req, res) => {
  const post = new Post(req.body);
  post.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/delete", (req, res) => {
  Post.findOneAndDelete({ _id: req.body._id }).exec((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res
      .status(200)
      .json({ success: true, message: "포스트 삭제를 완료했습니다." });
  });
});

router.post("/getPost", (req, res) => {
  Post.find({ _id: req.body.postId })
    .populate("writer")
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, doc });
    });
});

module.exports = router;
