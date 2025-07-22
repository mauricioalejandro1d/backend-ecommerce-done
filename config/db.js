import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB conectado correctamente: ${conn.connection.host}`)
    }catch (error) {
        console.error(`Error al intentar conectar MongoDB: ${error.message}`)
    }
}

export default connectDB;