import User from '../../models/userModel.js';

export default async function getUserProfile(req, res) {
  console.log('🧪 Middleware pasó. ID decodificado:', req.user);
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('🔥 Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
}