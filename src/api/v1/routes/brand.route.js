const express = require('express');
const brandController = require('../controllers/brand.controller');
const { authMiddleware, isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', brandController.getAllBrands);
router.get('/:id', brandController.getBrand);
router.post('/', authMiddleware, isAdmin, brandController.createBrand);
router.patch('/:id', authMiddleware, isAdmin, brandController.updateBrand);
router.delete('/:id', authMiddleware, isAdmin, brandController.deleteBrand);

module.exports = router;
