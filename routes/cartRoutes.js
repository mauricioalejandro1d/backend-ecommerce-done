import express from 'express'
import { addToCart } from '../controllers/cartController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router()

router.post('/add', verifyToken, addToCart)

export default router;
