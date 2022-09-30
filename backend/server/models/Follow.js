const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const followSchema = mongoose.Schema({
  userFrom: { type: Schema.Types.ObjectId, ref: "User" },
  userTo: { type: Schema.Types.ObjectId, ref: "User" },
  date: String,
});

const Follow = mongoose.model("Follow", followSchema);

module.exports = { Follow };
