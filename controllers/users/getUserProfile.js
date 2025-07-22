import User from '../../models/User.js';

export default async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
  }
};