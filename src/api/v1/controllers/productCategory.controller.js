const asyncHandler = require('express-async-handler');
const categoryService = require('../services/productCategory.service');
const httpError = require('http-errors');
const { validateMongodbId } = require('../validations/mongoID.validate');

const createCategory = asyncHandler(async (req, res, next) => {
  const dataCategory = req.body;
  const newCategory = await categoryService.createCategory(dataCategory);
  if (!newCategory) {
    throw httpError.BadRequest('Error, The category is duplicated.');
  } else {
    res.status(201).json({
      status: 201,
      message: 'Created successfully',
      elements: newCategory,
      expose: {},
    });
  }
});

const getAllCategory = asyncHandler(async (req, res, next) => {
  const categories = await categoryService.getAllCategory();
  res.status(201).json({
    status: 201,
    message: 'Got all category',
    elements: categories,
    expose: {},
  });
});

const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);
  const category = await categoryService.getCategory(id);
  if (!category) {
    throw httpError.BadRequest('Error, The category is not found.');
  } else {
    res.status(201).json({
      status: 201,
      message: 'Created successfully',
      elements: category,
      expose: {},
    });
  }
});

const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);

  const updatingData = req.body;
  const updateCategory = await categoryService.updateCategory(id, updatingData);
  if (!updateCategory) {
    throw httpError.NotFound('Not found category with the proxvided ID');
  } else {
    res.status(200).json({
      status: 200,
      message: 'Update successfully',
      elements: updateCategory,
      expose: {},
    });
  }
});

const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);

  const deletedCategory = await categoryService.deleteCategory(id);
  if (!deletedCategory) {
    throw httpError.NotFound('Not found category with the proxvided ID');
  } else {
    res.status(200).json({
      status: 200,
      message: 'Deleted successfully',
      elements: deletedCategory,
      expose: {},
    });
  }
});

module.exports = {
  createCategory,
  updateCategory,
  getAllCategory,
  getCategory,
  deleteCategory,
};
