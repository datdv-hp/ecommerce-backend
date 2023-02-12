const mongoose = require('mongoose');
const httpError = require('http-errors');

const validateMongodbId = (id) => {
  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) {
    throw httpError.BadRequest('ID is not valid or not found');
  }
};

module.exports = { validateMongodbId };
