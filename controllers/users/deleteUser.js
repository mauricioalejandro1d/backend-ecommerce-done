import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';

export default async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Elimina imagen
    if (user.image) {
      fs.unlinkSync(`.${user.image}`);
    }

    await user.deleteOne();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
};