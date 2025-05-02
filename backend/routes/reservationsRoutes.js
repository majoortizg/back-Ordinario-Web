const express = require('express')
const router = express.Router()
const {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation
} = require('../controllers/reservationsController')

router.post('/', createReservation)
router.get('/', getAllReservations)
router.get('/:id', getReservationById)
router.put('/:id', updateReservation)
router.delete('/:id', deleteReservation)

module.exports = router
