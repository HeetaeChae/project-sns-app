import express from "express";
const router = express.Router();

import { Like } from "../models/Like";

router.post("/addLike", (req, res) => {
  Like.find({ user: req.body.user, postId: req.body.postId }).exec(
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      if (doc.length === 0) {
        const like = new Like(req.body);
        like.save((err) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, isLike: true });
        });
      } else {
        Like.findOneAndDelete({
          user: req.body.user,
          postId: req.body.postId,
        }).exec((err) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, isLike: false });
        });
      }
    }
  );
});

router.post("/getLike", (req, res) => {
  //postId와 같은 Like들을 가져옴.
  Like.find({ postId: req.body.postId }).exec((err, likes) => {
    if (err) return res.status(400).json({ success: false, err });
    let likeNum = 0;
    let isLike = false;
    //로그인을 했을 때, 해당 유저가 like를 했는지
    if (req.body.user) {
      likes.forEach((like) => {
        if (like.user === req.body.user) {
          return (isLike = true);
        }
      });
    }
    //like의 숫자가 몇 개인지
    if (likes.length !== 0) {
      likeNum = likes.length;
    }
    return res.status(200).json({ success: true, likeNum, isLike });
  });
});

module.exports = router;
