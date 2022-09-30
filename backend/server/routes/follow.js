import express from "express";
const router = express.Router();

import { Follow } from "../models/Follow";

router.post("/add", (req, res) => {
  if (req.body.userFrom === req.body.userTo) {
    return res
      .status(200)
      .json({ success: false, message: "자신을 팔로우 할 수 없습니다." });
  }
  Follow.find({ userFrom: req.body.userFrom, userTo: req.body.userTo }).exec(
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      if (doc.length === 0) {
        const follow = new Follow(req.body);
        follow.save((err, doc) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, doc });
        });
      } else {
        return res
          .status(200)
          .json({ success: false, message: "이미 팔로우 하였습니다." });
      }
    }
  );
});

/*
router.post("/getPost", (req, res) => {
  Post.find({ _id: req.body.postId })
    .populate("writer")
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, doc });
    });
});
*/

module.exports = router;
