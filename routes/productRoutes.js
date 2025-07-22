import express from 'express';
import { createProduct } from '../controllers/productController.js';
import verifyToken from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';

const router = express.Router();

router.post('/', verifyToken, isAdmin, createProduct);

export default router;