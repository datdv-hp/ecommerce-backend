const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const { isAdmin, authMiddleware } = require('../middlewares/auth.middleware');

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlog);

router.use(authMiddleware);
router.post('/like', blogController.likeBlog);
router.post('/dislike', blogController.dislikeBlog);
router.patch('/:id', blogController.updateBlog);

router.use(isAdmin);
router.post('/', blogController.createBlog);
router.delete('/:id', blogController.deleteBlog);
module.exports = router;
