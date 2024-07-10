
const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel'); // Adjust the path as per your project structure
const { Booking } = require('./bookingModel'); // Adjust the path as per your project structure

const Passenger = sequelize.define('Passenger', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bookingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Booking,
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Passenger',
  tableName: 'Passengers',
  timestamps: true,
});

// Define associations
Passenger.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });
Booking.hasMany(Passenger, { foreignKey: 'bookingId', as: 'passengers' });

Passenger.sync()
  .then(() => console.log('Driver table synced'))
  .catch(err => console.error('Failed to sync Driver table:', err));

module.exports = { Passenger };
