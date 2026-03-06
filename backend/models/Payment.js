const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Payment = sequelize.define('Payment', {
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  method: { type: DataTypes.ENUM('cash', 'transfer', 'check'), allowNull: false },
  reference: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('completed', 'partial'), defaultValue: 'completed' },
  period: { type: DataTypes.STRING }
});

module.exports = Payment;
