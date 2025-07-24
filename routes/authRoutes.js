
import express from 'express';
import User from '../models/userModel.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(404).json({ message: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, userFound.password);
    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: {
        _id: userFound._id,
        nombre: userFound.nombre,
        email: userFound.email,
        role: userFound.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      nombre,
      email,
      password: hashedPassword,
      role: role || 'cliente'
    });

    await user.save();

    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
});


export default router;
