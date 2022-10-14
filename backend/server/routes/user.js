import express from "express";
const router = express.Router();

import { User } from "../models/User";
import { auth } from "../middleware/auth";

router.get("/getUser", (req, res) => {
  const token = req.cookies.token;
  if (token !== undefined) {
    User.findOne({ token }, (err, doc) => {
      return res.status(200).json({ success: true, doc });
    });
  } else {
    return res.status(200).json({ success: false });
  }
});

router.post("/editUser", (req, res) => {
  if (req.body.editType === "info") {
    User.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { nickname: req.body.nickname, intro: req.body.intro } }
    ).exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, doc });
    });
  } else if (req.body.editType === "image") {
    User.findOneAndUpdate(
      { _id: req.body._id },
      { $set: { image: req.body.image } }
    ).exec((err, doc) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true, doc });
    });
  }
});

router.post("/signup", (req, res) => {
  User.findOne({ email: req.body.email }, (err, doc) => {
    if (doc) {
      return res.status(200).json({ success: false, doc });
    }
    const user = new User(req.body);
    user.save((err, doc) => {
      return res.status(200).json({ success: true, doc });
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      res.status(401).json({ success: false, message: "이메일이 틀림" });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        res.status(401).json({ success: false, message: "비밀번호가 틀림" });
      }
      user.generateToken((err, user) => {
        res
          .cookie("token", user.token)
          .status(200)
          .json({ success: true, doc: user });
      });
    });
  });
});

router.get("/logout", (req, res) => {
  const token = req.cookies.token;
  User.findOne({ token }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.clearCookie("token").status(200).send({ success: true, doc });
  });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    user: req.user,
    isAuth: true,
  });
});

module.exports = router;
