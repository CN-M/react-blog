const router = require('express').Router();

const {
  getPosts,
  getCategoryPosts,
  postDetail,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

router.route('/')
  .get(getPosts)
  .post(createPost);

router.route('/category/:category')
  .get(getCategoryPosts);

router.route('/:slug')
  .get(postDetail)
  .put(updatePost)
  .delete(deletePost);

module.exports = router;
