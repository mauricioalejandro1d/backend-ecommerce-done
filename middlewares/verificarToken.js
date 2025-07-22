import jwt from 'jsonwebtoken'

const verificarToken = (req, res, next)  => {
    cotoken = req.header('Authorization')?.split(" ")[1]

    if (!token)  {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó ningun token'})
    }

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET)
        req.usuario = verificado
        next()
    } catch (error) {
        res.status(400).json({ message: 'Token invalidio'})
    }
}

export default verificarToken;