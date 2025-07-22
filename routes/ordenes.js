import express from 'express';
import Orden from '../models/Orden.js';
import verificarToken from '../middlewares/verificarToken.js';

const router = express.Router();


router.get('/', verificarToken, async (req, res) => {
  try {
    const ordenes = await Orden.find().populate('usuario').populate('productos');
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las órdenes' });
  }
});

router.post('/', verificarToken, async (req, res) => {
  try {
    const nuevaOrden = new Orden({
      productos: req.body.productos,
      usuario: req.userId,
      direccion: req.body.direccion,
      total: req.body.total,
    });
    await nuevaOrden.save();
    res.status(201).json(nuevaOrden);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la orden' });
  }
});

router.get('/mis-ordenes', verificarToken, async (req, res) => {
  try {
    const ordenes = await Orden.find({ usuario: req.userId }).populate('productos');
    res.json(ordenes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener órdenes" });
  }
});

router.put('/:id/estado', verificarToken, async (req, res) => {
  try {
    const { estado } = req.body;

    if (!['Pendiente', 'Completada', 'Cancelada'].includes(estado)) {
      return res.status(400).json({ mensaje: 'Estado no válido' });
    }

    const ordenActualizada = await Orden.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );

    if (!ordenActualizada) {
      return res.status(404).json({ mensaje: 'Orden no encontrada' });
    }

    res.json(ordenActualizada);
  } catch (err) {
    console.error("Error al cambiar estado:", err);
    res.status(500).json({ mensaje: 'Error al actualizar estado' });
  }
});

export default router;
