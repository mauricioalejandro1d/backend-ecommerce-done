import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


import {
  getUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserProfile
} from '../controllers/userController.js';

import upload from '../middlewares/upload.js';

const router = express.Router();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: ..., iat: ..., exp: ... }
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

router.get('/profile', verifyToken, getUserProfile);
router.get('/admin-only', verifyToken, isAdmin, (req, res) => {
  res.send('Bienvenido Admin');
});

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', upload.single('image'), registerUser);
router.post('/login', loginUser);
router.put('/:id', upload.single('image'), updateUser);
router.delete('/:id', deleteUser);


export default router;
