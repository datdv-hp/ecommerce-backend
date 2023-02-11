const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { isAdmin, authMiddleware } = require('../middlewares/auth.middleware');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

router.use(authMiddleware, isAdmin);
router.post('/', productController.createProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
