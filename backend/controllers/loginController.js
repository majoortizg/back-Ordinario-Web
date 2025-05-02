const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

// inicio de sesion de manera segura
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Buscar el usuario en la base de datos
    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        res.status(404)
        throw new Error('Usuario o contraseña no existe.')
    }

    // Comparar contraseña usando bcrypt
    const passwordMatch = await bcrypt.compare(password, existingUser.password)

    if (!passwordMatch) {
        res.status(401)
        throw new Error('Usuario o contraseña no existe.')
    }

    // Generar token JWT
    const loginToken = jwt.sign({ usuario: existingUser.email }, process.env.JWT_SECRET || 'secreto', {
        algorithm: 'HS256',
        expiresIn: '1h'
    })

    res.status(200).json({ token: loginToken })
})

module.exports = {
    login
}
