const asyncHandler = require('express-async-handler');
const brandService = require('../services/brand.service');
const httpError = require('http-errors');
const { validateMongodbId } = require('../validations/mongoID.validate');

const createBrand = asyncHandler(async (req, res, next) => {
  const dataBrand = req.body;
  const newBrand = await brandService.createBrand(dataBrand);
  if (!newBrand) {
    throw httpError.BadRequest('Error, The Brand is duplicated.');
  } else {
    res.status(201).json({
      status: 201,
      message: 'Created successfully',
      elements: newBrand,
      expose: {},
    });
  }
});

const getAllBrands = asyncHandler(async (req, res, next) => {
  const brands = await brandService.getAllBrands();
  res.status(200).json({
    status: 200,
    message: 'Got all Brand',
    elements: brands,
    expose: {},
  });
});

const getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);
  const brand = await brandService.getBrand(id);
  if (!brand) {
    throw httpError.BadRequest('Error, The brand is not found.');
  } else {
    res.status(200).json({
      status: 200,
      message: 'Got a brand',
      elements: brand,
      expose: {},
    });
  }
});

const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);

  const updatingData = req.body;
  const updatedBrand = await brandService.updateBrand(id, updatingData);
  if (!updatedBrand) {
    throw httpError.NotFound('Not found Brand with the proxvided ID');
  } else {
    res.status(200).json({
      status: 200,
      message: 'Update successfully',
      elements: updatedBrand,
      expose: {},
    });
  }
});

const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);

  const deletedBrand = await brandService.deleteBrand(id);
  if (!deletedBrand) {
    throw httpError.NotFound('Not found Brand with the proxvided ID');
  } else {
    res.status(200).json({
      status: 200,
      message: 'Deleted successfully',
      elements: deletedBrand,
      expose: {},
    });
  }
});

module.exports = {
  createBrand,
  updateBrand,
  getAllBrands,
  getBrand,
  deleteBrand,
};
