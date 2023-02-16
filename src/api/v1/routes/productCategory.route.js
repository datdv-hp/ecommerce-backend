const express = require('express');
const productCategoryController = require('../controllers/productCategory.controller');
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', productCategoryController.getAllCategory);
router.get('/:id', productCategoryController.getCategory);
router.post(
  '/',
  authMiddleware,
  isAdmin,
  productCategoryController.createCategory
);
router.patch(
  '/:id',
  authMiddleware,
  isAdmin,
  productCategoryController.updateCategory
);
router.delete(
  '/:id',
  authMiddleware,
  isAdmin,
  productCategoryController.deleteCategory
);

module.exports = router;
