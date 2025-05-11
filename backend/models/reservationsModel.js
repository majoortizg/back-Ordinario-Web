const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    originId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Origin',
      required: true
    },
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
      required: true
    },
    departureDate: {
      type: Date,
      required: true
    },
    returnDate: {
      type: Date,
      required: true
    },
    peopleCount: {
      type: Number,
      required: true
    }
  });

module.exports = mongoose.model('Reservation', reservationSchema, 'reservations');
