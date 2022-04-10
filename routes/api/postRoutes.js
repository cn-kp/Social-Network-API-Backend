const router = require("express").Router();

const {
  getAllPost,
  getOnePost,
  createPost,
  deletePost,
  updatePost,
  addReaction,
  removeReaction,
} = require("../../controllers/postController");

router.route('/').get(getAllPost);

router.route('/:id').get(getOnePost).post(createPost).delete(deletePost).put(updatePost);

router.route('/reaction/:id').post(addReaction)

router.route('/reaction/:id/:reactionId').delete(removeReaction)

module.exports = router;