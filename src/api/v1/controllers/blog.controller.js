module.exports = {};
const asyncHandler = require('express-async-handler');
const { validateBlog } = require('../validations/blog.validate');
const blogService = require('../services/blog.service');
const httpError = require('http-errors');
const { validateMongodbId } = require('../validations/mongoID.validate');

const createBlog = asyncHandler(async (req, res, next) => {
  const blogData = req.body;
  validateBlog(blogData);

  const newBlog = await blogService.createBlog(blogData);
  if (!newBlog) {
    throw httpError.InternalServerError(
      "InternalServerError. Blog isn't created"
    );
  } else {
    res.status(201).json({
      status: 201,
      message: 'Created successfully',
      elements: newBlog,
      expose: {},
    });
  }
});

const updateBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);
  const updateData = req.body;

  const updatedBlog = await blogService.updateBlog(id, updateData);
  console.log(JSON.stringify(updatedBlog));
  if (!updateBlog) {
    throw httpError.BadRequest('Blog ID does not exist');
  } else {
    res.status(200).json({
      status: 200,
      message: 'Updated successfully',
      elements: updatedBlog,
      expose: {},
    });
  }
});

const getBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);

  const foundBlog = await blogService.getBlog(id);
  if (!foundBlog) {
    throw httpError.BadRequest('Blog ID does not exist');
  } else {
    res.status(200).json({
      status: 200,
      message: 'Found a blog',
      elements: foundBlog,
      expose: {},
    });
  }
});

const deleteBlog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongodbId(id);

  const deleteBlog = await blogService.deleteBlog(id);
  if (!deleteBlog) {
    throw httpError.BadRequest('Blog ID does not exist');
  } else {
    res.status(200).json({
      status: 200,
      message: 'Deleted a blog',
      elements: deleteBlog,
      expose: {},
    });
  }
});

const likeBlog = asyncHandler(async (req, res, next) => {
  const { blogId } = req.body;
  validateMongodbId(blogId);

  const loginUserId = req?.user?._id;
  const likedBlog = await blogService.likeBlog(blogId, loginUserId);
  if (!likedBlog) {
    throw httpError.BadRequest('Blog ID does not exist to like');
  } else {
    res.status(200).json({
      status: 200,
      message: 'Liked a blog',
      elements: likedBlog,
      expose: {},
    });
  }
});

const dislikeBlog = asyncHandler(async (req, res, next) => {
  const { blogId } = req.body;
  validateMongodbId(blogId);

  const loginUserId = req?.user?._id;
  const dislikedBlog = await blogService.dislikeBlog(blogId, loginUserId);
  if (!dislikedBlog) {
    throw httpError.BadRequest('Blog ID does not exist to like');
  } else {
    res.status(200).json({
      status: 200,
      message: 'Disliked a blog',
      elements: dislikedBlog,
      expose: {},
    });
  }
});
const getAllBlogs = asyncHandler(async (req, res, next) => {});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  getAllBlogs,
};
