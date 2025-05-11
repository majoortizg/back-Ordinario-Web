const Origin = require('../models/originsModel')

// create origen
const createOrigin = async (req, res) => {
  try {
    const origin = await Origin.create(req.body)
    res.status(201).json(origin)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// read all origenes
const getAllOrigins = async (req, res) => {
  const origins = await Origin.find()
  res.status(200).json(origins)
}

// read origin by id
const getOriginById = async (req, res) => {
  const origin = await Origin.findById(req.params.id)
  if (!origin) {
    return res.status(404).json({ message: 'Origen no encontrado' })
  }
  res.status(200).json(Origin)
}

// update destino
const updateOrigin = async (req, res) => {
  const origin = await Origin.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!origin) {
    return res.status(404).json({ message: 'Origen no encontrado' })
  }
  res.status(200).json(origin)
}

// delete destino
const deleteOrigin = async (req, res) => {
  const origin = await Origin.findByIdAndDelete(req.params.id)
  if (!origin) {
    return res.status(404).json({ message: 'Origen no encontrado' })
  }
  res.status(200).json({ message: 'Origen eliminado correctamente' })
}

module.exports = {
  createOrigin,
  getAllOrigins,
  getOriginById,
  updateOrigin,
  deleteOrigin
}