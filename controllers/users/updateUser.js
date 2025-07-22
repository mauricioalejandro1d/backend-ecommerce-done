import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';


export default async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (req.file && user.image) {
      fs.unlinkSync(`.${user.image}`);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        role,
        image: req.file ? `/uploads/users/${req.file.filename}` : user.image,
      },
      { new: true }
    );

    res.json({ message: 'Usuario actualizado', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
};