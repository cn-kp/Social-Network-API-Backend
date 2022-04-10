const { User, Post, Reaction } = require("../models");

module.exports = {
  // find all post
  getAllPost(req, res) {
    Post.find()
      .then((post) => res.json(post))
      .catch((err) => res.status(500).json(err));
  },
  // find post by id
  getOneUser(req, res) {
    Post.findOne({ _id: req.params.id })
      .select("-__v")
      .then((post) => {
        if (!post) {
          res.status(404).json({ message: "no post found with this id" });
        } else {
          res.json(post);
        }
      });
  },
  // create post, need to tie it to user
  createPost(req, res) {
    Post.create(req.body)
      .then(({ _id }) => {
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { posts: _id } },
          { new: true }
        );
      })
      .then((post) => res.json(post))
      .catch((err) => res.status(400).json(err));
  },
  // delete post, not sure if i have to pull it from the user post as well
  deletePost(req, res) {
    User.findOneAndDelete({ _id: req.params.id }).then((post) => {
      if (!post) {
        res.status(404).json({ message: "no post found with this id" });
      } else {
        res.json(post);
      }
    });
  },
  // update post
  updatePost(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    ).then((post) => {
      if (!post) {
        res.status(404).json({ message: "no post found with this id" });
      } else {
        res.json(post);
      }
    });
  },
  // add reaction (comments)
  addReaction(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reactions: req.body } },
      { runValidators: true }
    )
      .then((post) => {
        if (!post) {
          res.status(404).json({ message: "no post found with this id!" });
        }
        res.json(post);
      })
      .catch((err) => res.status(400).json(err));
  },

  // remove reaction (comment)
  removeReaction(req, res) {
    Post.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: req.params.reactionId } },
      { runValidators: true }
    )
      .then((post) => {
        if (!post) {
          res.status(404).json({ message: "No post found with this id!" });
        }
        res.json(post);
      })
      .catch((err) => res.status(400).json(err));
  },
};
