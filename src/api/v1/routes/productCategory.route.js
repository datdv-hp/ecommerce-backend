const express = require('express');
const categoryController = require('../controllers/productCategory.controller');
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getCategory);
router.post('/', authMiddleware, isAdmin, categoryController.createCategory);
router.patch(
  '/:id',
  authMiddleware,
  isAdmin,
  categoryController.updateCategory
);
router.delete(
  '/:id',
  authMiddleware,
  isAdmin,
  categoryController.deleteCategory
);

module.exports = router;
