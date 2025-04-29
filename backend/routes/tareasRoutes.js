const express = require ('express')
const router = express.Router()
const {getTareas, createTareas, updateTareas, deleteTareas} = require("../controllers/tareasControllers")

// Obtenemos tareas
router.get('/', getTareas)

// Creamos una tarea
router.post('/', createTareas)

// Modificamos una tarea
router.put('/:id', updateTareas)

// Delete tarea
router.delete('/:id', deleteTareas)

module.exports = router