
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking');

// POST request to create a new booking
router.post('/', bookingController.createBooking);

// GET request to fetch all bookings
router.get('/', bookingController.getAllBookings);

// GET request to fetch a single booking by ID
router.get(':id', bookingController.getBookingById);

module.exports = router;

