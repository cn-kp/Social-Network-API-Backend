const router = require("express").Router();

const {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers).post(createUser);

router.route('/:id').get(getOneUser).delete(deleteUser).put(updateUser);

router.route('/friends/:id/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;