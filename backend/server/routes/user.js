import express from "express";
const router = express.Router();

import { User } from "../models/User";
import { auth } from "../middleware/auth";

router.post("/signup", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.status(400).json({ success: false, message: "이메일이 틀림" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ success: false, message: "비밀번호가 틀림" });
      user.generateToken((err, user) => {
        if (err)
          return res
            .status(400)
            .send({ success: false, message: "토큰 생성 실패" });
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ success: true, doc: user });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true, message: "로그인 성공" });
  });
});

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    user: req.user,
    isAuth: true,
  });
});

module.exports = router;
