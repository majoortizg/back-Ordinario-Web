const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');

// Inicio de sesión de manera segura
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Buscar el usuario en la base de datos
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        res.status(404);
        throw new Error('Usuario o contraseña no existe.');
    }

    // Comparar la contraseña usando bcrypt
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
        res.status(401);
        throw new Error('Usuario o contraseña no existe.');
    }

    // Generar token JWT
    const loginToken = jwt.sign(
        { usuarioId: existingUser._id, name: existingUser.name },
        process.env.JWT_SECRET || 'secreto',
        { algorithm: 'HS256', expiresIn: '1h' }
    );

    // Enviar el token y el name del usuario al frontend
    res.status(200).json({
        token: loginToken,
        name: existingUser.name, // name para saludar en el frontend
        userId: existingUser._id,
    });
});

module.exports = {
    login
};
