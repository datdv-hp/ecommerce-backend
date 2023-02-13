const { Category } = require('../models/productCategory.model');
const createCategory = async (categoryData) => {
  try {
    const newCategory = await Category.create(categoryData);
    return newCategory;
  } catch (error) {
    throw error;
  }
};

const updateCategory = async (id, updatingData) => {
  try {
    const newCategory = await Category.findByIdAndUpdate(id, updatingData, {
      new: true,
    });
    return newCategory;
  } catch (error) {
    throw error;
  }
};

const getAllCategory = async () => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (error) {
    throw error;
  }
};

const getCategory = async (id) => {
  try {
    const category = await Category.findById(id).select('-__v');
    return category;
  } catch (error) {
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(id).select(
      'title'
    );
    return deletedCategory;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getAllCategory,
  getCategory,
  deleteCategory,
};
