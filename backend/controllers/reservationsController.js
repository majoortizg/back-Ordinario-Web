const Reservation = require('../models/reservationsModel')
const mongoose = require('mongoose');

// Create new reserva
const createReservation = async (req, res) => {
  const { userId, destinationId, departureDate, returnDate, peopleCount, services } = req.body;

  try {
    const reservation = new Reservation({
      userId,
      destinationId,
      departureDate,
      returnDate,
      peopleCount,
      services
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: 'Error creando la reserva', error });
  }
};

// read all reservas
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('destinationId', 'name country category');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reservas', error });
  }
};

// read reserva by id
const getReservationById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await Reservation.findById(id).populate('destinationId', 'name country category');
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo la reserva', error });
  }
};

// Update reserva
const updateReservation = async (req, res) => {
  const { id } = req.params;
  const { userId, destinationId, departureDate, returnDate, peopleCount, services } = req.body;

  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(id, {
      userId,
      destinationId,
      departureDate,
      returnDate,
      peopleCount,
      services
    }, { new: true });

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reserva no encontrada para actualizar' });
    }
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando la reserva', error });
  }
};

// Delete reserva
const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reserva no encontrada para eliminar' });
    }
    res.status(200).json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando la reserva', error });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation
};