const { Blog } = require('../models/blog.model');
const User = require('../models/user.model');

const createBlog = async (blogData) => {
  try {
    const newBlog = await Blog.create(blogData);
    return newBlog;
  } catch (error) {
    throw error;
  }
};

const updateBlog = async (id, updateData) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return updatedBlog;
  } catch (error) {
    throw error;
  }
};

const getAllBlogs = async () => {};
const getBlog = async (id) => {
  try {
    const foundBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numberOfViews: 1 },
      },
      { new: true }
    )
      .populate('likes')
      .populate('dislikes');
    return foundBlog;
  } catch (error) {
    throw error;
  }
};

const deleteBlog = async (id) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id, {
      select: '_id',
    });
    return deletedBlog;
  } catch (error) {
    throw error;
  }
};

const likeBlog = async (blogId, loginUserId) => {
  try {
    const foundBlog = await Blog.findById(blogId);
    const isLiked = foundBlog?.isLiked;
    const alreadyDisliked = foundBlog?.dislikes.find(
      (userId) => userId.toString() === loginUserId.toString()
    );
    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      return blog;
    }

    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      return blog;
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      return blog;
    }
  } catch (error) {
    throw error;
  }
};

const dislikeBlog = async (blogId, loginUserId) => {
  try {
    const foundBlog = await Blog.findById(blogId);
    const isDisliked = foundBlog?.isDisliked;
    const alreadyLiked = foundBlog?.likes.find(
      (userId) => userId.toString() === loginUserId.toString()
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      return blog;
    }

    if (isDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      return blog;
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: loginUserId },
          isDisliked: true,
        },
        { new: true }
      );
      return blog;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
  likeBlog,
  getAllBlogs,
  dislikeBlog,
};
