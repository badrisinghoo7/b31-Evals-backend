const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: { type: String, required: true, enum: ["PC", "TABLET", "MOBILE"] },
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = {
  PostModel,
};
