const express = require('express');
const router = express.Router();

router.use('/user', require('./user.route'));
router.use('/products', require('./product.route'));
router.use('/blog', require('./blog.route'));
router.use('/category', require('./productCategory.route'));
module.exports = router;
