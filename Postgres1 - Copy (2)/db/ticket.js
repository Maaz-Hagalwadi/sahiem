

const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel');

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  seatNumber: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  fare: {
    type: DataTypes.NUMERIC(10, 2),
    allowNull: false,
  },
});

module.exports = { Ticket };
