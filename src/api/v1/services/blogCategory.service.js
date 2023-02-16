const { BlogCategory } = require('../models/blogCategory.model');
const createCategory = async (categoryData) => {
  try {
    const newCategory = await BlogCategory.create(categoryData);
    return newCategory;
  } catch (error) {
    throw new Error(error);
  }
};

const updateCategory = async (id, updatingData) => {
  try {
    const newCategory = await BlogCategory.findByIdAndUpdate(id, updatingData, {
      new: true,
    });
    return newCategory;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllCategory = async () => {
  try {
    const categories = await BlogCategory.find();
    return categories;
  } catch (error) {
    throw new Error(error);
  }
};

const getCategory = async (id) => {
  try {
    const category = await BlogCategory.findById(id).select('-__v');
    return category;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCategory = async (id) => {
  try {
    const deletedCategory = await BlogCategory.findByIdAndDelete(id).select(
      'title'
    );
    return deletedCategory;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getAllCategory,
  getCategory,
  deleteCategory,
};
