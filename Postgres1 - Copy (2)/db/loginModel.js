
const { DataTypes } = require('sequelize');
const { sequelize } = require('./dbConnectionsModel'); // Assuming this is correctly defined

const Login = sequelize.define('Login', {
  loginId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Store password hash securely, but for the purpose of logging attempts, we will use plain text password here
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


Login.sync()
  .then(() => console.log('seatselected table synced'))
  .catch(err => console.error('Failed to sync seatselected table:', err));

module.exports = { Login };
