import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

export const verificarToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ mensaje: "Token no proporcionado" });

    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findById(verificado.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Token inválido" });
  }
};