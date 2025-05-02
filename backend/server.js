const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require("./config/db")
const port = process.env.PORT || 5000
const { errHandler } = require('./middleware/errHandler');

// conexion a la base de datos
connectDB()

const app = express()
app.use(express.json());

// Routes
app.use('/api/users', require("./routes/usersRoutes"))       // login
app.use('/api/usuarios', require("./routes/usersCRUDRoutes")) // CRUD de usuarios
app.use('/api/reservas', require('./routes/reservationsRoutes')); // reservations de usuarios
app.use('/api/destinations', require('./routes/destinationsRoutes')) //destiontions

// routa para probar middleware
app.get('/api/test-error', (req, res, next) => {
    // generamos error forzado
    const error = new Error('¡Esto es un error de prueba!');
    next(error); // llamamos a next() para pasar el error al middleware de manejo de errores
});


// middleware
// rutas no encontradas
app.use((req, res, next) => {
    const error = new Error('Ruta no encontrada');
    res.status(404);
    next(error);
});
// archivo manejo de errores
app.use(errHandler)

// Corre el servidor
app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`.yellow.bold))
