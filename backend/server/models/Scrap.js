const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScrapSchema = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  postId: { type: Schema.Types.ObjectId, ref: "Post" },
});

const Scrap = mongoose.model("Scrap", ScrapSchema);

module.exports = { Scrap };
