const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel');
const { Bus } = require('./bus');

const Availability = sequelize.define('Availability', {
  availabilityId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  datesAvailable: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  }
});

Availability.belongsTo(Bus, { foreignKey: 'busId' });
Bus.hasOne(Availability, { foreignKey: 'busId' });

Availability.sync()
  .then(() => console.log('seatselected table synced'))
  .catch(err => console.error('Failed to sync seatselected table:', err));


module.exports = { Availability };
