const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
  user: String,
  postId: String,
});

const Like = mongoose.model("Like", likeSchema);

module.exports = { Like };
