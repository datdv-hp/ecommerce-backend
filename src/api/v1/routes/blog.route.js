const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const { isAdmin, authMiddleware } = require('../middlewares/auth.middleware');

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlog);

router.use(authMiddleware);
router.post('/like', blogController.likeBlog);
router.post('/dislike', blogController.dislikeBlog);

router.use(isAdmin);
router.post('/', blogController.createBlog);
router.patch('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);
module.exports = router;
