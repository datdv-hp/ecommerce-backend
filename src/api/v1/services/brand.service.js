const { Brand } = require('../models/brand.model');
const createBrand = async (brandData) => {
  try {
    const newBrand = await Brand.create(brandData);
    return newBrand;
  } catch (error) {
    throw new Error(error);
  }
};

const updateBrand = async (id, updatingData) => {
  try {
    const newBrand = await Brand.findByIdAndUpdate(id, updatingData, {
      new: true,
    });
    return newBrand;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllBrands = async () => {
  try {
    const brands = await Brand.find();
    return brands;
  } catch (error) {
    throw new Error(error);
  }
};

const getBrand = async (id) => {
  try {
    const brand = await Brand.findById(id).select('-__v');
    return brand;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteBrand = async (id) => {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id).select('title');
    return deletedBrand;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createBrand,
  updateBrand,
  getAllBrands,
  getBrand,
  deleteBrand,
};
