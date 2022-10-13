import express from "express";
const router = express.Router();

import { Comment } from "../models/Comment";

router.post("/getComment", (req, res) => {
  Comment.find({ postId: req.body.postId })
    .sort({ date: -1 })
    .populate("writer")
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, doc });
    });
});

router.post("/addComment", (req, res) => {
  const comment = new Comment(req.body);
  comment.save((err, comment) => {
    if (err) return res.status(400).json({ success: false, err });
    Comment.findOne({ _id: comment._id })
      .populate("writer")
      .exec((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, doc });
      });
  });
});

router.post("/deleteComment", (req, res) => {
  Comment.findOneAndDelete({ _id: req.body.commentId }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
