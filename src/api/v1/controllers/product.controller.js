const asyncHandler = require('express-async-handler');
const { validateMongodbId } = require('../helpers/validateMongodbId.helper');
const productService = require('../services/product.service');
const { validateProduct } = require('../validations/product.validate');
const httpError = require('http-errors');

const createProduct = asyncHandler(async (req, res, next) => {
  const productData = req.body;
  validateProduct(req.body);
  const newProduct = await productService.createProduct(productData);
  res.status(201).json({
    status: 201,
    message: 'Created successfully',
    elements: newProduct,
    expose: {},
  });
});

const getAllProducts = asyncHandler(async (req, res, next) => {
  const queries = { ...req.query };
  console.log(`queries>>> ${JSON.stringify(queries)}`);
  const { foundProducts, pagination } = await productService.getAllProducts(
    queries
  );
  res.status(200).json({
    status: 200,
    message: 'OK! Got all products',
    elements: foundProducts,
    expose: { pagination },
  });
});

const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);

  const foundProduct = await productService.getProduct(id);
  if (!foundProduct) {
    throw httpError.BadRequest(
      "The product doesn't found with your provided ID"
    );
  } else {
    res.status(200).json({
      status: 200,
      message: 'OK! Found an product',
      elements: foundProduct,
      expose: {},
    });
  }
});

const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);

  const updatingData = req.body;
  const updatedProduct = await productService.updateProduct(id, updatingData);
  if (!updatedProduct) {
    throw httpError.NotFound(
      'Not found any product with the provided ID to updating'
    );
  } else {
    res.status(200).json({
      status: 200,
      message: 'OK! Updated successfully',
      elements: updatedProduct,
      expose: {},
    });
  }
});

const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);

  const deletedProduct = await productService.deleteProduct(id);
  if (!deletedProduct) {
    throw httpError.NotFound(
      'Not found any product with the provided ID to deleting'
    );
  } else {
    res.status(200).json({
      status: 200,
      message: 'OK! Deleted successfully',
      elements: deletedProduct,
      expose: {},
    });
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
