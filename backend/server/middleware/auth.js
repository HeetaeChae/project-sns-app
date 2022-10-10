const { User } = require("../models/User");

//인증 처리 수행
let auth = (req, res, next) => {
  //클라이언트의 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;
  //토큰을 복호화 한 후 유저 탐색
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    //없으면 인증 실패
    if (!user) return res.json({ isAuth: false, error: true });
    //유저가 있으면 인증 성공
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
