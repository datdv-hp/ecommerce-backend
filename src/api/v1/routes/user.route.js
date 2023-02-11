const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware');

router.post('/register', userController.registerUser);
router.get('/refresh', userController.handleRefreshToken);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.post('/forgot-password', userController.forgotPasswordToken);
router.post('/reset-password/:resetToken', userController.resetPassword);

router.use(authMiddleware);
router.get('/all-users', userController.getAllUsers);
router.get('/:id', userController.getUser);

router.use(isAdmin);
router.delete('/:id', userController.deleteUser);
router.patch('/edit-user', userController.updateUser);
router.post('/block-user/:id', userController.blockUser);
router.post('/unblock-user/:id', userController.unblockUser);

module.exports = router;
