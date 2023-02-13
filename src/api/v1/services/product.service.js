const { Product } = require('../models/product.model');
const slugify = require('slugify');
const { User } = require('../models/user.model');
const httpError = require('http-errors');

const createProduct = async (productData) => {
  try {
    productData.slug = slugify(productData.title, { lower: true });
    const newProduct = await Product.create(productData);
    return newProduct;
  } catch (error) {
    throw new Error(error);
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
    throw new Error(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(id, {
      select: '_id',
    });
    return deletedProduct;
  } catch (error) {
    throw new Error(error);
  }
};

const addProductToWishlist = async (userId, productId) => {
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      throw httpError.NotFound('Not found user by the provided ID');
    }
    const product = await Product.findById(productId);
    if (!product) {
      throw httpError.NotFound('Not found product by the provided ID');
    }

    const alreadyAdded = foundUser.wishlist.find(
      (id) => id.toString() === productId
    );
    if (alreadyAdded) {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $pull: { wishlist: productId },
        },
        {
          new: true,
        }
      );
      return user;
    } else {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: { wishlist: productId },
        },
        {
          new: true,
        }
      );
      return user;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const rating = async (userId, productId, comment = '', star) => {
  try {
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      throw httpError.NotFound('Not found user by the provided ID');
    }
    const product = await Product.findById(productId);
    if (!product) {
      throw httpError.NotFound('Not found product by the provided ID');
    }

    const alreadyRated = product.ratings.find(
      (rate) => rate?.postedBy.toString() === userId.toString()
    );
    if (alreadyRated) {
      await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { 'ratings.$.stars': star, 'ratings.$.comment': comment },
        },
        {
          new: true,
        }
      );
    } else {
      await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: { stars: star, comment: comment, postedBy: userId },
          },
        },
        {
          new: true,
        }
      );
    }

    // update total ratings
    const ratings = (await Product.findById(productId))?.ratings;
    let totalRating = ratings.length;
    let ratingSum = ratings
      .map((rate) => rate.stars)
      .reduce((prev, current) => prev + current, 0);
    let rating = Math.round(ratingSum / totalRating);
    const productRating = await Product.findByIdAndUpdate(
      productId,
      {
        totalRating: rating,
      },
      { new: true }
    );
    return productRating;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addProductToWishlist,
  rating,
};
