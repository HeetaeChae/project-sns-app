import express from "express";
const router = express.Router();

import { Like } from "../models/Like";

router.post("/add", (req, res) => {
  Like.find({ user: req.body.user, postId: req.body.postId }).exec(
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      if (doc.length === 0) {
        const like = new Like(req.body);
        like.save((err, doc) => {
          const likeNumber = doc.length;
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, doc: likeNumber });
        });
      } else {
        const { user, postId } = doc[0];
        Like.findOneAndDelete({ user, postId }).exec((err) => {
          const likeNumber = doc.length;
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, doc: likeNumber });
        });
      }
    }
  );
});

router.post("/getLike", (req, res) => {
  Like.find({ postId: req.body.postId }).exec((err, doc) => {
    const likeNumber = doc.length;
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc: likeNumber });
  });
});

module.exports = router;
