import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import ordenesRouter from './routes/ordenes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/uploads', express.static('uploads'));
app.use("/api/ordenes", ordenesRouter);
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
  res.send('API Ecommerce funcionando correctamente');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});