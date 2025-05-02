const Destination = require('../models/destinationsModel')

// create destino
const createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body)
    res.status(201).json(destination)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// read all destinos
const getAllDestinations = async (req, res) => {
  const destinations = await Destination.find()
  res.status(200).json(destinations)
}

// read destino by id
const getDestinationById = async (req, res) => {
  const destination = await Destination.findById(req.params.id)
  if (!destination) {
    return res.status(404).json({ message: 'Destino no encontrado' })
  }
  res.status(200).json(destination)
}

// update destino
const updateDestination = async (req, res) => {
  const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!destination) {
    return res.status(404).json({ message: 'Destino no encontrado' })
  }
  res.status(200).json(destination)
}

// delete destino
const deleteDestination = async (req, res) => {
  const destination = await Destination.findByIdAndDelete(req.params.id)
  if (!destination) {
    return res.status(404).json({ message: 'Destino no encontrado' })
  }
  res.status(200).json({ message: 'Destino eliminado correctamente' })
}

module.exports = {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination
}
