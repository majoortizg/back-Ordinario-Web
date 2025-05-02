const express = require('express')
const router = express.Router()
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/usersCRUDController')

// routes del CRUD
router.post('/', createUser) // create usuario
router.get('/', getAllUsers) // read all usuarios
router.get('/:id', getUserById) // read usuario by id
router.put('/:id', updateUser) // update usuario
router.delete('/:id', deleteUser) // delete usuario

module.exports = router
