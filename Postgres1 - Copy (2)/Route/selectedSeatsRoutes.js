// routes/selectedSeatsRoutes.js

const express = require('express');
const router = express.Router();
const selectedSeatsController = require('../controllers/SelectedSeatsController');

// POST request to create a new booking
router.post('/', selectedSeatsController.createBooking);

// GET request to retrieve bookings by busId
router.get('/:busId', selectedSeatsController.getBookingsByBusId);

router.get('/seats/:busId', selectedSeatsController.getSelectedSeatsByBusId);

module.exports = router;
