import User from '../../models/User.js';

export default async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};