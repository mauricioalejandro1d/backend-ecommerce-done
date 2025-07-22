import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true,
    }
  ],
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en_proceso', 'completado', 'cancelado'],
    default: 'pendiente',
  },
  direccion: {
    calle: String,
    ciudad: String,
    pais: String,
    postal: String
  },
  total: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

const Orden = mongoose.model('Orden', orderSchema);
export default Orden;
