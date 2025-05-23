const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Favor de poner tu nombre"]
    },
    email: {
        type: String,
        required: [true, "Favor de poner tu email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Favor de poner tu password"],
    },
    esAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

// Middleware: Encriptar contraseña antes de guardar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

module.exports = mongoose.model('User', userSchema, 'users')
