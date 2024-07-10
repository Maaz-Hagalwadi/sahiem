

const { Booking } = require('../db/bookingModel'); // Adjust the path as per your project structure
const { Passenger } = require('../db/passenger'); // Corrected import path
const { sequelize } = require('../db/dbConnectionsModel'); // Import the sequelize instance to use transactions

// Function to create a new booking
const createBooking = async (req, res) => {
  const bookingData = req.body; // Assuming the request body contains all necessary booking data
  // const passengerDetails=req.body.passengerDetails;
  const transaction = await sequelize.transaction();

  try {
    console.log(bookingData.busId)
    // console.log("busid",bookingData.busId.busId);
console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");
    // Explicitly map the fields from the request body to the booking model attributes
    const booking = await Booking.create({
      customerName: bookingData.customerName,
      phoneNumber: bookingData.phoneNumber,
      email: bookingData.email,
      address: bookingData.address,
      busId: bookingData.busId,
      selectedSeats: bookingData.selectedSeats,
      discountAmount: bookingData.discountAmount,
      GST: bookingData.GST,
      cartTotal: bookingData.cartTotal,
      createdAt: bookingData.createdAt,
      updatedAt: bookingData.updatedAt
    }, { transaction });

    // Create passenger records associated with the booking
    const passengerDetails = bookingData.passengerDetails;
    const passengerRecords = passengerDetails.map(passenger => ({
      bookingId: booking.id,
      name: passenger.name,
      age: passenger.age,
      gender: passenger.gender
    }));

    await Passenger.bulkCreate(passengerRecords, { transaction });

    // Commit the transaction
    await transaction.commit();

    // Return success response
    res.status(201).json({ message: 'Booking created successfully', bookingId: booking.id });
  } catch (error) {
    // Rollback the transaction in case of an error
    await transaction.rollback();

    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to create booking. Please try again.' });
  }
};

// Function to get all bookings
const getAllBookings = async (req, res) => {
  try {
    // Fetch all bookings
    const bookings = await Booking.findAll({
      include: [{ model: Passenger, as: 'passengers' }] // Include passengers associated with each booking
    });

    // Return bookings
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch bookings. Please try again.' });
  }
};

// Function to get a booking by ID
const getBookingById = async (req, res) => {
  const bookingId = req.params.id;

  try {
    // Fetch the booking by ID
    const booking = await Booking.findByPk(bookingId, {
      include: [{ model: Passenger, as: 'passengers' }] // Include passengers associated with the booking
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    // Return the booking
    res.status(200).json(booking);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch booking. Please try again.' });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
};
