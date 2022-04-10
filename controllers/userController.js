const { User, Post } = require("../models");

module.exports = {
    // find all users
  getAllUsers(req, res) {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err.message));
  },
  // find user by id
  getOneUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select("-__v")
      .then((users) => {
        if (!users) {
          res.status(404).json({ message: "no user found with this id" });
        } else {
          res.json(users);
        }
      });
  },
  // create user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },
  // delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id }).then((user) => {
      if (!user) {
        res.status(404).json({ message: "no user found with this id" });
      } else {
        res.json(user);
      }
    });
  },
  // update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    ).then((user) => {
      if (!user) {
        res.status(404).json({ message: "no user found with this id" });
      } else {
        res.json(user);
      }
    });
  },
  // add friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "no user found with this id!" });
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  // remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user found with this id!" });
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },
};
