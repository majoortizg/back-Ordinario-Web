const express = require('express')
const router = express.Router()
const {
  createOrigin,
  getAllOrigins,
  getOriginById,
  updateOrigin,
  deleteOrigin
} = require('../controllers/originsController')

// Rutas CRUD para destinos
router.post('/', createOrigin)
router.get('/', getAllOrigins)
router.get('/:id', getOriginById)
router.put('/:id', updateOrigin)
router.delete('/:id', deleteOrigin)

module.exports = router