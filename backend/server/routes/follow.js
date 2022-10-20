import express from "express";
const router = express.Router();

import { Follow } from "../models/Follow";

router.post("/addFollow", (req, res) => {
  Follow.findOne({ userFrom: req.body.userFrom, userTo: req.body.userTo }).exec(
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      if (!doc) {
        const follow = new Follow(req.body);
        follow.save((err, doc) => {
          if (err) return res.status(400).json({ success: false, err });
          Follow.findOne({
            userFrom: req.body.userFrom,
            userTo: req.body.userTo,
          })
            .populate("userTo")
            .exec((err, doc) => {
              if (err) return res.status(400).json({ success: false, err });
              return res
                .status(200)
                .json({ success: true, doc, isFollow: true });
            });
        });
      } else {
        Follow.findOneAndDelete({
          userFrom: req.body.userFrom,
          userTo: req.body.userTo,
        })
          .populate("userTo")
          .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            return res
              .status(200)
              .json({ success: true, doc, isFollow: false });
          });
      }
    }
  );
});

router.post("/getFollow", (req, res) => {
  Follow.findOne({ userFrom: req.body.userFrom, userTo: req.body.userTo }).exec(
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      if (!doc) {
        return res.status(200).json({ success: true, isFollow: false });
      } else {
        return res.status(200).json({ success: true, isFollow: true });
      }
    }
  );
});

router.post("/getFollower", (req, res) => {
  Follow.find({ userTo: req.body.userId })
    //여기서 찾은 doc중에 userFrom팔로우 중에 내 id가 userFrom이면 내가 팔로우 한 사람임.
    //doc을 userTo로 놓고 user
    .populate("userFrom")
    .exec((err, doc) => {
      if (err) return res.status(400).jons({ success: false, err });
      return res.status(200).json({ success: true, doc });
    });
});

router.post("/getFollowing", (req, res) => {
  Follow.find({ userFrom: req.body.userId })
    .populate("userTo")
    .exec((err, doc) => {
      if (err) return res.status(400).jons({ success: false, err });
      return res.status(200).json({ success: true, doc });
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
