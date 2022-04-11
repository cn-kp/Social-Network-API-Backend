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

router.route('/').get(getAllPost).post(createPost);

router.route('/:id').get(getOnePost).delete(deletePost).put(updatePost);

router.route('/reaction/:id').post(addReaction)

router.route('/reaction/:id/:reactionId').delete(removeReaction)

module.exports = router;