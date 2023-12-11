const express = require("express");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth.middleware");
const { PostModel } = require("../models/post.model");

const postRouter = express.Router();
// postRouter.use(auth);

postRouter.get("/", auth, async (req, res) => {
  try {
    if (req.query) {
      const post = await PostModel.find(req.query);
    } else {
      const post = await PostModel.find();
    }

    res.send({ msg: "post found", post });
  } catch (error) {
    res.send({ error: error });
  }
});

postRouter.post("/add", auth, async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.send({ msg: "A new Post has been added" });
  } catch (error) {
    res.send({ msg: error });
  }
});

postRouter.patch("/update/:id", auth, async (req, res) => {
  const { postID } = req.params;
  try {
    const post = await PostModel.findOne({ _id: postID });
    if (req.body.userID === post.userID) {
      await PostModel.findByIdAndUpdate({ _id: postID }, req.body);
      res.send({ msg: "post updated successfully", post });
    } else {
      res.send({ msg: "you are not allowed to update this post" });
    }
  } catch (error) {
    res.send({ msg: error });
  }
});

postRouter.delete("/delete/:id", auth, async (req, res) => {
  const { postID } = req.params;
  try {
    const post = await PostModel.findOne({ _id: postID });
    if (req.body.userID === post.userID) {
      await PostModel.findByIdAndDelete({ _id: postID }, req.body);
      res.send({ msg: "post Deleted successfully", post });
    } else {
      res.send({ msg: "you are not allowed to Delete this post" });
    }
  } catch (error) {
    res.send({ msg: error });
  }
});

module.exports = {
  postRouter,
};
