const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

// Create new user
const createUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // verifica si el usuario ya existe
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('El usuario ya existe con ese correo')
    }

    // Create User
    const user = await User.create({
        name,
        email,
        password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } else {
        res.status(400)
        throw new Error('Error al crear el usuario')
    }
})

// read all users
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()

    res.status(200).json(users)
})

// Read user by id
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(404)
        throw new Error('Usuario no encontrado')
    }

    res.status(200).json(user)
})

// Update user
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(404)
        throw new Error('Usuario no encontrado')
    }

    // actualiza los campos
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    const updatedUser = await user.save()

    res.status(200).json(updatedUser)
})

// DElete user
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        res.status(404)
        throw new Error('Usuario no encontrado')
    }

    await user.deleteOne()

    res.status(200).json({ message: 'Usuario eliminado' })
})

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
