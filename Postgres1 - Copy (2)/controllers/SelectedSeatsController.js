// controllers/selectedSeatsController.js

const {SelectedSeats} = require('../db/SelectedSeats');

// Controller methods
const createBooking = async (req, res) => {
  try {
    const { busId, from, to, selectedSeats, bookingDate } = req.body;
    const booking = await SelectedSeats.create({
      busId,
      from,
      to,
      selectedSeats,
      bookingDate,
    });
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

const getBookingsByBusId = async (req, res) => {
  const { busId } = req.params;
  try {
    const bookings = await SelectedSeats.findAll({
      where: {
        busId: busId,
      },
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings by busId:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

const getSelectedSeatsByBusId = async (req, res) => {
    const { busId } = req.params;
    try {
      const selectedSeats = await SelectedSeats.findAll({
        where: { busId },
        attributes: ['from', 'to', 'selectedSeats', 'bookingDate'],
      });
      res.status(200).json(selectedSeats);
    } catch (error) {
      console.error('Error fetching selected seats by busId:', error);
      res.status(500).json({ error: 'Failed to fetch selected seats' });
    }
  };
  

module.exports = {
  createBooking,
  getBookingsByBusId,
  getSelectedSeatsByBusId
};
