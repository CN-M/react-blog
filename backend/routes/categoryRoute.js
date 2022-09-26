const router = require('express').Router();

const {
  getCategories,
  categoryDetail,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

router.route('/')
  .get(getCategories)
  .post(createCategory);

router.route('/:category')
  .get(categoryDetail)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
