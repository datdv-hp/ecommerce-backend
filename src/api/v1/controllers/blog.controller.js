module.exports = {};
const asyncHandler = require('express-async-handler');
const { validateBlog } = require('../validations/validate.blog');

const createBlog = asyncHandler(async (req, res, next) => {
    const blogData = req.body;
    validateBlog(blogData);

    const newBlog = await
});

module.exports = { createBlog };
