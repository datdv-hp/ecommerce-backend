const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');
const httpError = require('http-errors');
const asyncHandler = require('express-async-handler');

const { JWT_ACCESS_SECRET } = process.env;

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw httpError.Unauthorized('There is no token attached to header');
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
    console.log(`decoded::: ${decoded}`);
    const user = await User.findById(decoded?.id);
    req.user = user;
    next();
  } catch (error) {
    throw httpError.Forbidden(`${error.name}: ${error.message}`);
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  console.log(req?.user);
  const adminUser = await User.findOne({ email });
  if (adminUser?.role === 'admin') {
    next();
  } else {
    throw httpError.Forbidden('You are not an admin');
  }
});

module.exports = { authMiddleware, isAdmin };
