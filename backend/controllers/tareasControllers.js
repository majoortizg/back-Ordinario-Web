const asyncHandler = require('express-async-handler')
const Tarea = require("../models/tareasModel")

const getTareas = asyncHandler(async (req,res)=>{
    res.send('Obtener Tareas')
    res.status(200).json({"mensaje": "Obtener Tareas"})
})

const createTareas = asyncHandler(async (req,res)=>{
    if(!req.body.texto){
        res.status(400)
        throw new Error("Favor de escribir un texto")
    }
    const tarea = await Tarea.create({
        texto: req.body.texto
    })
    res.status(201).json({tarea})
})

const updateTareas = asyncHandler(async (req,res)=>{
    res.send('Obtener Tareas')
    res.status(200).json({"mensaje":`Tarea con id: ${req.params.id} modificada.`})
})

const deleteTareas = asyncHandler(async (req,res)=>{
    res.send('Obtener Tareas')
    res.status(200).json({"mensaje":`Tarea con id: ${req.params.id} eliminada.`})
})


module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
}