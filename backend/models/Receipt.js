const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Receipt = sequelize.define('Receipt', {
  number: { type: DataTypes.STRING, allowNull: false, unique: true },
  url: { type: DataTypes.STRING }
});

module.exports = Receipt;
