import express from "express";
const router = express.Router();

import { Scrap } from "../models/Scrap";

router.post("/addScrap", (req, res) => {
  Scrap.find({ user: req.body.user, postId: req.body.postId }).exec(
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      if (doc.length === 0) {
        const scrap = new Scrap(req.body);
        scrap.save((err) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, isScrap: true });
        });
      } else {
        Scrap.findOneAndDelete({
          user: req.body.user,
          postId: req.body.postId,
        }).exec((err) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).json({ success: true, isScrap: false });
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
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, doc });
    });
});

router.post("/getIsScrap", (req, res) => {
  Scrap.find({ user: req.body.user, postId: req.body.postId }).exec(
    (err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      if (doc.length !== 0) {
        return res.status(200).json({ success: true, isScrap: true });
      } else {
        return res.status(200).json({ success: true, isScrap: false });
      }
    }
  );
});

router.post("/deleteScrap", (req, res) => {
  Scrap.findByIdAndDelete({ _id: req.body.scrapId }).exec((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
