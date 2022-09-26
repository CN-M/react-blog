const Category = require('../models/Category');

// Get All Categories // GET // Complete
exports.getCategories = async (req, res, next) => {
  const categories = await Category.find();
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(400);
    throw new Error('No categories found Gay');
  }
};

// Get Specific Category // GET // Complete
exports.categoryDetail = async (req, res, next) => {
  const category = await Category.findOne({ name: req.params.category.toLowerCase() });
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(400);
    throw new Error('Category not found');
  }
};

// Create New Catagory // POST // Complete
exports.createCategory = async (req, res, next) => {
  const name = req.body.name.toLowerCase();

  if (!name) {
    res.status(400);
    throw new Error('Please fill in all fields');
  }

  // Does this category already exist?
  const categoryExist = await Category.findOne({ name });
  if (categoryExist) {
    res.status(400);
    throw new Error('Category already exists');
  }

  const category = await Category.create({ name });
  res.status(200).json(category);
};

// Update a catagory // PUT // Complete
exports.updateCategory = async (req, res, next) => {
  const category = await Category.findOne({ name: req.params.category });
  if (!category) {
    res.status(400);
    throw new Error('Category does not exist');
  }

  // const updatedCategory = await Category.findOne(req.params.category);
  const updatedCategory = await Category.findOneAndUpdate({ name: req.params.category }, { name: req.body.name.toLowerCase() }, { new: true });
  res.status(200).json(updatedCategory);
};

// Delete a specifc catagory // DELETE // Complete
exports.deleteCategory = async (req, res, next) => {
  const category = await Category.findOne({ name: req.params.category.toLowerCase() });
  if (!category) {
    res.status(400);
    throw new Error('Category does not exist');
  }
  await category.remove();
  res.status(200).json(`Category ${req.params.category} has been deleted`);
};
