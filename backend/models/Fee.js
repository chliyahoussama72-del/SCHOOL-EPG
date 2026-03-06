const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Fee = sequelize.define('Fee', {
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  dueDate: { type: DataTypes.DATEONLY, allowNull: false },
  description: { type: DataTypes.STRING },
  period: { type: DataTypes.STRING }
});

module.exports = Fee;
