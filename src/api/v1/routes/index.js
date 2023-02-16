const express = require('express');
const router = express.Router();

router.use('/user', require('./user.route'));
router.use('/products', require('./product.route'));
router.use('/blog', require('./blog.route'));
router.use('/product-category', require('./productCategory.route'));
router.use('/blog-category', require('./blogCategory.route'));
router.use('/brand', require('./brand.route'));

module.exports = router;
