const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel');

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
});

Customer.sync()
  .then(() => console.log('seatselected table synced'))
  .catch(err => console.error('Failed to sync seatselected table:', err));

module.exports = { Customer };
