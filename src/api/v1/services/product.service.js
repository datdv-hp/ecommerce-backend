const { Product } = require('../models/product.model');
const slugify = require('slugify');

const createProduct = async (productData) => {
  try {
    productData.slug = slugify(productData.title, { lower: true });
    const newProduct = await Product.create(productData);
    return newProduct;
  } catch (error) {
    throw error;
  }
};

const getAllProducts = async (queries) => {
  try {
    const excludeFields = ['page', 'sort', 'limit', 'fields'];

    // filtering
    let queryStr = JSON.stringify(queries);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (matched) => `$${matched}`
    );

    const queryObj = await JSON.parse(queryStr);
    excludeFields.forEach((_) => {
      delete queryObj._;
    });

    // sorting
    let sortBy = queries.sort?.replace(/,/g, ' ') || '-createdAt'; // default sort by timestamp create, DESC

    // limiting fields
    let fields = queries.fields?.replace(/,/g, ' ') || '-__v'; // hide __v atrribute of product

    // pagination
    let page = queries.page || 1;
    const limit = queries.limit || 5;
    let skip = (page - 1) * limit;
    const total = await Product.countDocuments();
    if (skip >= total) {
      page = Math.ceil(total / limit);
      skip = limit * (page - 1);
    }

    const foundProducts = await Product.find(queryObj)
      .select(fields)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .exec();
    return { foundProducts, pagination: { page, limit, total } };
  } catch (error) {
    error;
  }
};

const getProduct = async (id) => {
  try {
    const foundProduct = await Product.findById(id);
    return foundProduct;
  } catch (error) {
    error;
  }
};

const updateProduct = async (id, updatingData) => {
  try {
    if (updatingData.title) {
      updatingData.slug = slugify(updatingData.title, { lower: true });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, updatingData, {
      new: true,
    });
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id, {
      select: '_id',
    });
    return deletedProduct;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
