import User from '../../models/User.js';
import bcrypt from 'bcryptjs';

export default async function registerUser(req, res) {
  try {
    const { nombre, email, password } = req.body;
    const image = req.file ? req.file.filename : '';

    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      nombre,
      email,
      password: hashedPassword,
      image
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: 'Usuario registrado correctamente',
      user: {
        id: savedUser._id,
        nombre: savedUser.nombre,
        email: savedUser.email,
        role: savedUser.role,
        image: savedUser.image
      }
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
}
