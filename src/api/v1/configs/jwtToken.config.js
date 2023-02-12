const jwt = require('jsonwebtoken');

const { JWT_ACCESS_SECRET } = process.env;

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_ACCESS_SECRET, { expiresIn: '1h' });
};

module.exports = { generateToken };
