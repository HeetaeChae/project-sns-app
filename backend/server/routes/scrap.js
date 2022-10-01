import express from "express";
const router = express.Router();

import { Scrap } from "../models/Scrap";

router.post("/add", (req, res) => {
  Scrap.find({ user: req.body.user, postId: req.body.postId }).exec(
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      if (doc.length === 0) {
        const scrap = new Scrap(req.body);
        scrap.save((err, doc) => {
          if (err) return res.status(400).json({ success: false, err });
          return res
            .status(200)
            .json({ success: true, message: "스크랩 완료" });
        });
      } else {
        const { user, postId } = doc[0];
        Scrap.findOneAndDelete({ user, postId }).exec((err) => {
          if (err) return res.status(400).json({ success: false, err });
          return res
            .status(200)
            .json({ success: true, message: "스크랩 삭제" });
        });
      }
    }
  );
});

router.post("/getScrap", (req, res) => {
  Scrap.find({ user: req.body.user })
    .populate({
      path: "postId",
      populate: {
        path: "writer",
      },
    })
    .exec((err, doc) => {
      const scrapNumber = doc.length;
      const postInfo = doc.map((scrapInfo) => scrapInfo.postId);
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, postInfo, scrapNumber });
    });
});

module.exports = router;
