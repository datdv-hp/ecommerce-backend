const express = require('express');
const router = express.Router();

router.use('/user', require('./user.route'));
router.use('/products', require('./product.route'));
router.use('/blog', require('./blog.route'));

module.exports = router;
