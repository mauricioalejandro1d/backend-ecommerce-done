import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  stock: Number,
  category: String
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;