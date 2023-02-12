const notFound = (req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'Not found!',
  });
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = { notFound, errorHandler };
