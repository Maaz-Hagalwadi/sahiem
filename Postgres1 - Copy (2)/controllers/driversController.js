const { Driver } = require('../db/driverModels');

// Create a new driver record
const createDriver = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, license_no, bus_id } = req.body;
    const newDriver = await Driver.create({ first_name, last_name, email, phone, license_no, bus_id });
    res.status(201).json(newDriver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating driver record' });
  }
};

// Get all driver records
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.findAll();
    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ error: 'Error fetching driver records' });
  }
};

// Get a single driver record by ID
const getDriverById = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findByPk(id);
    if (!driver) {
      res.status(404).json({ error: 'Driver not found' });
    } else {
      res.status(200).json(driver);
    }
  } catch (error) {
    console.error('Error fetching driver by ID:', error);
    res.status(500).json({ error: 'Error fetching driver record' });
  }
};

// Update a driver record by ID
const updateDriverById = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, license_no, bus_id } = req.body;
  try {
    const driver = await Driver.findByPk(id);
    if (!driver) {
      res.status(404).json({ error: 'Driver not found' });
    } else {
      await driver.update({ first_name, last_name, email, phone, license_no, bus_id });
      res.status(200).json({ message: 'Driver updated successfully' });
    }
  } catch (error) {
    console.error('Error updating driver by ID:', error);
    res.status(500).json({ error: 'Error updating driver record' });
  }
};

// Delete a driver record by ID
const deleteDriverById = async (req, res) => {
  const { id } = req.params;
  try {
    const driver = await Driver.findByPk(id);
    if (!driver) {
      res.status(404).json({ error: 'Driver not found' });
    } else {
      await driver.destroy();
      res.status(200).json({ message: 'Driver deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting driver by ID:', error);
    res.status(500).json({ error: 'Error deleting driver record' });
  }
};

module.exports = {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriverById,
  deleteDriverById,
};
