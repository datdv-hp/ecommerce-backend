const httpError = require('http-errors');

const validateBlog = (blogData) => {
  if (!blogData.title || !blogData.description || !blogData.category) {
    throw httpError.BadRequest('Missing Blog infomation');
  }
};

module.exports = { validateBlog };
