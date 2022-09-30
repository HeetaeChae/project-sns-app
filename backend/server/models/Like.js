const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
});

const Like = mongoose.model("Like", likeSchema);

module.exports = { Like };
