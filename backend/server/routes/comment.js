import express from "express";
const router = express.Router();

import { Comment } from "../models/Comment";

router.post("/upload", (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/delete", (req, res) => {
  Comment.findOneAndDelete({ _id: req.body._id }).exec((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res
      .status(200)
      .json({ success: true, message: "코멘트 삭제를 완료했습니다." });
  });
});

router.post("/getComment", (req, res) => {
  Comment.find({ postId: req.body.postId })
    .populate("writer")
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, doc });
    });
});

module.exports = router;
