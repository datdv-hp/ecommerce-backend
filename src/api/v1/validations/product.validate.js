const httpError = require('http-errors');

const validateProduct = (productData) => {
  if (
    !productData.title ||
    !productData.brand ||
    !productData.description ||
    !productData.price ||
    !productData.category ||
    !productData.quantity ||
    !productData.color
  ) {
    throw httpError.BadRequest('Missing Product infomation');
  }
};

module.exports = { validateProduct };
