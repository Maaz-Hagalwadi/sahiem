// models/SelectedSeats.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel'); // Adjust the path as per your project structure

const SelectedSeats = sequelize.define('SelectedSeats', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  busId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  from: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  to: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  selectedSeats: {
    type: DataTypes.ARRAY(DataTypes.TEXT), // Assuming selectedSeats is stored as an array of strings
    allowNull: false,
  },
  bookingDate: {
    type: DataTypes.DATEONLY, // Store date only, without time
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'SelectedSeats',
  tableName: 'seatselected', // Define the table name as 'seatselected'
  timestamps: true, // Include timestamps (createdAt, updatedAt)
});

SelectedSeats.sync()
  .then(() => console.log('seatselected table synced'))
  .catch(err => console.error('Failed to sync seatselected table:', err));

module.exports = {SelectedSeats};
