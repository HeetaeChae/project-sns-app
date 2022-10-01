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
        follow.save((err) => {
          if (err) return res.status(400).json({ success: false, err });
          return res
            .status(200)
            .json({ success: true, message: "팔로우 하였습니다." });
        });
      } else {
        const { userFrom, userTo } = doc[0];
        Follow.findOneAndDelete({ userFrom, userTo }).exec((err) => {
          if (err) return res.status(400).json({ success: false, err });
          return res
            .status(200)
            .json({ success: true, message: "팔로우를 끊었습니다. " });
        });
      }
    }
  );
});

router.post("/getFollow", (req, res) => {
  Follow.find({ userFrom: req.body.userFrom })
    .populate("userTo")
    .exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      const userToInfo = doc.map((userTo) => userTo.userTo);
      return res.status(200).json({ success: true, userToInfo });
    });
});

router.post("/getFollowingNumber", (req, res) => {
  Follow.find({ userFrom: req.body.userFrom }).exec((err, doc) => {
    if (err) return res.status(400).jons({ success: false, err });
    const followingNumber = doc.length;
    return res.status(200).json({ success: true, followingNumber });
  });
});

router.post("/getFollowerNumber", (req, res) => {
  Follow.find({ userTo: req.body.userFrom }).exec((err, doc) => {
    if (err) return res.status(400).jons({ success: false, err });
    const followerNumber = doc.length;
    return res.status(200).json({ success: true, followerNumber });
  });
});

module.exports = router;
