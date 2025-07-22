import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';

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

console.log('LoginUser:', loginUser);
const router = express.Router();
router.get('/profile', verifyToken, getUserProfile);
router.get('/admin-only', verifyToken, isAdmin, (req, res) => {
    res.send('Bienvenido Admin')
})
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', upload.single('image'), registerUser);
router.post('/login', loginUser);
router.put('/:id', upload.single('image'), updateUser);
router.delete('/:id', deleteUser);


export default router;

