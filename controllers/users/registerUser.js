import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';

export default async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: 'El usuario ya existe' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let imagePath = '';
    if (req.file) {
      imagePath = `/uploads/users/${req.file.filename}`;
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      image: imagePath,
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario creado correctamente', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};