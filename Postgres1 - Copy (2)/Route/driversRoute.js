const express = require('express');
const router = express.Router();
const driversController = require('../controllers/driversController');

// Route for creating a new driver record
router.post('/', driversController.createDriver);

// Route for getting all driver records
router.get('/', driversController.getAllDrivers);

// Route for getting a single driver record by ID
router.get('/:id', driversController.getDriverById);

// Route for updating a driver record by ID
router.put('/:id', driversController.updateDriverById);

// Route for deleting a driver record by ID
router.delete('/:id', driversController.deleteDriverById);

module.exports = router;
