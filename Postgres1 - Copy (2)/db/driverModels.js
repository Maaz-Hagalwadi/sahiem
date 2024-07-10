 // Ensure the path is correct
const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel');
const { Bus } = require('./bus'); // Import the Bus model


const Driver = sequelize.define('Driver', {
  driver_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  license_no: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  bus_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Bus,
      key: 'busId'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  timestamps: false // Disable Sequelize timestamps for createdAt and updatedAt
});

// Sync the model with the database
Driver.sync()
  .then(() => console.log('Driver table synced'))
  .catch(err => console.error('Failed to sync Driver table:', err));

module.exports = { Driver };
