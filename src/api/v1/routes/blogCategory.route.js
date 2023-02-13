const express = require('express');
const blogCategoryController = require('../controllers/blogCategory.controller');
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', blogCategoryController.getAllCategory);
router.get('/:id', blogCategoryController.getCategory);
router.post(
  '/',
  authMiddleware,
  isAdmin,
  blogCategoryController.createCategory
);
router.patch(
  '/:id',
  authMiddleware,
  isAdmin,
  blogCategoryController.updateCategory
);
router.delete(
  '/:id',
  authMiddleware,
  isAdmin,
  blogCategoryController.deleteCategory
);

module.exports = router;
