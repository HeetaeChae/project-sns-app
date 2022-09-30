const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
  writer: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  image: [String],
  date: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
