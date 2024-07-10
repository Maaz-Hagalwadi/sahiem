
const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel');
const { Register } = require('./registerModel');

const Bus = sequelize.define('Bus', {
  busId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  busName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  busNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  busType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numberOfSeats: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fare: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  timestamps: true // Enable Sequelize timestamps for createdAt and updatedAt
});

// Define relationships
Bus.belongsTo(Register, { foreignKey: 'registerId', as: 'register' });
Bus.sync()
  .then(() => console.log('seatselected table synced'))
  .catch(err => console.error('Failed to sync seatselected table:', err));


module.exports = { Bus };
